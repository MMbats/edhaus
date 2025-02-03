from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import db, CartItem, Product, User

cart_bp = Blueprint('cart', __name__)

@cart_bp.route('', methods=['GET'])
@jwt_required()
def get_cart():
    user_id = get_jwt_identity()
    cart_items = CartItem.query.filter_by(user_id=user_id).all()
    
    return jsonify([{
        'id': item.id,
        'product': {
            'id': item.product.id,
            'name': item.product.name,
            'description': item.product.description,
            'price': item.product.price,
            'image_url': item.product.image_url
        },
        'quantity': item.quantity,
        'total': item.quantity * item.product.price
    } for item in cart_items]), 200

@cart_bp.route('/add', methods=['POST'])
@jwt_required()
def add_to_cart():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    # Validate required fields
    if not data.get('product_id'):
        return jsonify({'error': 'Missing product_id'}), 400
    
    quantity = data.get('quantity', 1)
    if quantity < 1:
        return jsonify({'error': 'Quantity must be at least 1'}), 400
    
    # Check if product exists and has enough stock
    product = Product.query.get_or_404(data['product_id'])
    if product.stock < quantity:
        return jsonify({'error': 'Not enough stock available'}), 400
    
    # Check if item already in cart
    cart_item = CartItem.query.filter_by(
        user_id=user_id,
        product_id=data['product_id']
    ).first()
    
    if cart_item:
        # Update quantity if already in cart
        cart_item.quantity += quantity
    else:
        # Add new item to cart
        cart_item = CartItem(
            user_id=user_id,
            product_id=data['product_id'],
            quantity=quantity
        )
        db.session.add(cart_item)
    
    db.session.commit()
    
    return jsonify({
        'id': cart_item.id,
        'product': {
            'id': product.id,
            'name': product.name,
            'price': product.price,
            'image_url': product.image_url
        },
        'quantity': cart_item.quantity,
        'total': cart_item.quantity * product.price
    }), 201

@cart_bp.route('/update/<int:item_id>', methods=['PUT'])
@jwt_required()
def update_cart_item(item_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    
    if 'quantity' not in data:
        return jsonify({'error': 'Missing quantity'}), 400
    
    quantity = data['quantity']
    if quantity < 0:
        return jsonify({'error': 'Quantity cannot be negative'}), 400
    
    cart_item = CartItem.query.filter_by(id=item_id, user_id=user_id).first_or_404()
    
    if quantity == 0:
        db.session.delete(cart_item)
        db.session.commit()
        return '', 204
    
    # Check if enough stock available
    if cart_item.product.stock < quantity:
        return jsonify({'error': 'Not enough stock available'}), 400
    
    cart_item.quantity = quantity
    db.session.commit()
    
    return jsonify({
        'id': cart_item.id,
        'product': {
            'id': cart_item.product.id,
            'name': cart_item.product.name,
            'price': cart_item.product.price,
            'image_url': cart_item.product.image_url
        },
        'quantity': cart_item.quantity,
        'total': cart_item.quantity * cart_item.product.price
    }), 200

@cart_bp.route('/remove/<int:item_id>', methods=['DELETE'])
@jwt_required()
def remove_from_cart(item_id):
    user_id = get_jwt_identity()
    cart_item = CartItem.query.filter_by(id=item_id, user_id=user_id).first_or_404()
    
    db.session.delete(cart_item)
    db.session.commit()
    
    return '', 204
