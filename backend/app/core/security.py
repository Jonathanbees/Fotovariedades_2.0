"""
Módulo de seguridad
Maneja hashing de contraseñas y creación de tokens JWT
"""
from datetime import datetime, timedelta, timezone
from typing import Optional, Dict, Any
import bcrypt
from jose import jwt

from app.core.config import settings


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifica que una contraseña en texto plano coincida con su hash
    
    Args:
        plain_password: Contraseña en texto plano
        hashed_password: Hash de la contraseña
        
    Returns:
        True si coinciden, False en caso contrario
    """
    # Limitar la contraseña a 72 bytes (límite de bcrypt)
    password_bytes = plain_password.encode('utf-8')[:72]
    hashed_bytes = hashed_password.encode('utf-8')
    
    return bcrypt.checkpw(password_bytes, hashed_bytes)


def get_password_hash(password: str) -> str:
    """
    Genera un hash bcrypt de una contraseña
    
    Args:
        password: Contraseña en texto plano
        
    Returns:
        Hash de la contraseña
    """
    # Limitar la contraseña a 72 bytes (límite de bcrypt)
    password_bytes = password.encode('utf-8')[:72]
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password_bytes, salt)
    
    return hashed.decode('utf-8')


def create_access_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    """
    Crea un token JWT
    
    Args:
        data: Datos a incluir en el payload del token
        expires_delta: Tiempo de expiración del token
        
    Returns:
        Token JWT codificado
    """
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    
    return encoded_jwt