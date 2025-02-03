from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import db, Category, User

category_bp = Blueprint('category', __name__)

@category_bp.route('', methods=['GET'])
def get_categories():
    categories = Category.query.filter_by(parent_id=None).all()
    return jsonify([{
        'id': c.id,
        'name': c.name,
        'description': c.description,
        'image_url': c.image_url,
        'created_at': c.created_at.isoformat(),
        'subcategories': [{
            'id': sc.id,
            'name': sc.name,
            'description': sc.description,
            'image_url': sc.image_url,
            'created_at': sc.created_at.isoformat()
        } for sc in c.subcategories]
    } for c in categories]), 200

@category_bp.route('/<int:category_id>', methods=['GET'])
def get_category(category_id):
    category = Category.query.get_or_404(category_id)
    return jsonify({
        'id': category.id,
        'name': category.name,
        'description': category.description,
        'image_url': category.image_url,
        'created_at': category.created_at.isoformat(),
        'parent': {
            'id': category.parent.id,
            'name': category.parent.name
        } if category.parent else None,
        'subcategories': [{
            'id': sc.id,
            'name': sc.name,
            'description': sc.description,
            'image_url': sc.image_url,
            'created_at': sc.created_at.isoformat()
        } for sc in category.subcategories] if not category.parent_id else []
    }), 200

# Admin endpoints
@category_bp.route('/admin/categories', methods=['POST'])
@jwt_required()
def create_category():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user or user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    data = request.get_json()
    
    # Validate required fields
    if not data.get('name'):
        return jsonify({'error': 'Name is required'}), 400
    
    # If parent_id is provided, validate it exists
    if data.get('parent_id'):
        parent = Category.query.get(data['parent_id'])
        if not parent:
            return jsonify({'error': 'Invalid parent category ID'}), 400
        if parent.parent_id:
            return jsonify({'error': 'Cannot create nested subcategories'}), 400
    
    category = Category(
        name=data['name'],
        description=data.get('description', ''),
        image_url=data.get('image_url'),
        parent_id=data.get('parent_id')
    )
    
    db.session.add(category)
    db.session.commit()
    
    return jsonify({
        'id': category.id,
        'name': category.name,
        'description': category.description,
        'image_url': category.image_url,
        'parent_id': category.parent_id,
        'created_at': category.created_at.isoformat()
    }), 201

@category_bp.route('/admin/categories/<int:category_id>', methods=['PUT'])
@jwt_required()
def update_category(category_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user or user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    category = Category.query.get_or_404(category_id)
    data = request.get_json()
    
    # Update fields if provided
    if 'name' in data:
        category.name = data['name']
    if 'description' in data:
        category.description = data['description']
    if 'image_url' in data:
        category.image_url = data['image_url']
    if 'parent_id' in data:
        if data['parent_id']:
            parent = Category.query.get(data['parent_id'])
            if not parent:
                return jsonify({'error': 'Invalid parent category ID'}), 400
            if parent.parent_id:
                return jsonify({'error': 'Cannot create nested subcategories'}), 400
        category.parent_id = data['parent_id']
    
    db.session.commit()
    
    return jsonify({
        'id': category.id,
        'name': category.name,
        'description': category.description,
        'image_url': category.image_url,
        'parent_id': category.parent_id,
        'created_at': category.created_at.isoformat()
    }), 200

@category_bp.route('/admin/categories/<int:category_id>', methods=['DELETE'])
@jwt_required()
def delete_category(category_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user or user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    category = Category.query.get_or_404(category_id)
    
    # Check if category has products
    if category.products:
        return jsonify({
            'error': 'Cannot delete category with products. Move or delete products first.'
        }), 400
    
    # If main category, check for subcategories
    if not category.parent_id and category.subcategories:
        return jsonify({
            'error': 'Cannot delete category with subcategories. Delete subcategories first.'
        }), 400
    
    db.session.delete(category)
    db.session.commit()
    
    return '', 204
