
"""
Router para Productos
Maneja los endpoints de la API para operaciones CRUD de productos.
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.schemas.product_schemas import (
    ProductCreate, 
    ProductUpdate, 
    ProductResponse, 
    ProductListResponse,
    ProductSearchFilters
)
from app.services.product_service import ProductService
from app.core.dependencies import get_current_active_user
from app.models.users import User, UserRole

router = APIRouter(prefix="/products", tags=["Productos"])


@router.post(
    "/", 
    response_model=ProductResponse, 
    status_code=status.HTTP_201_CREATED,
    summary="Crear un nuevo producto",
    dependencies=[Depends(get_current_active_user)]
)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Crea un nuevo producto en el inventario.
    
    - **Requiere autenticación.**
    - **Solo accesible para roles `ADMIN` o `MANAGER`.**
    """
    if current_user.role not in [UserRole.ADMIN, UserRole.MANAGER]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tiene permisos para crear productos."
        )
    
    return ProductService.create_product(db=db, product_data=product)


@router.get(
    "/{product_id}", 
    response_model=ProductResponse, 
    summary="Obtener un producto por ID"
)
def get_product(
    product_id: int, 
    db: Session = Depends(get_db)
):
    """
    Obtiene la información detallada de un producto específico por su ID.
    
    - **No requiere autenticación.**
    """
    db_product = ProductService.get_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Producto no encontrado"
        )
    return db_product


@router.get(
    "/", 
    response_model=ProductListResponse, 
    summary="Listar productos con filtros y paginación"
)
def get_products(
    filters: ProductSearchFilters = Depends(),
    page: int = Query(1, ge=1, description="Número de página"),
    page_size: int = Query(10, ge=1, le=100, description="Tamaño de página"),
    db: Session = Depends(get_db)
):
    """
    Obtiene un listado de productos con opciones de filtrado y paginación.
    
    - **No requiere autenticación.**
    - **Filtros disponibles:** búsqueda por texto, categoría, rango de precios, etc.
    """
    skip = (page - 1) * page_size
    products, total_count = ProductService.get_products(
        db, filters=filters, skip=skip, limit=page_size
    )
    
    return {
        "total": total_count,
        "products": products,
        "page": page,
        "page_size": page_size
    }


@router.put(
    "/{product_id}", 
    response_model=ProductResponse, 
    summary="Actualizar un producto",
    dependencies=[Depends(get_current_active_user)]
)
def update_product(
    product_id: int,
    product: ProductUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Actualiza la información de un producto existente.
    
    - **Requiere autenticación.**
    - **Solo accesible para roles `ADMIN` o `MANAGER`.**
    """
    if current_user.role not in [UserRole.ADMIN, UserRole.MANAGER]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tiene permisos para actualizar productos."
        )
        
    updated_product = ProductService.update_product(
        db, product_id=product_id, product_data=product
    )
    if updated_product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Producto no encontrado"
        )
    return updated_product


@router.delete(
    "/{product_id}", 
    status_code=status.HTTP_204_NO_CONTENT, 
    summary="Eliminar un producto",
    dependencies=[Depends(get_current_active_user)]
)
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Elimina un producto del inventario.
    
    - **Requiere autenticación.**
    - **Solo accesible para roles `ADMIN`.**
    """
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tiene permisos para eliminar productos."
        )
        
    if not ProductService.delete_product(db, product_id=product_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Producto no encontrado"
        )
    return
