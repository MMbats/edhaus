from flask import Blueprint, jsonify, request, current_app
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from sqlalchemy import or_
from ..models import db, Product, Category, User

product_bp = Blueprint('product', __name__)

# Category routes
@product_bp.route('/categories', methods=['GET'])
@cross_origin()
def get_categories():
    try:
        with current_app.app_context():
            categories = Category.query.all()
            return jsonify([{
                'id': cat.id,
                'name': cat.name,
                'description': cat.description,
                'image_url': cat.image_url,
                'parent_id': cat.parent_id,
                'slug': cat.slug,
                'is_active': cat.is_active,
                'display_order': cat.display_order
            } for cat in categories]), 200
    except Exception as e:
        current_app.logger.error(f"Error in get_categories: {str(e)}")
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

@product_bp.route('/categories/<int:category_id>', methods=['GET'])
@cross_origin()
def get_category(category_id):
    try:
        with current_app.app_context():
            category = Category.query.get_or_404(category_id)
            return jsonify({
                'id': category.id,
                'name': category.name,
                'description': category.description,
                'image_url': category.image_url,
                'parent_id': category.parent_id,
                'slug': category.slug
            }), 200
    except Exception as e:
        current_app.logger.error(f"Error in get_category: {str(e)}")
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

# Product routes
@product_bp.route('/products', methods=['GET'])
@cross_origin()
def get_products():
    try:
        with current_app.app_context():
            query = Product.query

            # Get query parameters
            category_id = request.args.get('category_id')
            search = request.args.get('search', '')
            min_price = request.args.get('min_price')
            max_price = request.args.get('max_price')
            sort_by = request.args.get('sort_by', 'created_at')
            sort_order = request.args.get('sort_order', 'desc')

            # Apply category filter
            if category_id:
                try:
                    # Try to find category by ID first
                    category_id_int = int(category_id)
                    category = Category.query.get(category_id_int)
                except ValueError:
                    # If category_id is not an integer, try to find by slug
                    category = Category.query.filter_by(slug=category_id).first()
                
                if category:
                    query = query.filter_by(category_id=category.id)
                else:
                    return jsonify({'products': [], 'message': 'Category not found'}), 200

            # Apply search filter
            if search:
                search_filter = or_(
                    Product.name.ilike(f'%{search}%'),
                    Product.description.ilike(f'%{search}%')
                )
                query = query.filter(search_filter)

            # Apply price filters
            if min_price:
                query = query.filter(Product.price >= float(min_price))
            if max_price:
                query = query.filter(Product.price <= float(max_price))

            # Apply sorting
            if sort_by == 'price':
                query = query.order_by(Product.price.desc() if sort_order == 'desc' else Product.price.asc())
            else:  # default to created_at
                query = query.order_by(Product.created_at.desc() if sort_order == 'desc' else Product.created_at.asc())

            products = query.all()
            return jsonify([{
                'id': p.id,
                'name': p.name,
                'description': p.description,
                'price': float(p.price),
                'image_url': p.image_url,
                'category': {
                    'id': p.category.id,
                    'name': p.category.name,
                    'slug': p.category.slug
                } if p.category else None,
                'stock': p.stock,
                'created_at': p.created_at.isoformat() if p.created_at else None
            } for p in products]), 200
    except Exception as e:
        current_app.logger.error(f"Error in get_products: {str(e)}")
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

@product_bp.route('/products/<int:product_id>', methods=['GET'])
@cross_origin()
def get_product(product_id):
    try:
        with current_app.app_context():
            product = Product.query.get_or_404(product_id)
            return jsonify({
                'id': product.id,
                'name': product.name,
                'description': product.description,
                'price': product.price,
                'stock': product.stock,
                'image_url': product.image_url,
                'category_id': product.category_id,
                'sku': product.sku,
                'brand': product.brand,
                'manufacturer': product.manufacturer,
                'weight': product.weight,
                'dimensions': product.dimensions,
                'is_featured': product.is_featured,
                'is_active': product.is_active,
                'category': {
                    'id': product.category.id,
                    'name': product.category.name
                } if product.category else None
            }), 200
    except Exception as e:
        current_app.logger.error(f"Error in get_product: {str(e)}")
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

@product_bp.route('/products', methods=['POST'])
@jwt_required()
@cross_origin()
def create_product():
    try:
        with current_app.app_context():
            # Check if user is admin
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            if not user or user.role != 'admin':
                return jsonify({'error': 'Unauthorized'}), 403

            data = request.get_json()

            # Validate required fields
            required_fields = ['name', 'description', 'price', 'category_id']
            for field in required_fields:
                if field not in data:
                    return jsonify({'error': f'Missing required field: {field}'}), 400

            # Create new product
            product = Product(
                name=data['name'],
                description=data['description'],
                price=data['price'],
                stock=data.get('stock', 0),
                image_url=data.get('image_url'),
                category_id=data['category_id'],
                sku=data.get('sku'),
                brand=data.get('brand'),
                manufacturer=data.get('manufacturer'),
                weight=data.get('weight'),
                dimensions=data.get('dimensions'),
                is_featured=data.get('is_featured', False),
                is_active=data.get('is_active', True)
            )

            db.session.add(product)
            db.session.commit()

            return jsonify({
                'message': 'Product created successfully',
                'product': {
                    'id': product.id,
                    'name': product.name,
                    'description': product.description,
                    'price': product.price,
                    'stock': product.stock,
                    'image_url': product.image_url,
                    'category_id': product.category_id
                }
            }), 201
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error in create_product: {str(e)}")
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

@product_bp.route('/products/<int:product_id>', methods=['PUT'])
@jwt_required()
@cross_origin()
def update_product(product_id):
    try:
        with current_app.app_context():
            # Check if user is admin
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            if not user or user.role != 'admin':
                return jsonify({'error': 'Unauthorized'}), 403

            product = Product.query.get_or_404(product_id)

            data = request.get_json()

            # Update fields
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
                if not Category.query.get(data['category_id']):
                    return jsonify({'error': 'Invalid category_id'}), 400
                product.category_id = data['category_id']
            if 'sku' in data:
                product.sku = data['sku']
            if 'brand' in data:
                product.brand = data['brand']
            if 'manufacturer' in data:
                product.manufacturer = data['manufacturer']
            if 'weight' in data:
                product.weight = data['weight']
            if 'dimensions' in data:
                product.dimensions = data['dimensions']
            if 'is_featured' in data:
                product.is_featured = data['is_featured']
            if 'is_active' in data:
                product.is_active = data['is_active']

            db.session.commit()

            return jsonify({
                'message': 'Product updated successfully',
                'product': {
                    'id': product.id,
                    'name': product.name,
                    'description': product.description,
                    'price': product.price,
                    'stock': product.stock,
                    'image_url': product.image_url,
                    'category_id': product.category_id
                }
            }), 200
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error in update_product: {str(e)}")
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500
