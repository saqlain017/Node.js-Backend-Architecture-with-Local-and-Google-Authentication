Backend Architecture with Local and Google Authentication
This repository provides a robust backend architecture designed for modern web applications. It features local authentication (email/password) and Google OAuth2 integration for user login and registration, making it a versatile base for building secure and scalable web services.

Key Features:

Authentication:
Local authentication with email and password.
Google OAuth2 authentication for seamless third-party login.
Secure password hashing and validation.

Session Management:
JWT-based session management for scalability.
CSRF token protection for enhanced security.
Logout functionality, including logout from all devices.

User Management:
User registration and login.
Role-based user management (Admin and User roles).
Flexible user data model supporting custom fields like address, balance, and account type.

Modular Architecture:
Clean separation of concerns for controllers, models, and utilities.
Scalable structure for future enhancements and third-party integrations.

Error Handling:
Consistent error responses for better API consumption.
Custom error messages for validation and server errors.

Security:
Enforced validation for email, password, and provider-specific fields.
Input sanitization and validation for enhanced security.

Tech Stack:
Node.js: Server runtime.
Express.js: Framework for building RESTful APIs.
MongoDB: Database for flexible and scalable storage.
Passport.js: Middleware for Google OAuth2 integration.
Mongoose: ODM for MongoDB.

Usage:
This project is designed for developers looking for a ready-to-use backend template to jumpstart their projects. It is highly customizable and adheres to best practices in security and scalability.

