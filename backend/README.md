# Subscription Tracker API

A robust RESTful API built with Node.js, Express, and MongoDB to manage user accounts and their recurring subscriptions. This project features secure authentication using JWT, password hashing with bcrypt, and a full suite of protected CRUD operations.

## Features

- **Secure User Authentication**: Full register and login functionality using JSON Web Tokens (JWT).
- **Password Hashing**: User passwords are securely hashed using `bcrypt` before being stored.
- **Protected Routes**: Custom middleware ensures that sensitive endpoints can only be accessed by authenticated users.
- **Full CRUD for Subscriptions**: Complete Create, Read, Update, and Delete operations for managing user subscriptions.
- **Authorization**: Secure logic ensures that users can only view, update, or delete their own subscriptions.
- **Data Integrity**: Implemented a cascading delete, where deleting a user also removes all of their associated subscriptions from the database.

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Token (jsonwebtoken), bcrypt
- **Middleware**: Custom Auth Middleware
- **Environment Variables**: dotenv

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/try/download/community) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd your-repo-name
    ```
3.  **Install NPM packages:**
    ```bash
    npm install
    ```
4.  **Create an environment file:**
    Create a `.env` file in the root of the project and add the following variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    SECRET_KEY=your_super_secret_jwt_key
    PORT=5000
    ```

### Running the Server

- **For development (with automatic restarts):**
  ```bash
  npm run dev