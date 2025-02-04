from app import create_app, db
from app.models import User
from sqlalchemy import text

def setup_database():
    app = create_app()
    with app.app_context():
        # Drop all tables
        try:
            db.session.execute(text('DROP TABLE IF EXISTS alembic_version CASCADE'))
            db.session.execute(text('DROP TABLE IF EXISTS cart_items CASCADE'))
            db.session.execute(text('DROP TABLE IF EXISTS order_items CASCADE'))
            db.session.execute(text('DROP TABLE IF EXISTS orders CASCADE'))
            db.session.execute(text('DROP TABLE IF EXISTS products CASCADE'))
            db.session.execute(text('DROP TABLE IF EXISTS categories CASCADE'))
            db.session.execute(text('DROP TABLE IF EXISTS users CASCADE'))
            db.session.commit()
        except Exception as e:
            print(f"Error dropping tables: {e}")
            db.session.rollback()

        # Create all tables
        db.create_all()
        
        # Create admin user
        admin = User(
            email='admin@edhaus.com',
            name='Admin User',
            role='admin',
            phone='1234567890',
            address='Admin Address'
        )
        admin.set_password('Admin123!')
        db.session.add(admin)
        db.session.commit()
        print("Database initialized and admin user created!")

if __name__ == '__main__':
    setup_database()
