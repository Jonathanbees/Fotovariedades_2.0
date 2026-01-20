"""
Schemas Pydantic para los modelos Order y OrderItem

Define la estructura de datos para validación y serialización
de pedidos y sus items en las peticiones y respuestas de la API.
"""

from datetime import datetime
from typing import Optional, List, Literal
from decimal import Decimal
from uuid import UUID
from pydantic import BaseModel, Field, ConfigDict, field_validator

# ============= OrderItem Schemas =============

class OrderItemBase(BaseModel):
    """Campos base para items de pedido"""
    product_id: int = Field(..., gt=0, description="ID del producto")
    quantity: int = Field(..., gt=0, description="Cantidad a ordenar")

class OrderItemCreate(OrderItemBase):
    """Schema para crear un item de pedido"""
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "product_id": 1,
            "quantity": 2
        }
    })

class OrderItemResponse(OrderItemBase):
    """Schema de respuesta para item de pedido"""
    id: int
    order_id: UUID
    price_at_purchase: Decimal = Field(description="Precio del producto al momento de la compra")
    subtotal: Decimal = Field(description="Subtotal del item (precio x cantidad)")
    
    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            "example": {
                "id": 1,
                "order_id": "550e8400-e29b-41d4-a716-446655440000",
                "product_id": 1,
                "quantity": 2,
                "price_at_purchase": 15000.00,
                "subtotal": 30000.00
            }
        }
    )

class OrderItemWithProduct(OrderItemResponse):
    """Schema de item con información del producto"""
    product_name: str
    product_image_url: Optional[str] = None
    
    model_config = ConfigDict(from_attributes=True)

# ============= Order Schemas =============

class OrderBase(BaseModel):
    """Campos base para pedidos"""
    pass

class OrderCreate(BaseModel):
    """Schema para crear un nuevo pedido"""
    items: List[OrderItemCreate] = Field(..., min_length=1, description="Lista de productos a ordenar")
    
    @field_validator('items')
    @classmethod
    def validate_items(cls, v: List[OrderItemCreate]) -> List[OrderItemCreate]:
        """Valida que haya al menos un item"""
        if not v:
            raise ValueError('El pedido debe tener al menos un producto')
        return v
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "items": [
                {"product_id": 1, "quantity": 2},
                {"product_id": 3, "quantity": 1}
            ]
        }
    })

class OrderUpdate(BaseModel):
    """Schema para actualizar un pedido (limitado)"""
    status: Optional[Literal["PENDING", "PAID", "FAILED", "REDEEMED", "CANCELLED"]] = Field(None, description="Nuevo estado del pedido")
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "status": "paid"
        }
    })

class OrderResponse(BaseModel):
    """Schema de respuesta básica para pedido"""
    id: UUID
    user_id: int
    total_amount: Decimal
    status: Literal["PENDING", "PAID", "FAILED", "REDEEMED", "CANCELLED"]
    wompi_reference: Optional[str] = None
    validation_code: str
    created_at: datetime
    redeemed_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            "example": {
                "id": "550e8400-e29b-41d4-a716-446655440000",
                "user_id": 1,
                "total_amount": 45000.00,
                "status": "pending",
                "wompi_reference": "WP-REF-123456",
                "validation_code": "VAL-ABC123XYZ",
                "created_at": "2024-01-15T10:30:00Z",
                "redeemed_at": None,
                "updated_at": None
            }
        }
    )

class OrderDetailResponse(OrderResponse):
    """Schema de respuesta detallada con items"""
    items: List[OrderItemWithProduct] = Field(default_factory=list)
    items_count: int = Field(default=0, description="Cantidad de items en el pedido")
    
    model_config = ConfigDict(from_attributes=True)

class OrderWithUser(OrderDetailResponse):
    """Schema de pedido con información del usuario"""
    user_email: str
    user_full_name: str
    
    model_config = ConfigDict(from_attributes=True)

# ============= Status Update Schemas =============

class OrderStatusUpdate(BaseModel):
    """Schema para cambiar el estado de un pedido"""
    status: Literal["PENDING", "PAID", "FAILED", "REDEEMED", "CANCELLED"] = Field(..., description="Nuevo estado del pedido")
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "status": "paid"
        }
    })

class OrderRedeemRequest(BaseModel):
    """Schema para canjear un pedido con QR"""
    validation_code: str = Field(..., min_length=1, description="Código de validación del QR")
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "validation_code": "VAL-ABC123XYZ"
        }
    })

class OrderRedeemResponse(BaseModel):
    """Schema de respuesta al canjear un pedido"""
    success: bool
    message: str
    order: OrderDetailResponse
    redeemed_at: datetime
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "success": True,
            "message": "Pedido canjeado exitosamente",
            "order": {},
            "redeemed_at": "2024-01-15T14:30:00Z"
        }
    })

# ============= List and Filters =============

class OrderListResponse(BaseModel):
    """Schema para listado paginado de pedidos"""
    total: int
    orders: List[OrderDetailResponse]
    page: int
    page_size: int
    
    model_config = ConfigDict(from_attributes=True)

class OrderFilters(BaseModel):
    """Schema para filtros de búsqueda de pedidos"""
    status: Optional[Literal["PENDING", "PAID", "FAILED", "REDEEMED", "CANCELLED"]] = Field(None, description="Filtrar por estado")
    user_id: Optional[int] = Field(None, description="Filtrar por usuario")
    date_from: Optional[datetime] = Field(None, description="Fecha desde")
    date_to: Optional[datetime] = Field(None, description="Fecha hasta")
    is_redeemed: Optional[bool] = Field(None, description="Solo pedidos canjeados/no canjeados")
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "status": "paid",
            "date_from": "2024-01-01T00:00:00Z",
            "date_to": "2024-12-31T23:59:59Z",
            "is_redeemed": False
        }
    })

# ============= Statistics =============

class OrderStatistics(BaseModel):
    """Schema para estadísticas de pedidos"""
    total_orders: int = 0
    total_revenue: Decimal = Decimal('0.00')
    pending_orders: int = 0
    paid_orders: int = 0
    redeemed_orders: int = 0
    failed_orders: int = 0
    average_order_value: Decimal = Decimal('0.00')
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "total_orders": 150,
            "total_revenue": 6750000.00,
            "pending_orders": 5,
            "paid_orders": 120,
            "redeemed_orders": 100,
            "failed_orders": 25,
            "average_order_value": 45000.00
        }
    })

# ============= Checkout =============

class CheckoutRequest(BaseModel):
    """Schema para iniciar el proceso de checkout"""
    items: List[OrderItemCreate]
    return_url: Optional[str] = Field(None, description="URL de retorno después del pago")
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "items": [
                {"product_id": 1, "quantity": 2}
            ],
            "return_url": "https://fotovariedades.com/orders/success"
        }
    })

class CheckoutResponse(BaseModel):
    """Schema de respuesta del checkout"""
    order_id: UUID
    wompi_reference: str
    wompi_payment_url: str
    total_amount: Decimal
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "order_id": "550e8400-e29b-41d4-a716-446655440000",
            "wompi_reference": "WP-REF-123456",
            "wompi_payment_url": "https://checkout.wompi.co/p/WP-REF-123456",
            "total_amount": 45000.00
        }
    })
