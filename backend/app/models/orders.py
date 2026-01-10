import enum
import uuid
from datetime import datetime, timezone
from typing import List, Optional
from decimal import Decimal
from sqlalchemy import ForeignKey, Numeric, DateTime, String, UUID as SQLUUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base

class OrderStatus(enum.Enum):
    """Estados del pedido en el flujo de compra
    
    - PENDING: Pedido creado, esperando pago en Wompi
    - PAID: Wompi confirmó el pago, se envía email + PDF con QR
    - FAILED: El pago falló o fue rechazado
    - REDEEMED: QR fue escaneado y producto entregado
    - CANCELLED: Pedido cancelado por el usuario o admin
    """
    PENDING = "pending"
    PAID = "paid"
    FAILED = "failed"
    REDEEMED = "redeemed"
    CANCELLED = "cancelled"

class Order(Base):
    """Modelo de pedido - Corazón del sistema de compras
    
    Conecta la compra con la validación del QR.
    Usa UUID para evitar que se pueda adivinar cuántos pedidos hay.
    """
    __tablename__ = "orders"
    
    # UUID como PK para seguridad (no números consecutivos)
    id: Mapped[uuid.UUID] = mapped_column(
        SQLUUID(as_uuid=True), 
        primary_key=True, 
        default=uuid.uuid4,
        index=True
    )
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    total_amount: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    status: Mapped[OrderStatus] = mapped_column(default=OrderStatus.PENDING, nullable=False, index=True)
    
    # Integración con Wompi
    wompi_reference: Mapped[Optional[str]] = mapped_column(
        String(100), 
        unique=True, 
        index=True, 
        nullable=True
    )
    
    # Código de validación para el QR (generado internamente)
    validation_code: Mapped[str] = mapped_column(
        String(50), 
        unique=True, 
        index=True, 
        nullable=False
    )
    
    # Timestamps
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
        index=True  # Para métricas de ventas por fecha
    )
    redeemed_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), 
        nullable=True
    )
    updated_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), 
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=True
    )
    
    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="orders")
    items: Mapped[List["OrderItem"]] = relationship(
        "OrderItem", 
        back_populates="order",
        cascade="all, delete-orphan"
    )
    payments: Mapped[List["Payment"]] = relationship(
        "Payment", 
        back_populates="order",
        cascade="all, delete-orphan"
    )
    
    def __repr__(self) -> str:
        return f"<Order(id={self.id}, status='{self.status.value}', total={self.total_amount})>"
    
    @property
    def is_paid(self) -> bool:
        """Verifica si el pedido está pagado"""
        return self.status == OrderStatus.PAID
    
    @property
    def can_be_redeemed(self) -> bool:
        """Verifica si el pedido puede ser canjeado"""
        return self.status == OrderStatus.PAID and self.redeemed_at is None

class OrderItem(Base):
    """Detalle de productos en un pedido
    
    CRÍTICO: Guarda el precio al momento de la compra (snapshot)
    para mantener integridad histórica aunque cambien los precios.
    """
    __tablename__ = "order_items"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    order_id: Mapped[uuid.UUID] = mapped_column(
        SQLUUID(as_uuid=True),
        ForeignKey("orders.id"),
        nullable=False,
        index=True
    )
    product_id: Mapped[int] = mapped_column(
        ForeignKey("products.id"),
        nullable=False,
        index=True
    )
    quantity: Mapped[int] = mapped_column(nullable=False)
    price_at_purchase: Mapped[Decimal] = mapped_column(
        Numeric(10, 2), 
        nullable=False
    )  # Precio histórico
    
    # Relationships
    order: Mapped["Order"] = relationship("Order", back_populates="items")
    product: Mapped["Product"] = relationship("Product", back_populates="order_items")
    
    def __repr__(self) -> str:
        return f"<OrderItem(order_id={self.order_id}, product_id={self.product_id}, qty={self.quantity})>"
    
    @property
    def subtotal(self) -> Decimal:
        """Calcula el subtotal del item"""
        return self.price_at_purchase * self.quantity