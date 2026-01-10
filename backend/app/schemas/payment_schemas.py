"""
Schemas Pydantic para el modelo Payment y webhooks de Wompi

Define la estructura de datos para validación y serialización
de pagos y las respuestas de webhooks de Wompi.
"""

from datetime import datetime
from typing import Optional, Dict, Any
from decimal import Decimal
from uuid import UUID
from pydantic import BaseModel, Field, ConfigDict
from app.models.payments import PaymentStatus, PaymentMethod

# ============= Payment Schemas =============

class PaymentBase(BaseModel):
    """Campos base para pagos"""
    amount: Decimal = Field(..., gt=0, decimal_places=2, description="Monto del pago")
    currency: str = Field(default="COP", max_length=3, description="Moneda del pago")

class PaymentCreate(PaymentBase):
    """Schema para crear un registro de pago"""
    order_id: UUID
    wompi_transaction_id: str
    wompi_reference: Optional[str] = None
    status: PaymentStatus
    payment_method: Optional[PaymentMethod] = None
    payment_method_type: Optional[str] = None
    transaction_date: Optional[datetime] = None
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "order_id": "550e8400-e29b-41d4-a716-446655440000",
            "wompi_transaction_id": "12345-1234567890-12345",
            "wompi_reference": "WP-REF-123456",
            "amount": 45000.00,
            "currency": "COP",
            "status": "APPROVED",
            "payment_method": "CARD",
            "transaction_date": "2024-01-15T10:30:00Z"
        }
    })

class PaymentUpdate(BaseModel):
    """Schema para actualizar un pago"""
    status: Optional[PaymentStatus] = None
    error_message: Optional[str] = None
    webhook_data: Optional[str] = None
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "status": "APPROVED"
        }
    })

class PaymentResponse(PaymentBase):
    """Schema de respuesta para pago"""
    id: int
    order_id: UUID
    wompi_transaction_id: str
    wompi_reference: Optional[str] = None
    status: PaymentStatus
    payment_method: Optional[PaymentMethod] = None
    payment_method_type: Optional[str] = None
    card_last_four: Optional[str] = None
    card_brand: Optional[str] = None
    error_message: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    transaction_date: Optional[datetime] = None
    
    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            "example": {
                "id": 1,
                "order_id": "550e8400-e29b-41d4-a716-446655440000",
                "wompi_transaction_id": "12345-1234567890-12345",
                "wompi_reference": "WP-REF-123456",
                "amount": 45000.00,
                "currency": "COP",
                "status": "APPROVED",
                "payment_method": "CARD",
                "payment_method_type": "CREDIT",
                "card_last_four": "4242",
                "card_brand": "VISA",
                "error_message": None,
                "created_at": "2024-01-15T10:30:00Z",
                "updated_at": None,
                "transaction_date": "2024-01-15T10:30:00Z"
            }
        }
    )

class PaymentListResponse(BaseModel):
    """Schema para listado de pagos"""
    total: int
    payments: list[PaymentResponse]
    page: int
    page_size: int
    
    model_config = ConfigDict(from_attributes=True)

# ============= Wompi Webhook Schemas =============

class WompiPaymentMethod(BaseModel):
    """Schema para método de pago de Wompi"""
    type: str = Field(..., description="Tipo de método de pago")
    extra: Optional[Dict[str, Any]] = Field(None, description="Información extra del método de pago")
    installments: Optional[int] = Field(None, description="Número de cuotas (si aplica)")

class WompiTransaction(BaseModel):
    """Schema para transacción de Wompi"""
    id: str = Field(..., description="ID de la transacción en Wompi")
    amount_in_cents: int = Field(..., description="Monto en centavos")
    reference: str = Field(..., description="Referencia de la transacción")
    customer_email: str = Field(..., description="Email del cliente")
    currency: str = Field(..., description="Moneda de la transacción")
    payment_method_type: str = Field(..., description="Tipo de método de pago")
    payment_method: WompiPaymentMethod = Field(..., description="Detalles del método de pago")
    status: str = Field(..., description="Estado de la transacción")
    status_message: Optional[str] = Field(None, description="Mensaje descriptivo del estado")
    created_at: str = Field(..., description="Fecha de creación en formato ISO")
    finalized_at: Optional[str] = Field(None, description="Fecha de finalización en formato ISO")
    shipping_address: Optional[Dict[str, Any]] = None
    redirect_url: Optional[str] = None
    payment_source_id: Optional[str] = None
    payment_link_id: Optional[str] = None
    customer_data: Optional[Dict[str, Any]] = None
    billing_data: Optional[Dict[str, Any]] = None

class WompiWebhookEvent(BaseModel):
    """Schema para evento completo de webhook de Wompi"""
    event: str = Field(..., description="Tipo de evento (transaction.updated)")
    data: WompiTransaction = Field(..., description="Datos de la transacción")
    sent_at: str = Field(..., description="Fecha de envío del webhook")
    timestamp: int = Field(..., description="Timestamp Unix del evento")
    signature: Optional[Dict[str, Any]] = Field(None, description="Firma del webhook para verificación")
    environment: Optional[str] = Field(None, description="Ambiente (production, test)")
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "event": "transaction.updated",
            "data": {
                "id": "12345-1234567890-12345",
                "amount_in_cents": 4500000,
                "reference": "WP-REF-123456",
                "customer_email": "cliente@example.com",
                "currency": "COP",
                "payment_method_type": "CARD",
                "payment_method": {
                    "type": "CARD",
                    "extra": {
                        "last_four": "4242",
                        "brand": "VISA"
                    }
                },
                "status": "APPROVED",
                "status_message": "Transacción aprobada",
                "created_at": "2024-01-15T10:30:00.000Z",
                "finalized_at": "2024-01-15T10:30:15.000Z"
            },
            "sent_at": "2024-01-15T10:30:20.000Z",
            "timestamp": 1705318220,
            "environment": "production"
        }
    })

class WompiWebhookResponse(BaseModel):
    """Schema de respuesta al webhook de Wompi"""
    success: bool
    message: str
    order_id: Optional[UUID] = None
    payment_id: Optional[int] = None
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "success": True,
            "message": "Webhook procesado correctamente",
            "order_id": "550e8400-e29b-41d4-a716-446655440000",
            "payment_id": 1
        }
    })

# ============= Wompi Payment Link =============

class WompiPaymentLinkCreate(BaseModel):
    """Schema para crear un link de pago en Wompi"""
    amount_in_cents: int = Field(..., gt=0, description="Monto en centavos (COP)")
    currency: str = Field(default="COP", description="Moneda")
    reference: str = Field(..., description="Referencia única del pago")
    customer_email: str = Field(..., description="Email del cliente")
    redirect_url: Optional[str] = Field(None, description="URL de redirección después del pago")
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "amount_in_cents": 4500000,
            "currency": "COP",
            "reference": "WP-REF-123456",
            "customer_email": "cliente@example.com",
            "redirect_url": "https://fotovariedades.com/orders/success"
        }
    })

class WompiPaymentLinkResponse(BaseModel):
    """Schema de respuesta al crear link de pago"""
    id: str = Field(..., description="ID del link de pago")
    created_at: str = Field(..., description="Fecha de creación")
    currency: str
    amount_in_cents: int
    reference: str
    customer_email: str
    redirect_url: Optional[str] = None
    payment_link_url: str = Field(..., description="URL del link de pago")
    expires_at: Optional[str] = None
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "id": "abc123xyz",
            "created_at": "2024-01-15T10:30:00.000Z",
            "currency": "COP",
            "amount_in_cents": 4500000,
            "reference": "WP-REF-123456",
            "customer_email": "cliente@example.com",
            "redirect_url": "https://fotovariedades.com/orders/success",
            "payment_link_url": "https://checkout.wompi.co/p/abc123xyz",
            "expires_at": "2024-01-16T10:30:00.000Z"
        }
    })

# ============= Payment Filters =============

class PaymentFilters(BaseModel):
    """Schema para filtros de búsqueda de pagos"""
    order_id: Optional[UUID] = None
    status: Optional[PaymentStatus] = None
    payment_method: Optional[PaymentMethod] = None
    date_from: Optional[datetime] = None
    date_to: Optional[datetime] = None
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "status": "APPROVED",
            "payment_method": "CARD",
            "date_from": "2024-01-01T00:00:00Z",
            "date_to": "2024-12-31T23:59:59Z"
        }
    })

# ============= Payment Statistics =============

class PaymentStatistics(BaseModel):
    """Schema para estadísticas de pagos"""
    total_transactions: int = 0
    total_amount: Decimal = Decimal('0.00')
    approved_transactions: int = 0
    declined_transactions: int = 0
    pending_transactions: int = 0
    approval_rate: float = 0.0
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "total_transactions": 150,
            "total_amount": 6750000.00,
            "approved_transactions": 120,
            "declined_transactions": 25,
            "pending_transactions": 5,
            "approval_rate": 80.0
        }
    })
