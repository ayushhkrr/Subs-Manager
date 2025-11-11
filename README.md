# 🚀 Subs-Manager

A robust RESTful API backend service for managing user subscriptions with automated renewal reminders and payment processing.

![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![Express](https://img.shields.io/badge/Express-v5.1.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-v8.18-brightgreen)
![License](https://img.shields.io/badge/license-ISC-blue)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Security Features](#security-features)
- [Contributing](#contributing)

## 🎯 Overview

**Subs-Manager** is a production-ready backend API that helps users track and manage their recurring subscriptions (Netflix, Spotify, etc.). It features secure JWT authentication, automated email reminders 3 days before renewal dates, Stripe payment integration for premium features, and comprehensive subscription management.

**Live Demo:** [Add your deployed URL here]

**Frontend Repository:** [Add frontend repo link if available]

## ✨ Features

### User Management
- ✅ User registration with email validation
- ✅ Secure login with JWT authentication
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ Account deletion with cascading subscription removal
- ✅ Premium/Free tier support

### Subscription Management
- ✅ Create, Read, Update, Delete (CRUD) operations
- ✅ User-specific subscription access control
- ✅ Dashboard analytics (total monthly cost, subscription count)
- ✅ Input validation for all fields
- ✅ Date validation for renewal tracking

### Automated Reminders
- ✅ Daily cron job at 8:00 AM
- ✅ Email reminders 3 days before renewal
- ✅ Professional HTML email templates
- ✅ SendGrid integration for reliable delivery

### Payment Processing
- ✅ Stripe checkout integration
- ✅ Subscription-based payment flow
- ✅ Automatic customer creation
- ✅ Test mode support for development

### Security
- ✅ Helmet.js for security headers
- ✅ Rate limiting on authentication endpoints (5 req/15min)
- ✅ General API rate limiting (100 req/15min)
- ✅ CORS configuration
- ✅ Input validation and sanitization
- ✅ MongoDB ObjectId validation

## 🛠️ Tech Stack

### Backend Framework
- **Node.js** - JavaScript runtime
- **Express.js v5.1.0** - Web application framework
- **ES Modules** - Modern JavaScript module system

### Database
- **MongoDB** - NoSQL database
- **Mongoose v8.18.3** - ODM (Object Data Modeling)

### Authentication & Security
- **JSON Web Token (jsonwebtoken v9.0.2)** - Token-based auth
- **bcrypt v6.0.0** - Password hashing
- **Helmet v8.1.0** - Security headers
- **express-rate-limit v8.2.1** - Rate limiting

### Payment & Email Services
- **Stripe v19.1.0** - Payment processing
- **SendGrid v8.1.6** - Email delivery

### Task Scheduling
- **node-cron v4.2.1** - Scheduled jobs

## 📁 Project Structure

```
Subs-Manager/
├── backend/
│   ├── app.js                      # Main application entry point
│   ├── package.json                # Dependencies and scripts
│   ├── .env.example                # Environment variables template
│   ├── .gitignore                  # Git ignore rules
│   │
│   ├── routes/                     # API route definitions
│   │   ├── userRoutes.js          # User endpoints
│   │   └── subsRoutes.js          # Subscription endpoints
│   │
│   ├── controllers/               # Business logic
│   │   ├── userController.js      # User operations
│   │   └── subsController.js      # Subscription operations
│   │
│   ├── model/                     # Database schemas
│   │   └── allSchemas.js          # User & Subscription models
│   │
│   ├── middleware/                # Custom middleware
│   │   └── auth.js                # JWT authentication
│   │
│   ├── jobs/                      # Scheduled tasks
│   │   └── reminderJob.js         # Email reminder cron job
│   │
│   └── emailTemplate/             # Email templates
│       └── reminderTemplate.js    # HTML email for reminders
│
└── README.md                       # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- MongoDB (local or MongoDB Atlas)
- Stripe account (for payment features)
- SendGrid account (for email reminders)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ayushhkrr/Subs-Manager.git
   cd Subs-Manager/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your actual credentials (see [Environment Variables](#environment-variables))

4. **Start MongoDB**
   - Local MongoDB: `mongod`
   - Or use MongoDB Atlas connection string in `.env`

5. **Run the application**

   Development mode:
   ```bash
   npm run dev
   ```

   Production mode:
   ```bash
   npm start
   ```

6. **Verify server is running**
   ```bash
   curl http://localhost:5000/health
   ```
   Expected response: `{"status":"OK","message":"Server is running"}`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
Protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Endpoints

#### User Routes (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | User login | No |
| POST | `/payment-gateway` | Create Stripe checkout | Yes |
| DELETE | `/:id` | Delete user account | Yes |

#### Subscription Routes (`/api/subscriptions`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all user subscriptions | Yes |
| POST | `/` | Create new subscription | Yes |
| PATCH | `/:id` | Update subscription | Yes |
| DELETE | `/:id` | Delete subscription | Yes |
| GET | `/summary` | Get dashboard analytics | Yes |

For detailed API examples, see [API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md)

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Database
MONGO_URI=mongodb://localhost:27017/subs-manager

# Server
PORT=5000

# JWT
SECRET_KEY=your_jwt_secret_key_here

# Stripe (use test keys: sk_test_...)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PRICE_ID=price_your_stripe_price_id
SUCCESS_URL=http://localhost:3000/success
CANCEL_URL=http://localhost:3000/cancel

# SendGrid
SENDGRID_API_KEY=SG.your_sendgrid_api_key
FROM_EMAIL=your_verified_sender@example.com

# Client URL
CLIENT_URL=http://localhost:3000
```

### Getting API Keys

- **MongoDB Atlas**: [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- **Stripe Test Keys**: [https://dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
- **SendGrid API Key**: [https://app.sendgrid.com/settings/api_keys](https://app.sendgrid.com/settings/api_keys)

## 🔒 Security Features

- **Helmet.js**: Adds 15+ security headers (XSS protection, clickjacking prevention, etc.)
- **Rate Limiting**:
  - Authentication endpoints: 5 requests per 15 minutes
  - General API: 100 requests per 15 minutes
- **CORS**: Configured to allow only specified origins
- **Input Validation**: All user inputs validated and sanitized
- **Password Security**: Bcrypt hashing with 10 salt rounds
- **JWT Tokens**: 1-hour expiration for security
- **Authorization Checks**: Users can only access their own data

## 🧪 Testing

To test the API endpoints, you can use:
- Postman/Insomnia
- cURL commands
- Your frontend application

Example cURL request:
```bash
# Register a new user
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Ayush Kumar**
- GitHub: [@ayushhkrr](https://github.com/ayushhkrr)
- Repository: [Subs-Manager](https://github.com/ayushhkrr/Subs-Manager)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For support, email your-email@example.com or open an issue on GitHub.

---

**Note**: This is a backend-only project. A frontend application is required to fully utilize all features. The API is designed to be consumed by a React, Vue, or any other frontend framework.
