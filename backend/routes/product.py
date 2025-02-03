from flask import Blueprint, request, jsonify, send_from_directory
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import db, Product, Category, User
from sqlalchemy import or_
import os

product_bp = Blueprint('product', __name__)

# Configure image folder
PUBLIC_FOLDER = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public')

@product_bp.route('/public/images/<path:filename>')
def serve_image(filename):
    return send_from_directory(os.path.join(PUBLIC_FOLDER, 'images', 'products'), filename)

@product_bp.route('/upload-image', methods=['POST'])
@jwt_required()
def upload_image():
    # Check if user is admin
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user or user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    filename = file.filename
    file.save(os.path.join(PUBLIC_FOLDER, 'images', 'products', filename))
    
    image_url = f"/api/products/public/images/{filename}"
    return jsonify({'image_url': image_url}), 201

@product_bp.route('', methods=['GET'])
def get_products():
    # Get query parameters
    search = request.args.get('search', '').strip()
    category_id = request.args.get('category_id', type=int)
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)
    sort_by = request.args.get('sort_by', 'created_at')  # price, created_at
    sort_order = request.args.get('sort_order', 'desc')  # asc, desc
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    # Start with base query
    query = Product.query
    
    # Apply search filter
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            or_(
                Product.name.ilike(search_term),
                Product.description.ilike(search_term)
            )
        )
    
    # Apply category filter
    if category_id:
        category = Category.query.get(category_id)
        if category:
            if category.parent_id is None:
                # If main category, get all products in subcategories
                subcategory_ids = [c.id for c in category.subcategories]
                query = query.filter(Product.category_id.in_([category_id] + subcategory_ids))
            else:
                # If subcategory, get products in that category only
                query = query.filter_by(category_id=category_id)
    
    # Apply price filters
    if min_price is not None:
        query = query.filter(Product.price >= min_price)
    if max_price is not None:
        query = query.filter(Product.price <= max_price)
    
    # Apply sorting
    if sort_by == 'price':
        query = query.order_by(
            Product.price.desc() if sort_order == 'desc' else Product.price.asc()
        )
    else:  # default to created_at
        query = query.order_by(
            Product.created_at.desc() if sort_order == 'desc' else Product.created_at.asc()
        )
    
    # Apply pagination
    pagination = query.paginate(page=page, per_page=per_page, error_out=False)
    products = pagination.items
    
    # Get all categories for the response
    categories = Category.query.filter_by(parent_id=None).all()
    
    return jsonify({
        'products': [{
            'id': p.id,
            'name': p.name,
            'description': p.description,
            'price': p.price,
            'stock': p.stock,
            'category_id': p.category_id,
            'image_url': p.image_url,
            'created_at': p.created_at.isoformat()
        } for p in products],
        'categories': [{
            'id': c.id,
            'name': c.name,
            'description': c.description,
            'image_url': c.image_url,
            'subcategories': [{
                'id': sc.id,
                'name': sc.name,
                'description': sc.description,
                'image_url': sc.image_url
            } for sc in c.subcategories]
        } for c in categories],
        'pagination': {
            'page': page,
            'per_page': per_page,
            'total_pages': pagination.pages,
            'total_items': pagination.total
        }
    }), 200

@product_bp.route('/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    
    # Get related products from the same category
    related_products = Product.query.filter(
        Product.category_id == product.category_id,
        Product.id != product.id
    ).limit(4).all()
    
    return jsonify({
        'id': product.id,
        'name': product.name,
        'description': product.description,
        'price': product.price,
        'stock': product.stock,
        'category_id': product.category_id,
        'image_url': product.image_url,
        'created_at': product.created_at.isoformat(),
        'category': {
            'id': product.category.id,
            'name': product.category.name,
            'parent': {
                'id': product.category.parent.id,
                'name': product.category.parent.name
            } if product.category.parent else None
        },
        'related_products': [{
            'id': p.id,
            'name': p.name,
            'description': p.description,
            'price': p.price,
            'stock': p.stock,
            'image_url': p.image_url
        } for p in related_products]
    }), 200

@product_bp.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.filter_by(parent_id=None).all()
    return jsonify([{
        'id': c.id,
        'name': c.name,
        'description': c.description,
        'image_url': c.image_url,
        'subcategories': [{
            'id': sc.id,
            'name': sc.name,
            'description': sc.description,
            'image_url': sc.image_url
        } for sc in c.subcategories]
    } for c in categories]), 200

@product_bp.route('/category/<int:category_id>', methods=['GET'])
def get_category_products(category_id):
    category = Category.query.get_or_404(category_id)
    
    # Get query parameters
    sort_by = request.args.get('sort_by', 'created_at')
    sort_order = request.args.get('sort_order', 'desc')
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    # Build query
    query = Product.query
    
    if category.parent_id is None:
        # If main category, get all products in subcategories
        subcategory_ids = [c.id for c in category.subcategories]
        query = query.filter(Product.category_id.in_([category_id] + subcategory_ids))
    else:
        # If subcategory, get products in that category only
        query = query.filter_by(category_id=category_id)
    
    # Apply sorting
    if sort_by == 'price':
        query = query.order_by(
            Product.price.desc() if sort_order == 'desc' else Product.price.asc()
        )
    else:  # default to created_at
        query = query.order_by(
            Product.created_at.desc() if sort_order == 'desc' else Product.created_at.asc()
        )
    
    # Apply pagination
    pagination = query.paginate(page=page, per_page=per_page, error_out=False)
    products = pagination.items
    
    return jsonify({
        'category': {
            'id': category.id,
            'name': category.name,
            'description': category.description,
            'image_url': category.image_url,
            'parent': {
                'id': category.parent.id,
                'name': category.parent.name
            } if category.parent else None
        },
        'products': [{
            'id': p.id,
            'name': p.name,
            'description': p.description,
            'price': p.price,
            'stock': p.stock,
            'image_url': p.image_url,
            'created_at': p.created_at.isoformat()
        } for p in products],
        'pagination': {
            'page': page,
            'per_page': per_page,
            'total_pages': pagination.pages,
            'total_items': pagination.total
        }
    }), 200

# Admin endpoints
@product_bp.route('/admin/products', methods=['POST'])
@jwt_required()
def create_product():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user or user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['name', 'price', 'category_id']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'error': f'{field.replace("_", " ").title()} is required'}), 400
    
    # Validate category exists
    category = Category.query.get(data['category_id'])
    if not category:
        return jsonify({'error': 'Invalid category ID'}), 400
    
    product = Product(
        name=data['name'],
        description=data.get('description', ''),
        price=data['price'],
        stock=data.get('stock', 0),
        image_url=data.get('image_url'),
        category_id=data['category_id']
    )
    
    db.session.add(product)
    db.session.commit()
    
    return jsonify({
        'id': product.id,
        'name': product.name,
        'description': product.description,
        'price': product.price,
        'stock': product.stock,
        'category_id': product.category_id,
        'image_url': product.image_url,
        'created_at': product.created_at.isoformat()
    }), 201

@product_bp.route('/admin/products/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user or user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
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
        category = Category.query.get(data['category_id'])
        if not category:
            return jsonify({'error': 'Invalid category ID'}), 400
        product.category_id = data['category_id']
    
    db.session.commit()
    
    return jsonify({
        'id': product.id,
        'name': product.name,
        'description': product.description,
        'price': product.price,
        'stock': product.stock,
        'category_id': product.category_id,
        'image_url': product.image_url,
        'created_at': product.created_at.isoformat()
    }), 200

@product_bp.route('/admin/products/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user or user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    product = Product.query.get_or_404(product_id)
    db.session.delete(product)
    db.session.commit()
    
    return '', 204
