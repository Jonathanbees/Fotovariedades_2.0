from typing import Optional, List
from datetime import datetime, timezone
from decimal import Decimal
from sqlalchemy import String, Numeric, Text, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base

class Product(Base):
    """Modelo de producto del inventario
    
    Almacena información de productos con control de stock.
    El campo is_active permite ocultar productos sin eliminarlos.
    """
    __tablename__ = "products"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), index=True, nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    price: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)  # NUNCA float para dinero
    stock_quantity: Mapped[int] = mapped_column(default=0, nullable=False)
    image_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    category: Mapped[Optional[str]] = mapped_column(String(100), index=True, nullable=True)
    is_active: Mapped[bool] = mapped_column(default=True, nullable=False)
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
    order_items: Mapped[List["OrderItem"]] = relationship("OrderItem", back_populates="product")
    
    def __repr__(self) -> str:
        return f"<Product(id={self.id}, name='{self.name}', price={self.price}, stock={self.stock_quantity})>"
    
    @property
    def is_in_stock(self) -> bool:
        """Verifica si el producto tiene stock disponible"""
        return self.stock_quantity > 0