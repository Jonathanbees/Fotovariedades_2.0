
"""
Servicio de productos
Maneja la lógica de negocio para operaciones CRUD de productos.
"""
from typing import List, Optional, Tuple
from sqlalchemy.orm import Session
from sqlalchemy import func, or_
from fastapi import HTTPException, status
from decimal import Decimal

from app.models.products import Product
from app.schemas.product_schemas import ProductCreate, ProductUpdate, ProductSearchFilters


class ProductService:
    """Servicio para operaciones de productos"""

    @staticmethod
    def create_product(db: Session, product_data: ProductCreate) -> Product:
        """
        Crea un nuevo producto.

        Args:
            db: Sesión de base de datos.
            product_data: Datos del producto a crear.

        Returns:
            El producto recién creado.
        
        Raises:
            HTTPException si el SKU ya existe.
        """
        # Generar SKU único si no se proporciona
        sku = f"PROD-{product_data.name[:3].upper()}-{func.now()}"

        db_product = Product(
            **product_data.model_dump(),
            sku=sku
        )
        db.add(db_product)
        db.commit()
        db.refresh(db_product)
        return db_product

    @staticmethod
    def get_product(db: Session, product_id: int) -> Optional[Product]:
        """
        Obtiene un producto por su ID.

        Args:
            db: Sesión de base de datos.
            product_id: ID del producto.

        Returns:
            El producto si se encuentra, de lo contrario None.
        """
        return db.query(Product).filter(Product.id == product_id).first()

    @staticmethod
    def get_products(
        db: Session,
        filters: ProductSearchFilters,
        skip: int = 0,
        limit: int = 10
    ) -> Tuple[List[Product], int]:
        """
        Obtiene una lista paginada y filtrada de productos.

        Args:
            db: Sesión de base de datos.
            filters: Filtros de búsqueda.
            skip: Número de registros a saltar.
            limit: Número máximo de registros a devolver.

        Returns:
            Una tupla con la lista de productos y el conteo total.
        """
        query = db.query(Product)

        if filters.search:
            search_term = f"%{filters.search}%"
            query = query.filter(
                or_(
                    Product.name.ilike(search_term),
                    Product.description.ilike(search_term)
                )
            )
        
        if filters.category:
            query = query.filter(Product.category == filters.category)
        
        if filters.min_price is not None:
            query = query.filter(Product.price >= filters.min_price)
            
        if filters.max_price is not None:
            query = query.filter(Product.price <= filters.max_price)

        if filters.is_active is not None:
            query = query.filter(Product.is_active == filters.is_active)
            
        if filters.in_stock:
            query = query.filter(Product.stock_quantity > 0)

        total_count = query.count()
        products = query.offset(skip).limit(limit).all()
        
        return products, total_count

    @staticmethod
    def update_product(db: Session, product_id: int, product_data: ProductUpdate) -> Optional[Product]:
        """
        Actualiza un producto existente.

        Args:
            db: Sesión de base de datos.
            product_id: ID del producto a actualizar.
            product_data: Datos para actualizar.

        Returns:
            El producto actualizado o None si no se encuentra.
        """
        db_product = ProductService.get_product(db, product_id)
        if not db_product:
            return None

        update_data = product_data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_product, key, value)

        db.commit()
        db.refresh(db_product)
        return db_product

    @staticmethod
    def delete_product(db: Session, product_id: int) -> bool:
        """
        Elimina un producto.

        Args:
            db: Sesión de base de datos.
            product_id: ID del producto a eliminar.

        Returns:
            True si se eliminó, False en caso contrario.
        """
        db_product = ProductService.get_product(db, product_id)
        if not db_product:
            return False
        
        db.delete(db_product)
        db.commit()
        return True
