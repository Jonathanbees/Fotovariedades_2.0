"""
Router de autenticación
Maneja endpoints relacionados con login y autenticación OAuth2
"""
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.user_schemas import Token, UserRegister, UserResponse
from app.services.auth_service import AuthService
from app.core.dependencies import get_current_active_user
from app.models.users import User

router = APIRouter(prefix="/auth", tags=["Autenticación"])


@router.post("/token", response_model=Token, summary="Login con OAuth2")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """
    Endpoint de autenticación OAuth2 para obtener un token JWT
    
    **OAuth2 Password Flow:**
    - username: Email del usuario
    - password: Contraseña del usuario
    
    **Retorna:**
    - access_token: Token JWT para autenticación
    - token_type: Tipo de token (bearer)
    - user: Información del usuario autenticado
    
    **Ejemplo de uso con curl:**
    ```bash
    curl -X POST "http://localhost:8000/api/v1/auth/token" \\
         -H "Content-Type: application/x-www-form-urlencoded" \\
         -d "username=usuario@example.com&password=mipassword"
    ```
    
    **Ejemplo de uso con JavaScript:**
    ```javascript
    const formData = new FormData();
    formData.append('username', 'usuario@example.com');
    formData.append('password', 'mipassword');
    
    const response = await fetch('/api/v1/auth/token', {
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    ```
    """
    # Autenticar usuario (OAuth2 usa 'username' pero nosotros usamos email)
    user = AuthService.authenticate_user(db, email=form_data.username, password=form_data.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Verificar que el usuario esté activo
    AuthService.verify_user_is_active(user)
    
    # Crear token JWT
    access_token = AuthService.create_user_token(user)
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }


@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED, summary="Registro de usuario")
async def register(
    user_data: UserRegister,
    db: Session = Depends(get_db)
):
    """
    Registrar un nuevo usuario en el sistema
    
    **Retorna:**
    - access_token: Token JWT para autenticación automática
    - token_type: Tipo de token (bearer)
    - user: Información del usuario creado
    
    **Nota:** Los usuarios registrados públicamente siempre tienen rol CUSTOMER
    """
    # Crear usuario
    user = AuthService.create_user(
        db=db,
        email=user_data.email,
        full_name=user_data.full_name,
        password=user_data.password
    )
    
    # Crear token para login automático
    access_token = AuthService.create_user_token(user)
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }


@router.get("/me", response_model=UserResponse, summary="Obtener usuario actual")
async def get_me(
    current_user: User = Depends(get_current_active_user)
):
    """
    Obtener información del usuario autenticado actual
    
    **Requiere autenticación con Bearer token**
    
    **Ejemplo de uso:**
    ```bash
    curl -X GET "http://localhost:8000/api/v1/auth/me" \\
         -H "Authorization: Bearer <tu_token_jwt>"
    ```
    """
    return current_user


@router.post("/refresh", response_model=Token, summary="Refrescar token")
async def refresh_token(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Refrescar el token de autenticación
    
    Genera un nuevo token JWT con los datos actualizados del usuario
    
    **Requiere autenticación con Bearer token**
    """
    # Obtener usuario actualizado de la BD
    user = AuthService.get_user_by_id(db, current_user.id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )
    
    # Verificar que esté activo
    AuthService.verify_user_is_active(user)
    
    # Crear nuevo token
    access_token = AuthService.create_user_token(user)
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }
