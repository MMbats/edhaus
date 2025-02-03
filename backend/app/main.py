from flask import Blueprint, Flask, request, jsonify
from flask_cors import CORS
from . import db
from .models import Product

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///edhaus.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key'  # Change in production

# Initialize extensions
db.init_app(app)

# Create tables
with app.app_context():
    db.create_all()

main = Blueprint('main', __name__)

@main.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    output = []
    for product in products:
        product_data = {
            'id': product.id,
            'name': product.name,
            'description': product.description,
            'price': product.price,
            'quantity': product.quantity,
            'category': product.category
        }
        output.append(product_data)
    return jsonify({'products': output})

@main.route('/products', methods=['POST'])
def add_product():
    data = request.get_json()

    new_product = Product(
        name=data['name'],
        description=data['description'],
        price=data['price'],
        quantity=data['quantity'],
        category=data['category']
    )
    db.session.add(new_product)
    db.session.commit()

    return jsonify({'message': 'Product added successfully!'})

app.register_blueprint(main, url_prefix='/api')

@app.route('/')
def home():
    return {'message': 'EdHaus API is running'}