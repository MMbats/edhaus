"""
Product Routes Module

This module handles all product-related routes including:
- Product listing and filtering
- Product details
- Product creation and management
- Category management
"""

from flask import Blueprint, jsonify, request, current_app
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..services.product_service import ProductService
from ..utils.exceptions import APIError, ValidationError
from ..utils.decorators import admin_required
from ..models.category import Category
from ..models.product import Product
from .. import db
import traceback

product_bp = Blueprint('product', __name__)

@product_bp.errorhandler(APIError)
def handle_api_error(error):
    """Handle custom API errors."""
    response = {
        'error': error.message,
        'status': error.status_code
    }
    return jsonify(response), error.status_code

# Category routes
@product_bp.route('/categories', methods=['GET'])
@cross_origin()
def get_categories():
    """Get all categories."""
    try:
        categories = Category.query.all()
        return jsonify([cat.to_dict() for cat in categories]), 200
    except Exception as e:
        current_app.logger.error(f"Error in get_categories: {str(e)}")
        current_app.logger.error(traceback.format_exc())
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

@product_bp.route('/categories/<int:category_id>', methods=['GET'])
@cross_origin()
def get_category(category_id):
    """Get a single category by ID."""
    try:
        category = Category.query.get_or_404(category_id)
        return jsonify(category.to_dict()), 200
    except Exception as e:
        current_app.logger.error(f"Error in get_category: {str(e)}")
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

@product_bp.route('/categories', methods=['POST'])
@cross_origin()
@jwt_required()
@admin_required
def create_category():
    """Create a new category."""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'slug']
        for field in required_fields:
            if field not in data:
                raise ValidationError(f"Missing required field: {field}")
        
        # Create new category
        category = Category(
            name=data['name'],
            description=data.get('description'),
            image_url=data.get('image_url'),
            parent_id=data.get('parent_id'),
            slug=data['slug'],
            is_active=data.get('is_active', True),
            display_order=data.get('display_order', 0)
        )
        
        db.session.add(category)
        db.session.commit()
        
        return jsonify(category.to_dict()), 201
        
    except ValidationError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error in create_category: {str(e)}")
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

# Product routes
@product_bp.route('/products', methods=['GET'])
@cross_origin()
def get_products():
    """Get all products with optional filtering."""
    try:
        # Get query parameters
        category_id = request.args.get('category_id', type=int)
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        # Base query
        query = Product.query
        
        # Apply filters
        if category_id:
            query = query.filter_by(category_id=category_id)
        
        # Apply pagination
        products = query.paginate(page=page, per_page=per_page, error_out=False)
        
        return jsonify({
            'items': [p.to_dict() for p in products.items],
            'total': products.total,
            'pages': products.pages,
            'current_page': products.page
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"Error in get_products: {str(e)}")
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

@product_bp.route('/products/<int:product_id>', methods=['GET'])
@cross_origin()
def get_product(product_id):
    """Get a single product by ID."""
    try:
        product = Product.query.get_or_404(product_id)
        return jsonify(product.to_dict()), 200
    except Exception as e:
        current_app.logger.error(f"Error in get_product: {str(e)}")
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

@product_bp.route('/products', methods=['POST'])
@cross_origin()
@jwt_required()
@admin_required
def create_product():
    """Create a new product."""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'price', 'category_id', 'slug']
        for field in required_fields:
            if field not in data:
                raise ValidationError(f"Missing required field: {field}")
        
        # Validate category exists
        category = Category.query.get(data['category_id'])
        if not category:
            raise ValidationError("Invalid category_id")
        
        # Create new product
        product = Product(
            name=data['name'],
            description=data.get('description'),
            price=data['price'],
            stock=data.get('stock', 0),
            image_url=data.get('image_url'),
            category_id=data['category_id'],
            slug=data['slug'],
            is_active=data.get('is_active', True)
        )
        
        db.session.add(product)
        db.session.commit()
        
        return jsonify(product.to_dict()), 201
        
    except ValidationError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error in create_product: {str(e)}")
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

@product_bp.route('/products/<int:product_id>', methods=['PUT'])
@cross_origin()
@jwt_required()
@admin_required
def update_product(product_id):
    """Update a product."""
    try:
        product = Product.query.get_or_404(product_id)
        data = request.get_json()
        
        # Update fields if provided
        if 'name' in data:
            product.name = data['name']
        if 'description' in data:
            product.description = data['description']
        if 'price' in data:
            product.price = data['price']
        if 'stock' in data:
            product.stock = data['stock']
        if 'image_url' in data:
            product.image_url = data['image_url']
        if 'category_id' in data:
            # Validate category exists
            category = Category.query.get(data['category_id'])
            if not category:
                raise ValidationError("Invalid category_id")
            product.category_id = data['category_id']
        if 'slug' in data:
            product.slug = data['slug']
        if 'is_active' in data:
            product.is_active = data['is_active']
        
        db.session.commit()
        
        return jsonify(product.to_dict()), 200
        
    except ValidationError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error in update_product: {str(e)}")
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500
