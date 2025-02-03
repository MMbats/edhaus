from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import db, Order, OrderItem, CartItem, Product, User
from app.utils.email import send_order_confirmation, send_order_status_update

order_bp = Blueprint('order', __name__)

@order_bp.route('', methods=['GET'])
@jwt_required()
def get_orders():
    user_id = get_jwt_identity()
    orders = Order.query.filter_by(user_id=user_id).order_by(Order.created_at.desc()).all()
    
    return jsonify([{
        'id': order.id,
        'status': order.status,
        'total_amount': order.total_amount,
        'shipping_address': order.shipping_address,
        'phone_number': order.phone_number,
        'created_at': order.created_at.isoformat(),
        'items': [{
            'id': item.id,
            'product': {
                'id': item.product.id,
                'name': item.product.name,
                'image_url': item.product.image_url
            },
            'quantity': item.quantity,
            'price': item.price
        } for item in order.items]
    } for order in orders]), 200

@order_bp.route('/<int:order_id>', methods=['GET'])
@jwt_required()
def get_order(order_id):
    user_id = get_jwt_identity()
    order = Order.query.filter_by(id=order_id, user_id=user_id).first_or_404()
    
    return jsonify({
        'id': order.id,
        'status': order.status,
        'total_amount': order.total_amount,
        'shipping_address': order.shipping_address,
        'phone_number': order.phone_number,
        'created_at': order.created_at.isoformat(),
        'items': [{
            'id': item.id,
            'product': {
                'id': item.product.id,
                'name': item.product.name,
                'image_url': item.product.image_url
            },
            'quantity': item.quantity,
            'price': item.price
        } for item in order.items]
    }), 200

@order_bp.route('/checkout', methods=['POST'])
@jwt_required()
def create_order():
    user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['shipping_address', 'phone_number']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'error': f'{field.replace("_", " ").title()} is required'}), 400
    
    # Get user's cart items
    cart_items = CartItem.query.filter_by(user_id=user_id).all()
    if not cart_items:
        return jsonify({'error': 'Cart is empty'}), 400
    
    # Calculate total and check stock
    total_amount = 0
    order_items_data = []
    
    for cart_item in cart_items:
        product = cart_item.product
        if product.stock < cart_item.quantity:
            return jsonify({
                'error': f'Not enough stock for {product.name}. Available: {product.stock}'
            }), 400
        
        # Calculate item total
        item_total = product.price * cart_item.quantity
        total_amount += item_total
        
        # Prepare order item data
        order_items_data.append({
            'product': product,
            'quantity': cart_item.quantity,
            'price': product.price
        })
        
        # Update product stock
        product.stock -= cart_item.quantity
    
    # Create order
    order = Order(
        user_id=user_id,
        total_amount=total_amount,
        shipping_address=data['shipping_address'],
        phone_number=data['phone_number'],
        status='pending'
    )
    db.session.add(order)
    db.session.flush()  # Get the order ID
    
    # Create order items
    for item_data in order_items_data:
        order_item = OrderItem(
            order_id=order.id,
            product_id=item_data['product'].id,
            quantity=item_data['quantity'],
            price=item_data['price']
        )
        db.session.add(order_item)
    
    # Clear cart
    for cart_item in cart_items:
        db.session.delete(cart_item)
    
    db.session.commit()
    
    # Send order confirmation email
    send_order_confirmation(order, user)
    
    return jsonify({
        'id': order.id,
        'status': order.status,
        'total_amount': order.total_amount,
        'shipping_address': order.shipping_address,
        'phone_number': order.phone_number,
        'created_at': order.created_at.isoformat(),
        'message': 'Order placed successfully! We will contact you soon.'
    }), 201

@order_bp.route('/<int:order_id>/cancel', methods=['POST'])
@jwt_required()
def cancel_order(order_id):
    user_id = get_jwt_identity()
    order = Order.query.filter_by(id=order_id, user_id=user_id).first_or_404()
    user = User.query.get(user_id)
    
    if order.status != 'pending':
        return jsonify({'error': 'Can only cancel pending orders'}), 400
    
    # Restore product stock
    for item in order.items:
        item.product.stock += item.quantity
    
    order.status = 'cancelled'
    db.session.commit()
    
    # Send cancellation email
    send_order_status_update(order, user)
    
    return jsonify({
        'id': order.id,
        'status': order.status,
        'message': 'Order cancelled successfully'
    }), 200

# Admin endpoints
@order_bp.route('/admin/orders', methods=['GET'])
@jwt_required()
def admin_get_orders():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user or user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    orders = Order.query.order_by(Order.created_at.desc()).all()
    return jsonify([{
        'id': order.id,
        'user': {
            'id': order.user.id,
            'name': order.user.name,
            'email': order.user.email,
            'phone': order.phone_number
        },
        'status': order.status,
        'total_amount': order.total_amount,
        'shipping_address': order.shipping_address,
        'created_at': order.created_at.isoformat(),
        'items': [{
            'id': item.id,
            'product': {
                'id': item.product.id,
                'name': item.product.name,
                'image_url': item.product.image_url
            },
            'quantity': item.quantity,
            'price': item.price
        } for item in order.items]
    } for order in orders]), 200

@order_bp.route('/admin/orders/<int:order_id>/status', methods=['PUT'])
@jwt_required()
def admin_update_order_status(order_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user or user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    data = request.get_json()
    if 'status' not in data:
        return jsonify({'error': 'Status is required'}), 400
    
    valid_statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
    if data['status'] not in valid_statuses:
        return jsonify({'error': f'Invalid status. Must be one of: {", ".join(valid_statuses)}'}), 400
    
    order = Order.query.get_or_404(order_id)
    old_status = order.status
    order.status = data['status']
    
    if data['status'] == 'cancelled' and old_status == 'pending':
        # Restore product stock if cancelling a pending order
        for item in order.items:
            item.product.stock += item.quantity
    
    db.session.commit()
    
    # Send status update email to customer
    send_order_status_update(order, order.user)
    
    return jsonify({
        'id': order.id,
        'status': order.status,
        'message': 'Order status updated successfully'
    }), 200
