"""
Decorator Module

This module contains custom decorators used throughout the application
for authentication, authorization, and other cross-cutting concerns.
"""

from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt_identity
from ..models import User
from .exceptions import AuthorizationError

def admin_required(f):
    """
    Decorator to check if the current user is an admin.
    Must be used after jwt_required decorator.
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or user.role != 'admin':
            raise AuthorizationError("Admin access required")
            
        return f(*args, **kwargs)
    return decorated_function

def validate_json(*required_fields):
    """
    Decorator to validate that the request contains required JSON fields.
    """
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if not request.is_json:
                return jsonify({'error': 'Missing JSON in request'}), 400
                
            data = request.get_json()
            missing_fields = [field for field in required_fields if field not in data]
            
            if missing_fields:
                return jsonify({
                    'error': 'Missing required fields',
                    'fields': missing_fields
                }), 400
                
            return f(*args, **kwargs)
        return decorated_function
    return decorator
