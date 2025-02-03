# EdHaus E-commerce Platform

EdHaus is a modern e-commerce platform specializing in construction materials and home improvement products. Built with React for the frontend and Flask for the backend.

## Project Structure

```
project/
├── backend/           # Flask backend
│   ├── app/          # Application code
│   ├── migrations/   # Database migrations
│   └── requirements.txt
│
└── frontend/         # React frontend
    └── edhaus/      # React application
        ├── src/     # Source code
        └── package.json
```

## Technologies Used

- **Frontend**:
  - React
  - Vite
  - Axios for API calls
  - TailwindCSS for styling

- **Backend**:
  - Flask
  - SQLAlchemy
  - PostgreSQL
  - Flask-JWT-Extended for authentication
  - Flask-Migrate for database migrations

## Getting Started

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
flask run
```

### Frontend Setup
```bash
cd frontend/edhaus
npm install
npm run dev
```

## Features

- Product browsing and searching
- Category-based filtering
- User authentication
- Shopping cart functionality
- Admin dashboard for product management
- Responsive design for mobile and desktop

## API Endpoints

- `/api/products` - Product management
- `/api/categories` - Category management
- `/api/auth` - Authentication endpoints
- `/api/cart` - Shopping cart operations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
