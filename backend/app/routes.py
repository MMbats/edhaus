from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from .models import db, Category, Product, User
from sqlalchemy import or_

main = Blueprint('main', __name__)

# Category routes
@main.route('/api/categories', methods=['GET'])
def get_categories():
    """Get all top-level categories with their subcategories"""
    categories = Category.query.filter_by(parent_id=None).all()
    return jsonify([category.to_dict() for category in categories])

@main.route('/api/categories/<int:id>', methods=['GET'])
def get_category(id):
    """Get a specific category by ID"""
    category = Category.query.get_or_404(id)
    return jsonify(category.to_dict())

@main.route('/api/admin/categories', methods=['POST'])
@jwt_required()
def create_category():
    """Create a new category (admin only)"""
    data = request.get_json()
    
    # Check if user is admin
    user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)
    if user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    new_category = Category(
        name=data['name'],
        description=data.get('description'),
        image_url=data.get('image_url'),
        parent_id=data.get('parent_id'),
        slug=data.get('slug'),
        display_order=data.get('display_order', 0)
    )
    
    db.session.add(new_category)
    db.session.commit()
    
    return jsonify(new_category.to_dict()), 201

# Product routes
@main.route('/api/products', methods=['GET'])
def get_products():
    """Get all products with optional filtering"""
    # Get query parameters
    category_id = request.args.get('category', type=int)
    search = request.args.get('search', '')
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)
    sort = request.args.get('sort', 'name')  # Default sort by name
    
    # Start with base query
    query = Product.query.filter_by(is_active=True)
    
    # Apply filters
    if category_id:
        query = query.filter_by(category_id=category_id)
    
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            or_(
                Product.name.ilike(search_term),
                Product.description.ilike(search_term)
            )
        )
    
    if min_price is not None:
        query = query.filter(Product.price >= min_price)
    
    if max_price is not None:
        query = query.filter(Product.price <= max_price)
    
    # Apply sorting
    if sort == 'price_low':
        query = query.order_by(Product.price.asc())
    elif sort == 'price_high':
        query = query.order_by(Product.price.desc())
    else:  # Default to name
        query = query.order_by(Product.name.asc())
    
    products = query.all()
    return jsonify({'products': [product.to_dict() for product in products]})

@main.route('/api/products/<int:id>', methods=['GET'])
def get_product(id):
    """Get a specific product by ID"""
    product = Product.query.get_or_404(id)
    return jsonify(product.to_dict())

@main.route('/api/products/category/<int:category_id>', methods=['GET'])
def get_products_by_category(category_id):
    """Get all products in a specific category"""
    products = Product.query.filter_by(category_id=category_id, is_active=True).all()
    return jsonify({'products': [product.to_dict() for product in products]})

@main.route('/api/admin/products', methods=['POST'])
@jwt_required()
def create_product():
    """Create a new product (admin only)"""
    data = request.get_json()
    
    # Check if user is admin
    user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)
    if user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    new_product = Product(
        name=data['name'],
        description=data.get('description'),
        price=data['price'],
        stock=data.get('stock', 0),
        category_id=data['category_id'],
        image_url=data.get('image_url'),
        sku=data.get('sku'),
        brand=data.get('brand'),
        manufacturer=data.get('manufacturer'),
        weight=data.get('weight'),
        dimensions=data.get('dimensions'),
        is_featured=data.get('is_featured', False)
    )
    
    db.session.add(new_product)
    db.session.commit()
    
    return jsonify(new_product.to_dict()), 201

@main.route('/api/admin/products/<int:id>', methods=['PUT'])
@jwt_required()
def update_product(id):
    """Update a product (admin only)"""
    # Check if user is admin
    user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)
    if user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    product = Product.query.get_or_404(id)
    data = request.get_json()
    
    # Update fields
    for key, value in data.items():
        if hasattr(product, key):
            setattr(product, key, value)
    
    db.session.commit()
    return jsonify(product.to_dict())

@main.route('/api/admin/products/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_product(id):
    """Delete a product (admin only)"""
    # Check if user is admin
    user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)
    if user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    product = Product.query.get_or_404(id)
    product.is_active = False  # Soft delete
    db.session.commit()
    
    return '', 204