"""
EdHaus Backend Application Entry Point

This module serves as the entry point for the EdHaus e-commerce backend application.
It initializes the Flask application with all necessary configurations and middleware.
"""

import os
from app import create_app
from flask import jsonify
from werkzeug.middleware.proxy_fix import ProxyFix

# Create Flask application instance
app = create_app()

# Configure proxy settings for proper IP handling behind reverse proxy
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# Add security headers to all responses
@app.after_request
def add_security_headers(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    return response

# Error handlers
@app.errorhandler(404)
def not_found_error(error):
    return jsonify({
        'error': 'Not Found',
        'message': 'The requested resource was not found on the server.'
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'error': 'Internal Server Error',
        'message': 'An unexpected error occurred. Please try again later.'
    }), 500

@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({
        'error': 'Method Not Allowed',
        'message': 'The method is not allowed for the requested URL.'
    }), 405

@app.errorhandler(400)
def bad_request(error):
    return jsonify({
        'error': 'Bad Request',
        'message': str(error.description) if hasattr(error, 'description') else 'Invalid request parameters.'
    }), 400

if __name__ == '__main__':
    # Get port from environment variable or default to 5000
    port = int(os.environ.get('PORT', 5000))
    
    # Run the application
    app.run(
        host='0.0.0.0',
        port=port,
        debug=os.environ.get('FLASK_ENV') == 'development'
    )
