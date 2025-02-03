from app import create_app
from app.models import db
from init_categories import init_categories
from init_products import init_products

def init_db():
    app = create_app()
    with app.app_context():
        # Drop all tables
        db.drop_all()
        # Create all tables
        db.create_all()
        
        # Initialize categories and products
        init_categories()
        init_products()

if __name__ == '__main__':
    init_db()
