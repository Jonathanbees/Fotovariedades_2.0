"""
Schemas Pydantic para el modelo User

Define la estructura de datos para validación y serialización
de usuarios en las peticiones y respuestas de la API.
"""

from datetime import datetime
from typing import Optional, Literal
from pydantic import BaseModel, EmailStr, Field, ConfigDict

# Schemas Base
class UserBase(BaseModel):
    """Campos base compartidos por todos los schemas de User"""
    email: EmailStr = Field(..., description="Email del usuario (único)")
    full_name: str = Field(..., min_length=2, max_length=255, description="Nombre completo del usuario")

# Schemas de Creación
class UserCreate(UserBase):
    """Schema para crear un nuevo usuario"""
    password: str = Field(..., min_length=8, max_length=100, description="Contraseña (mínimo 8 caracteres)")
    role: Optional[Literal["ADMIN", "STAFF", "CUSTOMER"]] = Field(default="CUSTOMER", description="Rol del usuario")
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "email": "cliente@example.com",
            "full_name": "Juan Pérez",
            "password": "SecurePass123",
            "role": "customer"
        }
    })

class UserRegister(BaseModel):
    """Schema para registro público (solo clientes)"""
    email: EmailStr
    full_name: str = Field(..., min_length=2, max_length=255)
    password: str = Field(..., min_length=8, max_length=100)
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "email": "nuevo@example.com",
            "full_name": "María González",
            "password": "MiPassword123"
        }
    })

# Schemas de Actualización
class UserUpdate(BaseModel):
    """Schema para actualizar un usuario existente"""
    email: Optional[EmailStr] = None
    full_name: Optional[str] = Field(None, min_length=2, max_length=255)
    role: Optional[Literal["ADMIN", "STAFF", "CUSTOMER"]] = None
    is_active: Optional[bool] = None
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "full_name": "Juan Pérez Actualizado",
            "is_active": True
        }
    })

class UserPasswordUpdate(BaseModel):
    """Schema para cambiar contraseña"""
    current_password: str = Field(..., description="Contraseña actual")
    new_password: str = Field(..., min_length=8, max_length=100, description="Nueva contraseña")
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "current_password": "PasswordAntiguo123",
            "new_password": "PasswordNuevo456"
        }
    })

# Schemas de Respuesta
class UserResponse(UserBase):
    """Schema de respuesta con datos del usuario"""
    id: int
    role: Literal["ADMIN", "STAFF", "CUSTOMER"]
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            "example": {
                "id": 1,
                "email": "cliente@example.com",
                "full_name": "Juan Pérez",
                "role": "customer",
                "is_active": True,
                "created_at": "2024-01-15T10:30:00Z",
                "updated_at": None
            }
        }
    )

class UserWithOrders(UserResponse):
    """Schema de usuario con información de órdenes"""
    orders_count: int = Field(default=0, description="Cantidad de órdenes del usuario")
    
    model_config = ConfigDict(from_attributes=True)

# Schemas de Autenticación
class UserLogin(BaseModel):
    """Schema para login"""
    email: EmailStr
    password: str
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "email": "cliente@example.com",
            "password": "SecurePass123"
        }
    })

class Token(BaseModel):
    """Schema de respuesta de autenticación"""
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            "token_type": "bearer",
            "user": {
                "id": 1,
                "email": "cliente@example.com",
                "full_name": "Juan Pérez",
                "role": "customer",
                "is_active": True,
                "created_at": "2024-01-15T10:30:00Z",
                "updated_at": None
            }
        }
    })

class TokenData(BaseModel):
    """Schema para datos del token decodificado"""
    user_id: Optional[int] = None
    email: Optional[str] = None

# Schemas para listados
class UserListResponse(BaseModel):
    """Schema para listado paginado de usuarios"""
    total: int
    users: list[UserResponse]
    page: int
    page_size: int
    
    model_config = ConfigDict(from_attributes=True)
