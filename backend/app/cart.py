from flask import Blueprint, jsonify, request

# Define the Blueprint
cart_bp = Blueprint('cart', __name__)

# In-memory cart for demonstration purposes
cart = []

# Route to get all items in the cart
@cart_bp.route('/', methods=['GET'])
def get_cart():
    return jsonify(cart)

# Route to add an item to the cart
@cart_bp.route('/', methods=['POST'])
def add_to_cart():
    item = request.get_json()
    # Validate item structure
    if not item or 'id' not in item or 'name' not in item or 'quantity' not in item:
        return jsonify({"error": "Invalid item format. Expected fields: id, name, quantity"}), 400
    # Add item to the cart
    cart.append(item)
    return jsonify({"message": "Item added to cart", "cart": cart})

# Route to remove an item from the cart by ID
@cart_bp.route('/<int:item_id>', methods=['DELETE'])
def remove_from_cart(item_id):
    global cart
    # Filter out the item with the given ID
    cart = [item for item in cart if item['id'] != item_id]
    return jsonify({"message": "Item removed from cart", "cart": cart})

# Route to update an item's quantity in the cart by ID
@cart_bp.route('/<int:item_id>', methods=['PUT'])
def update_cart_item(item_id):
    updated_item = request.get_json()
    # Validate the update payload
    if not updated_item or 'quantity' not in updated_item:
        return jsonify({"error": "Invalid update format. Expected field: quantity"}), 400

    # Find and update the item
    for item in cart:
        if item['id'] == item_id:
            item['quantity'] = updated_item['quantity']
            return jsonify({"message": "Item updated", "cart": cart})
    
    # Item not found
    return jsonify({"error": "Item not found"}), 404
