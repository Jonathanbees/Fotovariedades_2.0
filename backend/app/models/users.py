from typing import Optional, List
from datetime import datetime, timezone
from sqlalchemy import String, Boolean, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base


class User(Base):
    """Modelo de usuario del sistema
    
    Almacena información de autenticación y perfil de usuarios.
    El campo role define los permisos: 'ADMIN', 'STAFF', 'CUSTOMER'
    """
    __tablename__ = "users"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    
    role: Mapped[str] = mapped_column(String(50), nullable=False, default="CUSTOMER")
    
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )
    updated_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), 
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=True
    )
    
    # Relationships
    orders: Mapped[List["Order"]] = relationship("Order", back_populates="user")
    
    def __repr__(self) -> str:
        return f"<User(id={self.id}, email='{self.email}', role='{self.role}')>"
    
    @property
    def is_admin(self) -> bool:
        """Verifica si el usuario es administrador"""
        return self.role == "ADMIN"
    
    @property
    def is_staff(self) -> bool:
        """Verifica si el usuario es staff"""
        return self.role == "STAFF"
    
    @property
    def is_customer(self) -> bool:
        """Verifica si el usuario es cliente"""
        return self.role == "CUSTOMER"


# Constantes para los roles (reemplazan el ENUM)
class UserRole:
    """Constantes para los roles de usuario"""
    ADMIN = "ADMIN"
    STAFF = "STAFF"
    CUSTOMER = "CUSTOMER"
    
    @classmethod
    def all(cls):
        """Retorna todos los roles disponibles"""
        return [cls.ADMIN, cls.STAFF, cls.CUSTOMER]
    
    @classmethod
    def is_valid(cls, role: str) -> bool:
        """Valida si un rol es válido"""
        return role in cls.all()