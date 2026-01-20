from typing import Optional
from datetime import datetime, timezone
from decimal import Decimal
from sqlalchemy import String, Numeric, Text, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base
import uuid


class Payment(Base):
    """Modelo de pago procesado por Wompi"""
    __tablename__ = "payments"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    order_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("orders.id"), nullable=False, index=True)
    
    wompi_transaction_id: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    wompi_reference: Mapped[Optional[str]] = mapped_column(String(100), index=True, nullable=True)
    
    amount: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    
    # Cambiar de ENUM a String
    status: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    payment_method: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    payment_method_type: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    
    currency: Mapped[str] = mapped_column(String(3), default="COP", nullable=False)
    
    card_last_four: Mapped[Optional[str]] = mapped_column(String(4), nullable=True)
    card_brand: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    
    webhook_data: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    error_message: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False, index=True)
    updated_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), onupdate=lambda: datetime.now(timezone.utc), nullable=True)
    transaction_date: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    order: Mapped["Order"] = relationship("Order", back_populates="payments")


# Constantes para los estados de pago
class PaymentStatus:
    """Constantes para los estados de pago"""
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    DECLINED = "DECLINED"
    VOIDED = "VOIDED"
    ERROR = "ERROR"
    
    @classmethod
    def all(cls):
        return [cls.PENDING, cls.APPROVED, cls.DECLINED, cls.VOIDED, cls.ERROR]


# Constantes para los métodos de pago
class PaymentMethod:
    """Constantes para los métodos de pago"""
    CARD = "CARD"
    NEQUI = "NEQUI"
    PSE = "PSE"
    BANCOLOMBIA_TRANSFER = "BANCOLOMBIA_TRANSFER"
    BANCOLOMBIA_COLLECT = "BANCOLOMBIA_COLLECT"
    
    @classmethod
    def all(cls):
        return [cls.CARD, cls.NEQUI, cls.PSE, cls.BANCOLOMBIA_TRANSFER, cls.BANCOLOMBIA_COLLECT]