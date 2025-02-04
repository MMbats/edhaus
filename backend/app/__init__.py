"""
Initialize Flask application and its extensions.
"""

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_mail import Mail
from datetime import timedelta
from .config import Config
import os

# Initialize extensions
db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()
mail = Mail()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)
    
    # Enable CORS
    CORS(app, resources={
        r"/api/*": {
            "origins": "*",
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    # Import and register blueprints
    from .routes.auth import auth_bp
    from .routes.product import product_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(product_bp, url_prefix='/api')
    
    # Error handlers
    @app.errorhandler(404)
    def not_found_error(error):
        return {'error': 'Not Found'}, 404
        
    @app.errorhandler(500)
    def internal_error(error):
        return {'error': 'Internal Server Error'}, 500
    
    return app

# Create the app instance
app = create_app()

# Import models after creating app instance to avoid circular imports
from .models.category import Category
from .models.product import Product