"""
Dependencias de autenticación y autorización
Maneja OAuth2 con Bearer tokens JWT
"""
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.users import User, UserRole
from app.core.config import settings
from app.services.auth_service import AuthService

# OAuth2 scheme - indica a FastAPI que use Bearer tokens
# tokenUrl es la ruta donde los clientes obtendrán el token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_PREFIX}/auth/token")


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    """
    Dependencia para obtener el usuario actual desde el token JWT
    
    Args:
        token: Token JWT del header Authorization
        db: Sesión de base de datos
        
    Returns:
        Usuario autenticado
        
    Raises:
        HTTPException 401 si el token es inválido o el usuario no existe
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No se pudieron validar las credenciales",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # Decodificar el token JWT
        payload = jwt.decode(
            token, 
            settings.SECRET_KEY, 
            algorithms=[settings.ALGORITHM]
        )
        
        # Extraer el user_id del payload (claim "sub")
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
            
    except JWTError:
        raise credentials_exception
    
    # Obtener el usuario de la base de datos
    user = AuthService.get_user_by_id(db, user_id=int(user_id))
    if user is None:
        raise credentials_exception
    
    return user


async def get_current_active_user(
    current_user: User = Depends(get_current_user)
) -> User:
    """
    Dependencia para verificar que el usuario actual esté activo
    
    Args:
        current_user: Usuario actual obtenido del token
        
    Returns:
        Usuario activo
        
    Raises:
        HTTPException 403 si el usuario está inactivo
    """
    if not current_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Usuario inactivo"
        )
    return current_user


def require_role(required_role: UserRole):
    """
    Factory para crear dependencias que requieren un rol específico
    
    Args:
        required_role: Rol requerido para acceder al endpoint
        
    Returns:
        Función de dependencia que valida el rol
        
    Example:
        @app.get("/admin/dashboard", dependencies=[Depends(require_role(UserRole.ADMIN))])
    """
    async def role_checker(
        current_user: User = Depends(get_current_active_user)
    ) -> User:
        if current_user.role != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Se requiere rol {required_role.value}"
            )
        return current_user
    
    return role_checker


async def get_current_admin_user(
    current_user: User = Depends(get_current_active_user)
) -> User:
    """
    Dependencia para verificar que el usuario sea administrador
    
    Args:
        current_user: Usuario actual activo
        
    Returns:
        Usuario administrador
        
    Raises:
        HTTPException 403 si el usuario no es administrador
    """
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Se requieren privilegios de administrador"
        )
    return current_user


async def get_current_staff_or_admin_user(
    current_user: User = Depends(get_current_active_user)
) -> User:
    """
    Dependencia para verificar que el usuario sea staff o admin
    
    Args:
        current_user: Usuario actual activo
        
    Returns:
        Usuario staff o admin
        
    Raises:
        HTTPException 403 si el usuario no es staff ni admin
    """
    if current_user.role not in [UserRole.ADMIN, UserRole.STAFF]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Se requieren privilegios de staff o administrador"
        )
    return current_user


def get_optional_current_user(
    token: Optional[str] = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> Optional[User]:
    """
    Dependencia para obtener el usuario actual si existe, pero no requiere autenticación
    Útil para endpoints públicos que pueden mostrar información adicional si el usuario está logueado
    
    Args:
        token: Token JWT opcional
        db: Sesión de base de datos
        
    Returns:
        Usuario autenticado o None
    """
    if not token:
        return None
    
    try:
        payload = jwt.decode(
            token, 
            settings.SECRET_KEY, 
            algorithms=[settings.ALGORITHM]
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            return None
            
        user = AuthService.get_user_by_id(db, user_id=int(user_id))
        return user if user and user.is_active else None
        
    except JWTError:
        return None
