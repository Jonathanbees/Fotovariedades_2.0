import enum
import uuid
from datetime import datetime, timezone
from typing import Optional
from decimal import Decimal
from sqlalchemy import ForeignKey, Numeric, DateTime, String, Text, UUID as SQLUUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base

class PaymentStatus(enum.Enum):
    """Estados de transacción de Wompi
    
    - PENDING: Transacción iniciada pero aún no confirmada
    - APPROVED: Pago aprobado y confirmado
    - DECLINED: Pago rechazado por el banco o Wompi
    - VOIDED: Transacción anulada
    - ERROR: Error en la transacción
    """
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    DECLINED = "DECLINED"
    VOIDED = "VOIDED"
    ERROR = "ERROR"

class PaymentMethod(enum.Enum):
    """Métodos de pago soportados por Wompi"""
    CARD = "CARD"  # Tarjeta de crédito/débito
    NEQUI = "NEQUI"  # Nequi
    PSE = "PSE"  # PSE Bancolombia
    BANCOLOMBIA_TRANSFER = "BANCOLOMBIA_TRANSFER"  # Transferencia Bancolombia
    BANCOLOMBIA_COLLECT = "BANCOLOMBIA_COLLECT"  # Corresponsal Bancolombia

class Payment(Base):
    """Modelo de pago para auditoría de Wompi
    
    Registra todas las transacciones y respuestas de webhooks.
    Permite trazabilidad completa de pagos.
    """
    __tablename__ = "payments"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    order_id: Mapped[uuid.UUID] = mapped_column(
        SQLUUID(as_uuid=True),
        ForeignKey("orders.id"),
        nullable=False,
        index=True
    )
    
    # Identificadores de Wompi
    wompi_transaction_id: Mapped[str] = mapped_column(
        String(100), 
        unique=True, 
        index=True, 
        nullable=False
    )
    wompi_reference: Mapped[Optional[str]] = mapped_column(
        String(100), 
        index=True, 
        nullable=True
    )
    
    # Detalles del pago
    amount: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    status: Mapped[PaymentStatus] = mapped_column(nullable=False, index=True)
    payment_method: Mapped[Optional[PaymentMethod]] = mapped_column(nullable=True)
    payment_method_type: Mapped[Optional[str]] = mapped_column(
        String(50), 
        nullable=True
    )  # Para detalles adicionales del método
    
    # Información del pago
    currency: Mapped[str] = mapped_column(String(3), default="COP", nullable=False)
    
    # Información de la tarjeta (si aplica) - parcial por seguridad
    card_last_four: Mapped[Optional[str]] = mapped_column(String(4), nullable=True)
    card_brand: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    
    # Webhook data completo (JSON serializado como string)
    webhook_data: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    
    # Información adicional
    error_message: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    
    # Timestamps
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
        index=True
    )
    updated_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), 
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=True
    )
    
    # Fecha de la transacción según Wompi
    transaction_date: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), 
        nullable=True
    )
    
    # Relationships
    order: Mapped["Order"] = relationship("Order", back_populates="payments")
    
    def __repr__(self) -> str:
        return f"<Payment(id={self.id}, transaction_id='{self.wompi_transaction_id}', status='{self.status.value}')>"
    
    @property
    def is_successful(self) -> bool:
        """Verifica si el pago fue exitoso"""
        return self.status == PaymentStatus.APPROVED
    
    @property
    def is_failed(self) -> bool:
        """Verifica si el pago falló"""
        return self.status in [PaymentStatus.DECLINED, PaymentStatus.ERROR, PaymentStatus.VOIDED]
