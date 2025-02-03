from werkzeug.security import generate_password_hash
import json
import os

def init_admin():
    users_file = os.path.join(os.path.dirname(__file__), 'app', 'users.json')
    os.makedirs(os.path.dirname(users_file), exist_ok=True)
    
    admin_user = {
        'id': 1,
        'email': 'admin@edhaus.com',
        'password': generate_password_hash('Admin123!'),
        'name': 'Admin',
        'role': 'admin'
    }
    
    users = [admin_user]
    
    with open(users_file, 'w') as f:
        json.dump(users, f, indent=2)
        print(f"Created users.json at {users_file}")
        print("Admin user created with:")
        print("Email: admin@edhaus.com")
        print("Password: Admin123!")

if __name__ == '__main__':
    init_admin()
