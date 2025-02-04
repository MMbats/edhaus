import os
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

class Config:
    # Basic Flask configuration
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-here')
    
    # Supabase configuration
    SUPABASE_URL = os.getenv('SUPABASE_URL')
    SUPABASE_KEY = os.getenv('SUPABASE_KEY')
    
    # Database configuration
    if os.getenv('DATABASE_URL'):
        db_url = os.getenv('DATABASE_URL')
        # Handle both postgres:// and postgresql:// schemes
        if db_url.startswith('postgres://'):
            db_url = db_url.replace('postgres://', 'postgresql://', 1)
        SQLALCHEMY_DATABASE_URI = db_url
    else:
        # Use SQLite for development if no DATABASE_URL is provided
        base_dir = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
        SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(base_dir, 'app.db')
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Enable SQLAlchemy echo for debugging in development
    SQLALCHEMY_ECHO = os.getenv('FLASK_ENV') == 'development'
    
    # JWT configuration
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key-here')
    JWT_ACCESS_TOKEN_EXPIRES = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES', '3600'))  # 1 hour default
    
    # File upload configuration
    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    
    # CORS configuration
    CORS_HEADERS = 'Content-Type'
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', '*')
    
    @classmethod
    def init_app(cls, app):
        # Set up logging
        if not app.debug and not app.testing:
            handler = logging.StreamHandler()
            handler.setLevel(logging.INFO)
            app.logger.addHandler(handler)
            
        # Ensure upload directory exists
        os.makedirs(cls.UPLOAD_FOLDER, exist_ok=True)