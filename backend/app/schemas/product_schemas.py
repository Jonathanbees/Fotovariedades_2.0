"""
Schemas Pydantic para el modelo Product

Define la estructura de datos para validación y serialización
de productos en las peticiones y respuestas de la API.
"""

from datetime import datetime
from typing import Optional
from decimal import Decimal
from pydantic import BaseModel, Field, ConfigDict, field_validator

# Schemas Base
class ProductBase(BaseModel):
    """Campos base compartidos por todos los schemas de Product"""
    name: str = Field(..., min_length=1, max_length=255, description="Nombre del producto")
    description: Optional[str] = Field(None, max_length=5000, description="Descripción detallada del producto")
    price: Decimal = Field(..., gt=0, decimal_places=2, description="Precio del producto (mayor a 0)")
    category: Optional[str] = Field(None, max_length=100, description="Categoría del producto")
    image_url: Optional[str] = Field(None, max_length=500, description="URL de la imagen del producto")
    
    @field_validator('price')
    @classmethod
    def validate_price(cls, v: Decimal) -> Decimal:
        """Valida que el precio tenga máximo 2 decimales"""
        if v <= 0:
            raise ValueError('El precio debe ser mayor a 0')
        # Asegurar 2 decimales
        return v.quantize(Decimal('0.01'))

# Schemas de Creación
class ProductCreate(ProductBase):
    """Schema para crear un nuevo producto"""
    stock_quantity: int = Field(default=0, ge=0, description="Cantidad en stock (mayor o igual a 0)")
    is_active: bool = Field(default=True, description="Si el producto está activo y visible")
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "name": "Resma de Papel A4",
            "description": "Resma de papel tamaño carta de 500 hojas",
            "price": 15000.00,
            "stock_quantity": 50,
            "category": "Papelería",
            "image_url": "https://example.com/images/resma-papel.jpg",
            "is_active": True
        }
    })

# Schemas de Actualización
class ProductUpdate(BaseModel):
    """Schema para actualizar un producto existente"""
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=5000)
    price: Optional[Decimal] = Field(None, gt=0, decimal_places=2)
    stock_quantity: Optional[int] = Field(None, ge=0)
    category: Optional[str] = Field(None, max_length=100)
    image_url: Optional[str] = Field(None, max_length=500)
    is_active: Optional[bool] = None
    
    @field_validator('price')
    @classmethod
    def validate_price(cls, v: Optional[Decimal]) -> Optional[Decimal]:
        """Valida que el precio tenga máximo 2 decimales"""
        if v is not None:
            if v <= 0:
                raise ValueError('El precio debe ser mayor a 0')
            return v.quantize(Decimal('0.01'))
        return v
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "name": "Resma de Papel A4 Premium",
            "price": 18000.00,
            "stock_quantity": 75
        }
    })

class ProductStockUpdate(BaseModel):
    """Schema para actualizar solo el stock"""
    stock_quantity: int = Field(..., ge=0, description="Nueva cantidad en stock")
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "stock_quantity": 100
        }
    })

# Schemas de Respuesta
class ProductResponse(ProductBase):
    """Schema de respuesta con datos del producto"""
    id: int
    stock_quantity: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            "example": {
                "id": 1,
                "name": "Resma de Papel A4",
                "description": "Resma de papel tamaño carta de 500 hojas",
                "price": 15000.00,
                "stock_quantity": 50,
                "category": "Papelería",
                "image_url": "https://example.com/images/resma-papel.jpg",
                "is_active": True,
                "created_at": "2024-01-15T10:30:00Z",
                "updated_at": None
            }
        }
    )

class ProductWithStock(ProductResponse):
    """Schema de producto con información de disponibilidad"""
    is_in_stock: bool = Field(description="Si el producto tiene stock disponible")
    
    @classmethod
    def from_product(cls, product):
        """Crea una instancia desde un modelo Product"""
        return cls(
            **product.__dict__,
            is_in_stock=product.is_in_stock
        )
    
    model_config = ConfigDict(from_attributes=True)

# Schemas para listados
class ProductListResponse(BaseModel):
    """Schema para listado paginado de productos"""
    total: int
    products: list[ProductResponse]
    page: int
    page_size: int
    
    model_config = ConfigDict(from_attributes=True)

class ProductSearchFilters(BaseModel):
    """Schema para filtros de búsqueda de productos"""
    search: Optional[str] = Field(None, description="Búsqueda por nombre o descripción")
    category: Optional[str] = Field(None, description="Filtrar por categoría")
    min_price: Optional[Decimal] = Field(None, ge=0, description="Precio mínimo")
    max_price: Optional[Decimal] = Field(None, ge=0, description="Precio máximo")
    is_active: Optional[bool] = Field(None, description="Filtrar por estado activo")
    in_stock: Optional[bool] = Field(None, description="Solo productos con stock")
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "search": "papel",
            "category": "Papelería",
            "min_price": 5000.00,
            "max_price": 50000.00,
            "is_active": True,
            "in_stock": True
        }
    })

# Schemas para operaciones de inventario
class ProductInventoryAdjustment(BaseModel):
    """Schema para ajuste de inventario (agregar o quitar stock)"""
    adjustment: int = Field(..., description="Cantidad a ajustar (positivo para agregar, negativo para quitar)")
    reason: Optional[str] = Field(None, max_length=500, description="Razón del ajuste")
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "adjustment": -5,
            "reason": "Productos dañados"
        }
    })
