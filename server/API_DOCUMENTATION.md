# API Documentation - Subs-Manager

Complete API reference for the Subs-Manager backend service.

## Base URL
```
http://localhost:5000/api
```

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

Tokens expire after 1 hour and are received upon successful registration or login.

---

## User Endpoints

### 1. Register User

Register a new user account.

**Endpoint:** `POST /api/users/register`

**Auth Required:** No

**Rate Limit:** 5 requests per 15 minutes

**Request Body:**
```json
{
  "fullName": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Validation Rules:**
- All fields are required
- Email must be valid format
- Password must be at least 6 characters
- Username and email must be unique

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe"
  }
}
```

**Error Responses:**
```json
// 400 - Validation Error
{
  "error": "All fields are required"
}

// 400 - Invalid Email
{
  "error": "Invalid email format"
}

// 400 - Weak Password
{
  "error": "Password must be at least 6 characters long"
}

// 400 - User Exists
{
  "error": "User already exists"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

---

### 2. Login User

Authenticate and receive JWT token.

**Endpoint:** `POST /api/users/login`

**Auth Required:** No

**Rate Limit:** 5 requests per 15 minutes

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```
OR
```json
{
  "username": "johndoe",
  "password": "securepassword123"
}
```

**Success Response (200):**
```json
{
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
```json
// 400 - Missing Fields
{
  "error": "Username/email and password are required"
}

// 401 - Invalid Credentials
{
  "error": "Invalid credentials"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

---

### 3. Create Payment Gateway Session

Create Stripe checkout session for premium subscription.

**Endpoint:** `POST /api/users/payment-gateway`

**Auth Required:** Yes

**Request Body:** None required

**Success Response (200):**
```json
{
  "url": "https://checkout.stripe.com/c/pay/cs_test_...",
  "message": "Checkout session created successfully"
}
```

**Error Responses:**
```json
// 404 - User Not Found
{
  "error": "User not found"
}

// 500 - Stripe Error
{
  "error": "Server error"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/users/payment-gateway \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

### 4. Delete User

Delete user account and all associated subscriptions.

**Endpoint:** `DELETE /api/users/:id`

**Auth Required:** Yes (must be account owner)

**URL Parameters:**
- `id` - User's MongoDB ObjectId

**Success Response (200):**
```json
{
  "message": "User johndoe and all their 5 subscriptions have been deleted successfully"
}
```

**Error Responses:**
```json
// 400 - Invalid ID
{
  "error": "Invalid user ID"
}

// 404 - User Not Found
{
  "error": "User not found"
}

// 401 - Unauthorized
{
  "error": "Unauthorized request"
}
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:5000/api/users/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

## Subscription Endpoints

### 1. Get All Subscriptions

Get all subscriptions for authenticated user.

**Endpoint:** `GET /api/subscriptions`

**Auth Required:** Yes

**Success Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "userName": "johndoe",
    "userId": "507f191e810c19729de860ea",
    "plan": "Netflix Premium",
    "price": 15.99,
    "currency": "USD",
    "renewalDate": "2025-12-15T00:00:00.000Z",
    "createdAt": "2025-11-01T10:00:00.000Z",
    "updatedAt": "2025-11-01T10:00:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "userName": "johndoe",
    "userId": "507f191e810c19729de860ea",
    "plan": "Spotify Premium",
    "price": 9.99,
    "currency": "USD",
    "renewalDate": "2025-12-20T00:00:00.000Z",
    "createdAt": "2025-11-05T14:30:00.000Z",
    "updatedAt": "2025-11-05T14:30:00.000Z"
  }
]
```

**Empty Response (200):**
```json
[]
```

**cURL Example:**
```bash
curl -X GET http://localhost:5000/api/subscriptions \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

### 2. Create Subscription

Add a new subscription.

**Endpoint:** `POST /api/subscriptions`

**Auth Required:** Yes

**Request Body:**
```json
{
  "plan": "Netflix Premium",
  "price": 15.99,
  "renewalDate": "2025-12-15"
}
```

**Validation Rules:**
- All fields are required
- Price must be a positive number
- renewalDate must be a valid date format

**Success Response (201):**
```json
{
  "message": "Subscription added successfully",
  "subscription": {
    "_id": "507f1f77bcf86cd799439011",
    "userName": "johndoe",
    "userId": "507f191e810c19729de860ea",
    "plan": "Netflix Premium",
    "price": 15.99,
    "currency": "USD",
    "renewalDate": "2025-12-15T00:00:00.000Z",
    "createdAt": "2025-11-11T10:00:00.000Z",
    "updatedAt": "2025-11-11T10:00:00.000Z"
  }
}
```

**Error Responses:**
```json
// 400 - Missing Fields
{
  "error": "All fields are required"
}

// 400 - Invalid Price
{
  "error": "Price must be a positive number"
}

// 400 - Invalid Date
{
  "error": "Invalid renewal date format"
}

// 404 - User Not Found
{
  "error": "User not found"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/subscriptions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "plan": "Netflix Premium",
    "price": 15.99,
    "renewalDate": "2025-12-15"
  }'
```

---

### 3. Update Subscription

Update an existing subscription.

**Endpoint:** `PATCH /api/subscriptions/:id`

**Auth Required:** Yes (must own the subscription)

**URL Parameters:**
- `id` - Subscription's MongoDB ObjectId

**Request Body:** (all fields optional)
```json
{
  "plan": "Netflix Basic",
  "price": 9.99,
  "renewalDate": "2025-12-20"
}
```

**Success Response (200):**
```json
{
  "message": "Subscription updated successfully",
  "subscription": {
    "_id": "507f1f77bcf86cd799439011",
    "userName": "johndoe",
    "userId": "507f191e810c19729de860ea",
    "plan": "Netflix Basic",
    "price": 9.99,
    "currency": "USD",
    "renewalDate": "2025-12-20T00:00:00.000Z",
    "createdAt": "2025-11-01T10:00:00.000Z",
    "updatedAt": "2025-11-11T15:30:00.000Z"
  }
}
```

**Error Responses:**
```json
// 400 - Invalid ID
{
  "error": "Invalid subscription ID"
}

// 404 - Not Found
{
  "error": "Subscription not found"
}

// 401 - Unauthorized
{
  "error": "Unauthorized user"
}

// 400 - Invalid Price
{
  "error": "Price must be a positive number"
}
```

**cURL Example:**
```bash
curl -X PATCH http://localhost:5000/api/subscriptions/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "plan": "Netflix Basic",
    "price": 9.99
  }'
```

---

### 4. Delete Subscription

Delete a specific subscription.

**Endpoint:** `DELETE /api/subscriptions/:id`

**Auth Required:** Yes (must own the subscription)

**URL Parameters:**
- `id` - Subscription's MongoDB ObjectId

**Success Response (200):**
```json
{
  "message": "Subscription Netflix Premium successfully deleted"
}
```

**Error Responses:**
```json
// 400 - Invalid ID
{
  "error": "Invalid subscription ID"
}

// 404 - Not Found
{
  "error": "Subscription not found"
}

// 401 - Unauthorized
{
  "error": "Unauthorized request"
}
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:5000/api/subscriptions/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

### 5. Get Dashboard Summary

Get aggregated statistics for user's subscriptions.

**Endpoint:** `GET /api/subscriptions/summary`

**Auth Required:** Yes

**Success Response (200):**
```json
{
  "totalMonthlyCost": 45.97,
  "totalSubscription": 3,
  "planNames": [
    "Netflix Premium",
    "Spotify Premium",
    "Amazon Prime"
  ]
}
```

**Empty Response (200):**
```json
{
  "totalMonthlyCost": 0,
  "totalSubscription": 0,
  "planNames": []
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:5000/api/subscriptions/summary \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

## Health Check

### Server Health

Check if the server is running.

**Endpoint:** `GET /health`

**Auth Required:** No

**Success Response (200):**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

**cURL Example:**
```bash
curl http://localhost:5000/health
```

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created successfully |
| 400 | Bad request (validation error) |
| 401 | Unauthorized (invalid credentials or token) |
| 404 | Not found |
| 429 | Too many requests (rate limit exceeded) |
| 500 | Internal server error |

---

## Rate Limiting

### Authentication Endpoints
- `/api/users/register`
- `/api/users/login`

**Limit:** 5 requests per 15 minutes per IP

**Error Response (429):**
```json
{
  "error": "Too many authentication attempts, please try again after 15 minutes"
}
```

### General API Endpoints
All other `/api/*` endpoints

**Limit:** 100 requests per 15 minutes per IP

**Error Response (429):**
```json
{
  "error": "Too many requests, please try again later"
}
```

---

## Automated Email Reminders

The system automatically sends email reminders for subscriptions renewing in 3 days.

**Schedule:** Daily at 8:00 AM (server time)

**Email Content:**
- User's name
- Subscription plan name
- Renewal date
- Link to dashboard

**Email Service:** SendGrid

---

## Data Models

### User Model
```javascript
{
  fullName: String,        // Required
  username: String,        // Required, Unique
  password: String,        // Required, Hashed
  email: String,           // Required, Unique, Validated
  subscriptionStatus: Enum, // 'free' or 'premium', default: 'free'
  stripeCustomerId: String  // Optional, for Stripe integration
}
```

### Subscription Model
```javascript
{
  userName: String,        // Required
  userId: ObjectId,        // Required, references User
  plan: String,            // Required
  price: Number,           // Required
  currency: String,        // Required, default: 'USD'
  renewalDate: Date        // Required
}
```

---

## Common Use Cases

### 1. User Registration and First Subscription

```bash
# Step 1: Register
RESPONSE=$(curl -s -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepass123"
  }')

# Extract token
TOKEN=$(echo $RESPONSE | jq -r '.token')

# Step 2: Add subscription
curl -X POST http://localhost:5000/api/subscriptions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "plan": "Netflix Premium",
    "price": 15.99,
    "renewalDate": "2025-12-15"
  }'
```

### 2. View All Subscriptions and Dashboard

```bash
# Get all subscriptions
curl -X GET http://localhost:5000/api/subscriptions \
  -H "Authorization: Bearer $TOKEN"

# Get summary
curl -X GET http://localhost:5000/api/subscriptions/summary \
  -H "Authorization: Bearer $TOKEN"
```

### 3. Update and Delete Subscription

```bash
# Update subscription
curl -X PATCH http://localhost:5000/api/subscriptions/<subscription_id> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "price": 12.99
  }'

# Delete subscription
curl -X DELETE http://localhost:5000/api/subscriptions/<subscription_id> \
  -H "Authorization: Bearer $TOKEN"
```

---

## Notes

- All dates are stored in ISO 8601 format
- All prices are in USD by default (currency field can be modified)
- JWT tokens expire after 1 hour
- Users can only access and modify their own subscriptions
- Deleting a user cascades to delete all their subscriptions
- The reminder system runs automatically and requires SendGrid configuration
