import os
from dotenv import load_dotenv
import json
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from sqlalchemy.exc import OperationalError

load_dotenv()

def test_database_connection():
    try:
        # Create a test Flask app
        app = Flask(__name__)
        
        # Get database URL and convert if needed
        db_url = os.getenv('DATABASE_URL')
        if db_url.startswith('postgres://'):
            db_url = db_url.replace('postgres://', 'postgresql://', 1)
        
        app.config['SQLALCHEMY_DATABASE_URI'] = db_url
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        
        # Initialize database
        db = SQLAlchemy(app)
        
        # Test the connection by executing a simple query
        with app.app_context():
            try:
                result = db.session.execute(text('SELECT 1')).fetchone()
                print("✅ Database connection successful!")
                
                # Test customers table
                try:
                    result = db.session.execute(text('SELECT COUNT(*) FROM customers')).fetchone()
                    print(f"Number of customers: {result[0]}")
                except Exception as e:
                    print("⚠️ Customers table not found. This is normal if you haven't run migrations yet.")
                    print("Run these commands to set up your database:")
                    print("1. flask db init")
                    print("2. flask db migrate")
                    print("3. flask db upgrade")
                
                return True
            except OperationalError as e:
                print(f"❌ Database connection failed: {str(e)}")
                print("\nPossible solutions:")
                print("1. Check if your DATABASE_URL is correct in .env")
                print("2. Make sure you're connected to the internet")
                print("3. Verify that your IP is allowed in Supabase database settings")
                print("\nTo fix IP access:")
                print("1. Go to Supabase Dashboard")
                print("2. Select your project")
                print("3. Go to Database -> Database Settings")
                print("4. Add your IP to 'Connection Pooling'")
                return False
                
    except Exception as e:
        print(f"❌ Configuration error: {str(e)}")
        print("\nPlease check:")
        print("1. Your DATABASE_URL environment variable is set correctly")
        print("2. You have all required packages installed (pip install -r requirements.txt)")
        return False

def test_auth_system():
    try:
        # Check if users.json exists and is readable
        users_file = os.path.join(os.path.dirname(__file__), 'users.json')
        if os.path.exists(users_file):
            with open(users_file, 'r') as f:
                users = json.load(f)
                print("✅ Auth system check successful!")
                print(f"Number of registered users: {len(users)}")
                return True
        else:
            print("⚠️ users.json not found, but this is okay for a fresh installation")
            return True
    except Exception as e:
        print(f"❌ Auth system check failed: {str(e)}")
        return False

if __name__ == "__main__":
    print("\nTesting EdHaus backend systems...")
    print("-" * 50)
    
    db_ok = test_database_connection()
    print("-" * 50)
    auth_ok = test_auth_system()
    
    if db_ok and auth_ok:
        print("\n✨ All systems are ready!")
        print("\nYou can now:")
        print("1. Start the Flask server with 'python run.py'")
        print("2. Register new users at /api/auth/register")
        print("3. Login at /api/auth/login")
        print("4. Access protected routes using the JWT token")
    else:
        print("\n⚠️ Some checks failed. Please review the errors above.")