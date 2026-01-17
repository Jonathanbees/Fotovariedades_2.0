"""
Servicio de autenticación
Maneja la lógica de negocio relacionada con autenticación de usuarios
"""
from datetime import timedelta
from typing import Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.users import User
from app.core.security import verify_password, create_access_token, get_password_hash
from app.core.config import settings


class AuthService:
    """Servicio para operaciones de autenticación"""
    
    @staticmethod
    def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
        """
        Autentica un usuario verificando email y contraseña
        
        Args:
            db: Sesión de base de datos
            email: Email del usuario
            password: Contraseña en texto plano
            
        Returns:
            User si las credenciales son válidas, None en caso contrario
        """
        user = db.query(User).filter(User.email == email).first()
        
        if not user:
            return None
            
        if not verify_password(password, user.password_hash):
            return None
            
        return user
    
    @staticmethod
    def create_user_token(user: User) -> str:
        """
        Crea un token JWT para el usuario
        
        Args:
            user: Instancia del modelo User
            
        Returns:
            Token JWT como string
        """
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        
        # Datos que se incluirán en el token
        token_data = {
            "sub": str(user.id),  # Subject (ID del usuario)
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role.value,
            "is_active": user.is_active
        }
        
        access_token = create_access_token(
            data=token_data, 
            expires_delta=access_token_expires
        )
        
        return access_token
    
    @staticmethod
    def get_user_by_email(db: Session, email: str) -> Optional[User]:
        """
        Obtiene un usuario por su email
        
        Args:
            db: Sesión de base de datos
            email: Email del usuario
            
        Returns:
            User si existe, None en caso contrario
        """
        return db.query(User).filter(User.email == email).first()
    
    @staticmethod
    def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
        """
        Obtiene un usuario por su ID
        
        Args:
            db: Sesión de base de datos
            user_id: ID del usuario
            
        Returns:
            User si existe, None en caso contrario
        """
        return db.query(User).filter(User.id == user_id).first()
    
    @staticmethod
    def create_user(db: Session, email: str, full_name: str, password: str, role=None) -> User:
        """
        Crea un nuevo usuario
        
        Args:
            db: Sesión de base de datos
            email: Email del usuario
            full_name: Nombre completo
            password: Contraseña en texto plano
            role: Rol del usuario (opcional)
            
        Returns:
            Usuario creado
            
        Raises:
            HTTPException si el email ya existe
        """
        # Verificar si el email ya existe
        if AuthService.get_user_by_email(db, email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El email ya está registrado"
            )
        
        # Crear el usuario
        from app.models.users import UserRole
        user = User(
            email=email,
            full_name=full_name,
            password_hash=get_password_hash(password),
            role=role or UserRole.CUSTOMER
        )
        
        db.add(user)
        db.commit()
        db.refresh(user)
        
        return user
    
    @staticmethod
    def verify_user_is_active(user: User) -> None:
        """
        Verifica que el usuario esté activo
        
        Args:
            user: Usuario a verificar
            
        Raises:
            HTTPException si el usuario está inactivo
        """
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Usuario inactivo"
            )
