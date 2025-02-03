from app import create_app
from app.models import db, User
from werkzeug.security import generate_password_hash

def create_admin_user():
    app = create_app()
    with app.app_context():
        # Check if admin exists
        admin = User.query.filter_by(email='admin@edhaus.com').first()
        if not admin:
            admin = User(
                email='admin@edhaus.com',
                password=generate_password_hash('Admin123!'),
                name='Admin',
                role='admin'
            )
            db.session.add(admin)
            db.session.commit()
            print("Admin user created successfully!")
        else:
            print("Admin user already exists!")

if __name__ == '__main__':
    create_admin_user()
