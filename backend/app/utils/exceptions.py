"""
Custom Exception Classes

This module defines custom exceptions used throughout the application
for better error handling and more meaningful error messages.
"""

class APIError(Exception):
    """Base exception class for API errors."""
    def __init__(self, message: str, status_code: int = 400):
        super().__init__(message)
        self.message = message
        self.status_code = status_code

class ResourceNotFoundError(APIError):
    """Raised when a requested resource is not found."""
    def __init__(self, message: str = "Resource not found"):
        super().__init__(message, status_code=404)

class ValidationError(APIError):
    """Raised when input validation fails."""
    def __init__(self, message: str = "Validation error"):
        super().__init__(message, status_code=400)

class AuthenticationError(APIError):
    """Raised when authentication fails."""
    def __init__(self, message: str = "Authentication failed"):
        super().__init__(message, status_code=401)

class AuthorizationError(APIError):
    """Raised when user doesn't have required permissions."""
    def __init__(self, message: str = "Not authorized"):
        super().__init__(message, status_code=403)

class DatabaseError(APIError):
    """Raised when a database operation fails."""
    def __init__(self, message: str = "Database error occurred"):
        super().__init__(message, status_code=500)

class ConfigurationError(APIError):
    """Raised when there's a configuration-related error."""
    def __init__(self, message: str = "Configuration error"):
        super().__init__(message, status_code=500)
