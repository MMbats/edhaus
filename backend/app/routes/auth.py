"""
Authentication Routes Module

This module handles all authentication-related routes.
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_cors import cross_origin
from .. import db
from ..models.user import User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
@cross_origin()
def register():
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
        
    required_fields = ['email', 'password', 'name']
    missing_fields = [field for field in required_fields if not data.get(field)]
    if missing_fields:
        return jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400
        
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400
        
    new_user = User(
        email=data['email'],
        name=data['name'],
        phone=data.get('phone'),  
        address=data.get('address'),  
        role='user'
    )
    new_user.set_password(data['password'])
    
    db.session.add(new_user)
    db.session.commit()
    
    access_token = create_access_token(identity=new_user.id)
    
    return jsonify({
        'message': 'Registration successful',
        'access_token': access_token,
        'user': new_user.to_dict()
    }), 201

@auth_bp.route('/login', methods=['POST'])
@cross_origin()
def login():
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
        
    if not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email and password are required'}), 400
        
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not user.check_password(data['password']):
        return jsonify({'error': 'Invalid email or password'}), 401
            
    if not user.is_active:
        return jsonify({'error': 'Account is inactive'}), 401
        
    access_token = create_access_token(identity=user.id)
    
    return jsonify({
        'message': 'Login successful',
        'access_token': access_token,
        'user': user.to_dict()
    }), 200

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
@cross_origin()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
            
    return jsonify(user.to_dict()), 200

@auth_bp.route('/profile', methods=['PUT'])
@jwt_required()
@cross_origin()
def update_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
            
    data = request.get_json()
        
    if 'name' in data:
        user.name = data['name']
    if 'phone' in data:
        user.phone = data.get('phone')  
    if 'address' in data:
        user.address = data.get('address')  
    if 'password' in data:
        user.set_password(data['password'])
            
    db.session.commit()
        
    return jsonify({
        'message': 'Profile updated successfully',
        'user': user.to_dict()
    }), 200
