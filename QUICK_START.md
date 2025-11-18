# Quick Start Guide - SubsManager

Get your full-stack subscription manager up and running in 5 minutes!

---

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or MongoDB Atlas)
- SendGrid API key (for email reminders)
- Stripe API key (for payments)

---

## Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/ayushhkrr/Subs-Manager.git
cd Subs-Manager

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

---

## Step 2: Configure Backend

Create `.env` file in `server/` directory:

```env
# Database
MONGO_URI=mongodb://localhost:27017/subs-manager

# Server
PORT=5000

# JWT Secret (change this!)
SECRET_KEY=your_super_secret_jwt_key_here

# Stripe (use test keys)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PRICE_ID=price_your_stripe_price_id
SUCCESS_URL=http://localhost:5173/success
CANCEL_URL=http://localhost:5173/cancel

# SendGrid
SENDGRID_API_KEY=SG.your_sendgrid_api_key
FROM_EMAIL=your_verified_sender@example.com

# Client URL
CLIENT_URL=http://localhost:5173
```

---

## Step 3: Start Backend

```bash
cd server
npm run dev
```

You should see:
```
Server is running on http://localhost:5000
MongoDB connected successfully
```

---

## Step 4: Start Frontend

Open a new terminal:

```bash
cd client
npm run dev
```

You should see:
```
VITE v7.2.2  ready in XXX ms

➜  Local:   http://localhost:5173/
```

---

## Step 5: Open in Browser

Navigate to: `http://localhost:5173`

You should see the landing page!

---

## Testing the Application

### Create Your First User

1. Click "Get Started" or "Sign Up"
2. Fill in the registration form:
   - Full Name: John Doe
   - Username: johndoe
   - Email: john@example.com
   - Password: password123
3. Click "Create Account"
4. You'll be redirected to the dashboard

### Add Your First Subscription

1. Click "Add Subscription" button
2. Fill in the form:
   - Subscription Name: Netflix
   - Price: 15.99
   - Currency: USD
   - Renewal Date: (select a future date)
3. Click "Add"
4. Your subscription appears in the dashboard!

---

## Project Structure

```
Subs-Manager/
│
├── server/                    # Backend (Node.js + Express)
│   ├── app.js                # Main server file
│   ├── routes/               # API routes
│   ├── controllers/          # Business logic
│   ├── model/                # Database schemas
│   ├── middleware/           # Auth middleware
│   ├── jobs/                 # Cron jobs (email reminders)
│   └── emailTemplate/        # Email templates
│
├── client/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/            # Landing, Login, Register, Dashboard
│   │   ├── components/       # Navbar, Modal, ProtectedRoute
│   │   ├── context/          # Auth state management
│   │   ├── services/         # API calls
│   │   └── App.jsx           # Main app with routing
│   └── package.json
│
├── FRONTEND_GUIDE.md          # Complete React tutorial
├── FRONTEND_IMPLEMENTATION_SUMMARY.md  # What was built
└── README.md                  # Main documentation
```

---

## Available Pages

| Page | URL | Purpose |
|------|-----|---------|
| Landing | `/` | Homepage with features |
| Register | `/register` | Sign up form |
| Login | `/login` | Sign in form |
| Dashboard | `/dashboard` | Main app (protected) |

---

## API Endpoints

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Create new account |
| POST | `/api/users/login` | Sign in |
| DELETE | `/api/users/:id` | Delete account |
| POST | `/api/users/payment-gateway` | Stripe checkout |

### Subscription Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/subscriptions` | Get all subscriptions |
| POST | `/api/subscriptions` | Add subscription |
| PATCH | `/api/subscriptions/:id` | Update subscription |
| DELETE | `/api/subscriptions/:id` | Delete subscription |
| GET | `/api/subscriptions/summary` | Get summary stats |

---

## Troubleshooting

### Backend won't start

**Error:** `Cannot find module`
- Solution: Run `npm install` in `server/` directory

**Error:** `MongoDB connection failed`
- Solution: Make sure MongoDB is running (`mongod`)
- Or check your `MONGO_URI` in `.env`

**Error:** `Port 5000 already in use`
- Solution: Change `PORT` in `.env` to another port
- Update API_URL in `client/src/services/api.js`

### Frontend won't start

**Error:** `Cannot find module`
- Solution: Run `npm install` in `client/` directory

**Error:** React errors in console
- Solution: Check browser console (F12) for specific errors
- Make sure backend is running first

### API calls failing

**Error:** `Network Error` or CORS issues
- Solution: Make sure backend is running on port 5000
- Check that `CLIENT_URL` in backend `.env` matches your frontend URL

**Error:** `401 Unauthorized`
- Solution: Your token expired, log out and log in again
- Check if token is in localStorage (F12 → Application → Local Storage)

### Email reminders not working

**Error:** Emails not sending
- Solution: Check your SendGrid API key
- Verify `FROM_EMAIL` is verified in SendGrid
- Check backend logs for errors

---

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- **Frontend:** Changes appear instantly in browser
- **Backend:** Server restarts automatically on file changes

### Browser DevTools

Press F12 to open developer tools:
- **Console:** See errors and logs
- **Network:** View API calls
- **Application:** Check localStorage (tokens, user data)
- **React DevTools:** Install the browser extension for React debugging

### Useful Commands

```bash
# Backend
cd server
npm run dev          # Start development server
npm start            # Start production server

# Frontend
cd client
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code quality
```

---

## Environment Variables Explained

### Backend `.env`

| Variable | Purpose | Example |
|----------|---------|---------|
| `MONGO_URI` | Database connection | `mongodb://localhost:27017/subs-manager` |
| `PORT` | Server port | `5000` |
| `SECRET_KEY` | JWT encryption | Random string |
| `STRIPE_SECRET_KEY` | Payment processing | `sk_test_...` |
| `SENDGRID_API_KEY` | Email service | `SG....` |
| `CLIENT_URL` | Frontend URL | `http://localhost:5173` |

### Frontend (if needed)

If you deploy and need to change the API URL:

Edit `client/src/services/api.js`:
```js
const API_URL = 'https://your-backend-url.com/api';
```

---

## Next Steps

### Learn More

1. **Understand React:** Read [FRONTEND_GUIDE.md](./FRONTEND_GUIDE.md)
2. **See what was built:** Read [FRONTEND_IMPLEMENTATION_SUMMARY.md](./FRONTEND_IMPLEMENTATION_SUMMARY.md)
3. **Backend API:** Read [server/API_DOCUMENTATION.md](./server/API_DOCUMENTATION.md)

### Customize

- Change colors in Tailwind CSS classes
- Add more features (search, filters, charts)
- Modify email templates
- Add more subscription fields

### Deploy

**Backend:**
- Deploy to Heroku, Railway, or Render
- Use MongoDB Atlas for database
- Set environment variables on platform

**Frontend:**
- Deploy to Vercel, Netlify, or GitHub Pages
- Update API_URL to point to deployed backend
- Run `npm run build` first

---

## Features Overview

### ✅ User Authentication
- Registration with email
- Login with JWT tokens
- Persistent sessions
- Protected routes

### ✅ Subscription Management
- Add unlimited subscriptions
- Edit subscription details
- Delete subscriptions
- View total monthly costs

### ✅ Automated Reminders
- Email sent 3 days before renewal
- Runs daily at 8:00 AM
- Professional HTML templates

### ✅ Security
- Password hashing (bcrypt)
- JWT token authentication
- Rate limiting
- Input validation
- CORS protection

### ✅ Modern UI
- Responsive design
- Clean, minimal interface
- Smooth navigation
- Loading states
- Error handling

---

## Tech Stack Summary

**Frontend:**
- React 19 - UI library
- React Router 7 - Navigation
- Tailwind CSS 4 - Styling
- Axios - API calls
- Vite - Build tool

**Backend:**
- Node.js - Runtime
- Express 5 - Web framework
- MongoDB - Database
- Mongoose - ODM
- JWT - Authentication
- Stripe - Payments
- SendGrid - Emails
- node-cron - Scheduled jobs

---

## Getting Help

1. **Check documentation:**
   - [FRONTEND_GUIDE.md](./FRONTEND_GUIDE.md) - Complete React tutorial
   - [README.md](./README.md) - Main documentation
   - [server/API_DOCUMENTATION.md](./server/API_DOCUMENTATION.md) - API docs

2. **Common issues:**
   - See "Troubleshooting" section above
   - Check browser console for errors
   - Check backend terminal for errors

3. **Need support:**
   - Open an issue on GitHub
   - Check existing issues first

---

## Congratulations! 🎉

You now have a fully functional subscription management application running locally!

**What you can do now:**
- Test all features
- Understand the code
- Customize the design
- Add new features
- Deploy to production

Happy coding!

---

**Author:** Ayush Kumar
**GitHub:** [@ayushhkrr](https://github.com/ayushhkrr)
**Repository:** [Subs-Manager](https://github.com/ayushhkrr/Subs-Manager)
