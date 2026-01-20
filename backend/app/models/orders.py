from typing import Optional, List
from datetime import datetime, timezone
from decimal import Decimal
import uuid
from sqlalchemy import String, Numeric, DateTime, ForeignKey, UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base


class Order(Base):
    """Modelo de pedido/orden de compra"""
    __tablename__ = "orders"
    
    id: Mapped[uuid.UUID] = mapped_column(
        PGUUID(as_uuid=True), 
        primary_key=True, 
        default=uuid.uuid4, 
        index=True
    )
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    total_amount: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    
    # Cambiar de ENUM a String
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="PENDING", index=True)
    
    wompi_reference: Mapped[Optional[str]] = mapped_column(String(100), unique=True, index=True, nullable=True)
    validation_code: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False, index=True)
    redeemed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    updated_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), onupdate=lambda: datetime.now(timezone.utc), nullable=True)
    
    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="orders")
    items: Mapped[List["OrderItem"]] = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
    payments: Mapped[List["Payment"]] = relationship("Payment", back_populates="order")


class OrderItem(Base):
    """Modelo de item/producto dentro de un pedido"""
    __tablename__ = "order_items"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    order_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("orders.id"), nullable=False, index=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"), nullable=False, index=True)
    quantity: Mapped[int] = mapped_column(nullable=False)
    price_at_purchase: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    
    # Relationships
    order: Mapped["Order"] = relationship("Order", back_populates="items")
    product: Mapped["Product"] = relationship("Product", back_populates="order_items")


# Constantes para los estados de orden
class OrderStatus:
    """Constantes para los estados de orden"""
    PENDING = "PENDING"
    PAID = "PAID"
    FAILED = "FAILED"
    REDEEMED = "REDEEMED"
    CANCELLED = "CANCELLED"
    
    @classmethod
    def all(cls):
        return [cls.PENDING, cls.PAID, cls.FAILED, cls.REDEEMED, cls.CANCELLED]