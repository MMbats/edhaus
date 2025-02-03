from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta
import json
import os

auth = Blueprint('auth', __name__)

SECRET_KEY = 'your-secret-key'  # In production, use environment variable
USERS_FILE = os.path.join(os.path.dirname(__file__), 'users.json')

def load_users():
    if os.path.exists(USERS_FILE):
        with open(USERS_FILE, 'r') as f:
            return json.load(f)
    return []

def save_users(users):
    os.makedirs(os.path.dirname(USERS_FILE), exist_ok=True)
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=2)

# Initialize users.json with admin user
def init_users():
    users = load_users()
    if not any(user['email'] == 'admin@edhaus.com' for user in users):
        admin_user = {
            'id': 1,
            'email': 'admin@edhaus.com',
            'password': generate_password_hash('Admin123!'),
            'name': 'Admin',
            'role': 'admin'
        }
        users.append(admin_user)
        save_users(users)
        print("Admin user created!")
    return users

# Initialize users on module load
users = init_users()

@auth.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'message': 'Missing required fields'}), 400
        
        users = load_users()
        user = next((user for user in users if user['email'] == data['email']), None)
        
        if not user or not check_password_hash(user['password'], data['password']):
            return jsonify({'message': 'Invalid email or password'}), 401
        
        token = jwt.encode({
            'user_id': user['id'],
            'exp': datetime.utcnow() + timedelta(days=1)
        }, SECRET_KEY, algorithm='HS256')
        
        return jsonify({
            'token': token,
            'user': {
                'id': user['id'],
                'email': user['email'],
                'name': user.get('name', ''),
                'role': user.get('role', 'user')
            }
        })
    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({'message': 'Internal server error', 'error': str(e)}), 500

@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Missing required fields'}), 400
    
    users = load_users()
    if any(user['email'] == data['email'] for user in users):
        return jsonify({'message': 'Email already registered'}), 400
    
    new_user = {
        'id': len(users) + 1,
        'email': data['email'],
        'password': generate_password_hash(data['password']),
        'name': data.get('name', ''),
        'role': 'user'
    }
    
    users.append(new_user)
    save_users(users)
    
    token = jwt.encode({
        'user_id': new_user['id'],
        'exp': datetime.utcnow() + timedelta(days=1)
    }, SECRET_KEY)
    
    return jsonify({
        'message': 'User created successfully',
        'token': token,
        'user': {
            'id': new_user['id'],
            'email': new_user['email'],
            'name': new_user['name'],
            'role': new_user['role']
        }
    }), 201

@auth.route('/me', methods=['GET'])
def get_me():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'message': 'Token is missing'}), 401
    
    try:
        token = token.split(' ')[1]  # Remove 'Bearer ' prefix
        data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        users = load_users()
        user = next((user for user in users if user['id'] == data['user_id']), None)
        
        if not user:
            raise Exception('User not found')
            
        return jsonify({
            'id': user['id'],
            'email': user['email'],
            'name': user['name'],
            'role': user['role']
        })
    except:
        return jsonify({'message': 'Invalid token'}), 401