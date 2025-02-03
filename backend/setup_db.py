from app import create_app
from app.models import db, User
from werkzeug.security import generate_password_hash

def setup_database():
    app = create_app()
    with app.app_context():
        # Drop all tables
        db.drop_all()
        # Create all tables
        db.create_all()
        
        # Create admin user
        admin = User(
            email='admin@edhaus.com',
            password=generate_password_hash('Admin123!'),
            name='Admin',
            role='admin'
        )
        db.session.add(admin)
        db.session.commit()
        print("Database initialized and admin user created!")

if __name__ == '__main__':
    setup_database()
