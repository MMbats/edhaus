"""Seed data script for initializing the database with sample data."""

from app import create_app, db
from app.models import Category, Product

def seed_database():
    """Initialize database with sample data."""
    app = create_app()
    
    with app.app_context():
        # Create database tables
        db.create_all()
        
        # Create categories
        electronics = Category(
            name='Electronics',
            description='Electronic devices and gadgets',
            image_url='https://example.com/electronics.jpg',
            slug='electronics',
            is_active=True,
            display_order=1
        )
        
        clothing = Category(
            name='Clothing',
            description='Fashion and apparel',
            image_url='https://example.com/clothing.jpg',
            slug='clothing',
            is_active=True,
            display_order=2
        )
        
        # Save categories
        db.session.add(electronics)
        db.session.add(clothing)
        db.session.commit()
        
        # Create products
        products = [
            Product(
                name='iPhone 13',
                description='Latest iPhone model',
                price=999.99,
                stock=50,
                image_url='https://example.com/iphone.jpg',
                category_id=electronics.id,
                slug='iphone-13',
                is_active=True
            ),
            Product(
                name='Cotton T-Shirt',
                description='Comfortable cotton t-shirt',
                price=19.99,
                stock=100,
                image_url='https://example.com/tshirt.jpg',
                category_id=clothing.id,
                slug='cotton-tshirt',
                is_active=True
            )
        ]
        
        # Save products
        db.session.add_all(products)
        db.session.commit()
        
        print("Database seeded successfully!")

if __name__ == '__main__':
    seed_database()
