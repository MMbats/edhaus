"""
Product Service Module

This module contains the business logic for product-related operations.
It serves as an intermediary layer between the routes and models,
ensuring separation of concerns and maintainable code.
"""

from typing import List, Optional, Dict, Any
from sqlalchemy import or_
from .. import db
from ..models.product import Product
from ..models.category import Category
from ..utils.exceptions import ResourceNotFoundError, ValidationError

class ProductService:
    @staticmethod
    def get_products(
        category_id: Optional[int] = None,
        search: Optional[str] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
        sort_by: str = 'created_at',
        sort_order: str = 'desc',
        page: int = 1,
        per_page: int = 20
    ) -> Dict[str, Any]:
        """
        Get products with filtering, sorting, and pagination.
        
        Args:
            category_id: Optional category filter
            search: Optional search term
            min_price: Optional minimum price filter
            max_price: Optional maximum price filter
            sort_by: Field to sort by (default: created_at)
            sort_order: Sort direction (asc/desc)
            page: Page number
            per_page: Items per page
            
        Returns:
            Dict containing products and metadata
        """
        query = Product.query

        # Apply category filter
        if category_id:
            query = query.filter_by(category_id=category_id)

        # Apply search filter
        if search:
            search_filter = or_(
                Product.name.ilike(f'%{search}%'),
                Product.description.ilike(f'%{search}%')
            )
            query = query.filter(search_filter)

        # Apply price filters
        if min_price is not None:
            query = query.filter(Product.price >= min_price)
        if max_price is not None:
            query = query.filter(Product.price <= max_price)

        # Apply sorting
        sort_column = getattr(Product, sort_by, Product.created_at)
        if sort_order == 'desc':
            sort_column = sort_column.desc()
        query = query.order_by(sort_column)

        # Apply pagination
        pagination = query.paginate(page=page, per_page=per_page)

        return {
            'items': pagination.items,
            'total': pagination.total,
            'pages': pagination.pages,
            'current_page': page
        }

    @staticmethod
    def get_product(product_id: int) -> Product:
        """Get a single product by ID."""
        product = Product.query.get(product_id)
        if not product:
            raise ResourceNotFoundError(f"Product with ID {product_id} not found")
        return product

    @staticmethod
    def create_product(data: Dict[str, Any]) -> Product:
        """Create a new product."""
        # Validate category
        category = Category.query.get(data.get('category_id'))
        if not category:
            raise ValidationError("Invalid category_id")

        product = Product(**data)
        db.session.add(product)
        db.session.commit()
        return product

    @staticmethod
    def update_product(product_id: int, data: Dict[str, Any]) -> Product:
        """Update an existing product."""
        product = ProductService.get_product(product_id)
        
        # Validate category if being updated
        if 'category_id' in data:
            category = Category.query.get(data['category_id'])
            if not category:
                raise ValidationError("Invalid category_id")

        for key, value in data.items():
            setattr(product, key, value)

        db.session.commit()
        return product

    @staticmethod
    def delete_product(product_id: int) -> None:
        """Delete a product."""
        product = ProductService.get_product(product_id)
        db.session.delete(product)
        db.session.commit()

    @staticmethod
    def get_product_categories() -> List[Category]:
        """Get all product categories."""
        return Category.query.all()

    @staticmethod
    def create_category(data: Dict[str, Any]) -> Category:
        """Create a new product category."""
        category = Category(**data)
        db.session.add(category)
        db.session.commit()
        return category
