from flask import Blueprint
from .auth import auth_bp
from .product import product_bp
from .category import category_bp
from .order import order_bp

main = Blueprint('main', __name__)

def init_app(app):
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(product_bp, url_prefix='/api/products')
    app.register_blueprint(category_bp, url_prefix='/api/categories')
    app.register_blueprint(order_bp, url_prefix='/api/orders')
