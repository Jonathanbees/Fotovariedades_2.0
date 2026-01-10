"""
Schemas package initialization

Exporta todos los schemas Pydantic para uso en la aplicación.
"""

# User schemas
from app.schemas.user_schemas import (
    UserBase,
    UserCreate,
    UserRegister,
    UserUpdate,
    UserPasswordUpdate,
    UserResponse,
    UserWithOrders,
    UserLogin,
    Token,
    TokenData,
    UserListResponse,
)

# Product schemas
from app.schemas.product_schemas import (
    ProductBase,
    ProductCreate,
    ProductUpdate,
    ProductStockUpdate,
    ProductResponse,
    ProductWithStock,
    ProductListResponse,
    ProductSearchFilters,
    ProductInventoryAdjustment,
)

# Order schemas
from app.schemas.order_schemas import (
    OrderItemBase,
    OrderItemCreate,
    OrderItemResponse,
    OrderItemWithProduct,
    OrderBase,
    OrderCreate,
    OrderUpdate,
    OrderResponse,
    OrderDetailResponse,
    OrderWithUser,
    OrderStatusUpdate,
    OrderRedeemRequest,
    OrderRedeemResponse,
    OrderListResponse,
    OrderFilters,
    OrderStatistics,
    CheckoutRequest,
    CheckoutResponse,
)

# Payment schemas
from app.schemas.payment_schemas import (
    PaymentBase,
    PaymentCreate,
    PaymentUpdate,
    PaymentResponse,
    PaymentListResponse,
    WompiPaymentMethod,
    WompiTransaction,
    WompiWebhookEvent,
    WompiWebhookResponse,
    WompiPaymentLinkCreate,
    WompiPaymentLinkResponse,
    PaymentFilters,
    PaymentStatistics,
)

__all__ = [
    # User
    "UserBase",
    "UserCreate",
    "UserRegister",
    "UserUpdate",
    "UserPasswordUpdate",
    "UserResponse",
    "UserWithOrders",
    "UserLogin",
    "Token",
    "TokenData",
    "UserListResponse",
    # Product
    "ProductBase",
    "ProductCreate",
    "ProductUpdate",
    "ProductStockUpdate",
    "ProductResponse",
    "ProductWithStock",
    "ProductListResponse",
    "ProductSearchFilters",
    "ProductInventoryAdjustment",
    # Order
    "OrderItemBase",
    "OrderItemCreate",
    "OrderItemResponse",
    "OrderItemWithProduct",
    "OrderBase",
    "OrderCreate",
    "OrderUpdate",
    "OrderResponse",
    "OrderDetailResponse",
    "OrderWithUser",
    "OrderStatusUpdate",
    "OrderRedeemRequest",
    "OrderRedeemResponse",
    "OrderListResponse",
    "OrderFilters",
    "OrderStatistics",
    "CheckoutRequest",
    "CheckoutResponse",
    # Payment
    "PaymentBase",
    "PaymentCreate",
    "PaymentUpdate",
    "PaymentResponse",
    "PaymentListResponse",
    "WompiPaymentMethod",
    "WompiTransaction",
    "WompiWebhookEvent",
    "WompiWebhookResponse",
    "WompiPaymentLinkCreate",
    "WompiPaymentLinkResponse",
    "PaymentFilters",
    "PaymentStatistics",
]
