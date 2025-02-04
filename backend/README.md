# EdHaus E-commerce Backend

A robust Flask-based backend for the EdHaus e-commerce platform, featuring product management, category organization, and user authentication.

## Project Structure

```
backend/
├── app/
│   ├── models/          # Database models
│   ├── routes/          # API endpoints
│   ├── services/        # Business logic
│   ├── utils/           # Helper functions
│   ├── __init__.py     # App initialization
│   ├── auth.py         # Authentication logic
│   └── config.py       # Configuration settings
├── .env                # Environment variables (create from .env.example)
├── .env.example        # Example environment variables
├── README.md          # Project documentation
├── requirements.txt   # Python dependencies
├── run.py            # Application entry point
├── seed_data.py      # Database seeding script
└── setup_db.py       # Database setup utility
```

## Setup Instructions

1. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and other settings
   ```

4. Set up the database:
   ```bash
   python setup_db.py
   ```

5. Initialize the database with sample data:
   ```bash
   python seed_data.py
   ```

6. Run the application:
   ```bash
   flask run
   ```

## API Documentation

The API endpoints are documented in the included Postman collection (`postman_collection.json`). Import this file into Postman to explore and test the available endpoints.

### Main Endpoints

- Authentication
  - POST `/api/auth/register`: Register a new user
  - POST `/api/auth/login`: Login and receive JWT token

- Products
  - GET `/api/products`: List all products
  - GET `/api/products/<id>`: Get product details
  - POST `/api/products`: Create a new product (admin only)
  - PUT `/api/products/<id>`: Update a product (admin only)
  - DELETE `/api/products/<id>`: Delete a product (admin only)

- Categories
  - GET `/api/categories`: List all categories
  - GET `/api/categories/<id>`: Get category details
  - POST `/api/categories`: Create a new category (admin only)
  - PUT `/api/categories/<id>`: Update a category (admin only)
  - DELETE `/api/categories/<id>`: Delete a category (admin only)

## Environment Variables

Required environment variables in `.env`:

- `DATABASE_URL`: PostgreSQL database URL
- `SECRET_KEY`: Flask secret key
- `JWT_SECRET_KEY`: JWT token secret key
- `FLASK_APP`: Set to "run.py"
- `FLASK_ENV`: "development" or "production"

## Database Models

- `User`: User authentication and profile
- `Category`: Product categories with hierarchical structure
- `Product`: Product information and inventory

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
