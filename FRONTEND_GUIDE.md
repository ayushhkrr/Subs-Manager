# Frontend Documentation - SubsManager

This guide explains everything about the frontend React application. Perfect for beginners who want to understand how it all works!

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [File Structure](#file-structure)
4. [How React Works (Basics)](#how-react-works-basics)
5. [Understanding Each File](#understanding-each-file)
6. [How the App Flows](#how-the-app-flows)
7. [Key Concepts Explained](#key-concepts-explained)
8. [Running the Application](#running-the-application)
9. [Making Changes](#making-changes)

---

## Project Overview

This is a **React** application that helps users track their subscriptions. Users can:
- Sign up and log in
- View a dashboard of all subscriptions
- Add, edit, and delete subscriptions
- See total monthly costs
- Get automatic email reminders (handled by backend)

The frontend is built with **React 19** and styled with **Tailwind CSS** for a clean, modern look.

---

## Technologies Used

### React
- **What it is:** A JavaScript library for building user interfaces
- **Why we use it:** Makes it easy to create interactive web apps with reusable components
- **Version:** 19.2.0

### React Router
- **What it is:** Library for navigation between pages
- **Why we use it:** Allows us to have multiple pages without reloading the browser
- **Version:** 7.9.6

### Axios
- **What it is:** HTTP client for making API calls
- **Why we use it:** Simplifies communication with the backend server
- **Version:** 1.13.2

### Tailwind CSS
- **What it is:** Utility-first CSS framework
- **Why we use it:** Quick styling with pre-built classes (no custom CSS needed)
- **Version:** 4.1.17

### Vite
- **What it is:** Build tool and development server
- **Why we use it:** Super fast development experience and optimized builds
- **Version:** 7.2.2

---

## File Structure

```
client/
├── src/
│   ├── components/           # Reusable UI pieces
│   │   ├── Navbar.jsx       # Top navigation bar
│   │   ├── ProtectedRoute.jsx  # Protects pages that need login
│   │   └── AddSubscription.jsx # Modal for adding/editing subscriptions
│   │
│   ├── context/             # Global state management
│   │   └── AuthContext.jsx  # Manages user authentication state
│   │
│   ├── pages/               # Full page components
│   │   ├── Landing.jsx      # Homepage (what visitors see first)
│   │   ├── Register.jsx     # Sign up page
│   │   ├── Login.jsx        # Sign in page
│   │   └── Dashboard.jsx    # Main app (list of subscriptions)
│   │
│   ├── services/            # API communication
│   │   └── api.js           # All backend API calls
│   │
│   ├── App.jsx              # Main app component (routes)
│   ├── main.jsx             # Entry point (renders App)
│   └── index.css            # Global styles (Tailwind)
│
├── package.json             # Project dependencies
└── vite.config.js           # Vite configuration
```

---

## How React Works (Basics)

### Components
Think of components as **building blocks**. Each component is a piece of your UI.

Example:
```jsx
const Greeting = () => {
  return <h1>Hello, World!</h1>;
}
```

This creates a simple component that displays "Hello, World!"

### JSX
JSX looks like HTML but it's actually JavaScript. React converts it to HTML.

```jsx
<div className="text-blue-600">This is JSX</div>
```

**Note:** Use `className` instead of `class` in React!

### State
State is data that can change. When state changes, React re-renders the component.

```jsx
const [count, setCount] = useState(0);
// count = current value
// setCount = function to update it
```

### Props
Props are how you pass data from parent to child components.

```jsx
<Navbar user={currentUser} />
// Navbar receives user as a prop
```

---

## Understanding Each File

### 1. `main.jsx` - Entry Point

This is where React starts. It renders your entire app into the HTML page.

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**What it does:**
- Finds the `<div id="root">` in your HTML
- Renders the entire `<App />` component inside it

---

### 2. `App.jsx` - Main Router

This file sets up all the routes (pages) in your app.

**Key Parts:**

```jsx
<Router>              // Enables routing
  <AuthProvider>      // Provides user auth state to all components
    <Navbar />        // Shows on every page
    <Routes>          // Define all pages
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      // ... more routes
    </Routes>
  </AuthProvider>
</Router>
```

**Routes Explained:**
- `/` - Landing page (homepage)
- `/register` - Sign up page
- `/login` - Sign in page
- `/dashboard` - Main app (protected, needs login)

---

### 3. `context/AuthContext.jsx` - Authentication State

This manages whether a user is logged in or not.

**How it works:**

```jsx
const { user, login, logout } = useAuth();
```

- `user` - Current logged-in user (or null if not logged in)
- `login(token, userData)` - Call this when user logs in
- `logout()` - Call this when user logs out

**Where data is stored:**
- User data and token are saved in `localStorage` (browser storage)
- This means users stay logged in even after closing the browser

---

### 4. `services/api.js` - Backend Communication

All API calls to your backend server are defined here.

**Example:**

```jsx
// Register a new user
await userAPI.register({
  fullName: "John Doe",
  username: "johndoe",
  email: "john@example.com",
  password: "secret123"
});

// Get all subscriptions
const response = await subscriptionAPI.getAll();
console.log(response.data); // Array of subscriptions
```

**Available API Functions:**

**User APIs:**
- `userAPI.register(data)` - Create new account
- `userAPI.login(data)` - Sign in
- `userAPI.deleteAccount(id)` - Delete account
- `userAPI.createPayment()` - Start Stripe checkout

**Subscription APIs:**
- `subscriptionAPI.getAll()` - Get all user subscriptions
- `subscriptionAPI.create(data)` - Add new subscription
- `subscriptionAPI.update(id, data)` - Update subscription
- `subscriptionAPI.delete(id)` - Delete subscription
- `subscriptionAPI.getSummary()` - Get total cost and count

---

### 5. `pages/Landing.jsx` - Homepage

The first page visitors see. It has:
- Hero section with big headline
- Feature showcase (3 features)
- How it works (3 steps)
- Call-to-action buttons
- Footer

**Design:**
- Modern, minimal, clean
- White background with blue accents
- Uses Tailwind CSS classes for styling

**Key Elements:**

```jsx
<Link to="/register">     // Navigation link
  Start Free Today
</Link>
```

Links use React Router's `Link` component (not regular `<a>` tags) for fast navigation without page reload.

---

### 6. `pages/Register.jsx` - Sign Up Page

Allows new users to create an account.

**Form Fields:**
- Full Name
- Username
- Email
- Password

**How it works:**

1. User fills out form
2. Form data is stored in `formData` state
3. On submit, it calls `userAPI.register(formData)`
4. If successful, user is logged in and redirected to dashboard
5. If error, error message is shown

**Code Flow:**

```jsx
const [formData, setFormData] = useState({
  fullName: '',
  username: '',
  email: '',
  password: ''
});

const handleSubmit = async (e) => {
  e.preventDefault();                        // Prevent page reload
  const response = await userAPI.register(formData);  // Call API
  login(response.data.token, response.data.user);     // Log in
  navigate('/dashboard');                    // Go to dashboard
};
```

---

### 7. `pages/Login.jsx` - Sign In Page

Allows existing users to log in.

**Form Fields:**
- Username
- Password

**How it works:**
- Similar to Register page
- Calls `userAPI.login(formData)` instead
- Stores token and user data in AuthContext
- Redirects to dashboard on success

---

### 8. `pages/Dashboard.jsx` - Main App

The heart of the application. Shows all subscriptions.

**What it displays:**

1. **Summary Cards:**
   - Total monthly cost
   - Number of active subscriptions
   - Account type (free/premium)

2. **Subscriptions List:**
   - Each subscription card shows: name, price, renewal date
   - Edit and delete buttons for each

3. **Add Button:**
   - Opens modal to add new subscription

**Key React Hooks Used:**

```jsx
useEffect(() => {
  fetchSubscriptions();  // Runs when component loads
}, []);

const [subscriptions, setSubscriptions] = useState([]);  // State for subs list
```

**How Data Flows:**

1. Component loads
2. `useEffect` runs and calls `fetchSubscriptions()`
3. API call gets data from backend
4. Data is stored in `subscriptions` state
5. React re-renders and displays the subscriptions

---

### 9. `components/AddSubscription.jsx` - Add/Edit Modal

A popup modal for adding or editing subscriptions.

**Form Fields:**
- Subscription Name (Netflix, Spotify, etc.)
- Price
- Currency (USD, EUR, GBP, INR)
- Renewal Date

**How it works:**

**Adding:**
- Empty form
- Calls `subscriptionAPI.create(formData)`

**Editing:**
- Form is pre-filled with existing data
- Calls `subscriptionAPI.update(id, formData)`

**Modal Behavior:**
- Appears over the page (fixed position)
- Dark overlay behind it
- Closes when user clicks Cancel or X button

---

### 10. `components/Navbar.jsx` - Navigation Bar

Top navigation bar shown on every page.

**Logged Out:**
- Logo (links to home)
- Login button
- Get Started button

**Logged In:**
- Logo
- Dashboard link
- User name ("Hi, John")
- Logout button

**How it knows user state:**

```jsx
const { user, logout } = useAuth();

{user ? (
  <span>Hi, {user.fullName}</span>  // If logged in
) : (
  <Link to="/login">Login</Link>    // If logged out
)}
```

---

### 11. `components/ProtectedRoute.jsx` - Route Guard

Protects pages that require authentication.

**How it works:**

```jsx
{!user && <Navigate to="/login" />}  // Redirect if not logged in
```

If someone tries to access `/dashboard` without logging in, they're automatically sent to `/login`.

---

## How the App Flows

### First Time User Journey

1. **User visits homepage** → Sees Landing page
2. **Clicks "Get Started"** → Goes to Register page
3. **Fills out form and submits** → Account created, token saved
4. **Automatically logged in** → Redirected to Dashboard
5. **Dashboard loads** → Fetches subscriptions from API (empty for new users)
6. **Clicks "Add Subscription"** → Modal opens
7. **Fills form and saves** → API creates subscription, modal closes
8. **Dashboard refreshes** → New subscription appears

### Returning User Journey

1. **User visits homepage** → AuthContext checks localStorage for token
2. **Token found** → User is logged in, redirected to Dashboard
3. **Dashboard loads** → Fetches and displays existing subscriptions

---

## Key Concepts Explained

### 1. Authentication Flow

**Login:**
```
User enters credentials
  ↓
API call to backend
  ↓
Backend validates and returns JWT token
  ↓
Token + user data saved in localStorage
  ↓
User state updated in AuthContext
  ↓
User is logged in!
```

**Token Usage:**
- Every API call includes: `Authorization: Bearer <token>`
- Backend verifies token to ensure it's a valid user
- Token expires after 1 hour (set by backend)

### 2. State Management

**Local State (useState):**
- Data that only one component needs
- Example: Form inputs

**Global State (Context):**
- Data that multiple components need
- Example: Current user info

**Server State:**
- Data from backend API
- Example: List of subscriptions
- Fetched with useEffect

### 3. React Hooks Used

**useState:**
```jsx
const [count, setCount] = useState(0);
// Manages component state
```

**useEffect:**
```jsx
useEffect(() => {
  fetchData();  // Runs when component loads
}, []);
```

**useNavigate:**
```jsx
const navigate = useNavigate();
navigate('/dashboard');  // Programmatic navigation
```

**useAuth (custom hook):**
```jsx
const { user, login, logout } = useAuth();
// Access auth context
```

### 4. Tailwind CSS Classes

Tailwind uses utility classes for styling. Here are common ones:

**Layout:**
- `flex` - Flexbox container
- `grid` - Grid container
- `space-x-4` - Horizontal spacing between children

**Sizing:**
- `w-full` - Width 100%
- `h-16` - Height 4rem
- `max-w-7xl` - Max width constraint

**Colors:**
- `bg-blue-600` - Blue background
- `text-white` - White text
- `border-gray-200` - Gray border

**Spacing:**
- `p-4` - Padding 1rem
- `m-4` - Margin 1rem
- `px-4` - Horizontal padding

**Typography:**
- `text-lg` - Large text
- `font-bold` - Bold font
- `text-center` - Center align

**Responsive:**
- `md:text-xl` - On medium screens and up, use extra large text

---

## Running the Application

### Prerequisites

Make sure you have Node.js installed (v18 or higher).

### Installation

```bash
cd client
npm install
```

### Development Mode

```bash
npm run dev
```

This starts the development server at `http://localhost:5173`

**Features:**
- Hot reload (changes appear instantly)
- Error overlay
- Fast refresh

### Production Build

```bash
npm run build
```

Creates optimized production files in `client/dist/`

---

## Making Changes

### Adding a New Page

1. **Create page file:**
   ```bash
   client/src/pages/NewPage.jsx
   ```

2. **Write component:**
   ```jsx
   const NewPage = () => {
     return <div>Hello from new page!</div>;
   };
   export default NewPage;
   ```

3. **Add route in App.jsx:**
   ```jsx
   import NewPage from './pages/NewPage';

   <Route path="/newpage" element={<NewPage />} />
   ```

### Adding a New Component

1. **Create component file:**
   ```bash
   client/src/components/MyComponent.jsx
   ```

2. **Write component:**
   ```jsx
   const MyComponent = ({ title }) => {
     return <h1>{title}</h1>;
   };
   export default MyComponent;
   ```

3. **Use it in a page:**
   ```jsx
   import MyComponent from '../components/MyComponent';

   <MyComponent title="Hello!" />
   ```

### Styling with Tailwind

Just add classes to your JSX:

```jsx
<div className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700">
  Styled button
</div>
```

**Common patterns:**

**Button:**
```jsx
className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
```

**Card:**
```jsx
className="bg-white rounded-lg shadow-sm p-6"
```

**Input:**
```jsx
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
```

### Adding a New API Endpoint

1. **Add to api.js:**
   ```jsx
   export const subscriptionAPI = {
     // ... existing methods
     myNewMethod: (data) => api.post('/subscriptions/new-endpoint', data),
   };
   ```

2. **Use in component:**
   ```jsx
   import { subscriptionAPI } from '../services/api';

   const response = await subscriptionAPI.myNewMethod(data);
   ```

---

## Common Issues & Solutions

### Issue: "Cannot find module"
**Solution:** Make sure you've run `npm install`

### Issue: API calls fail with CORS error
**Solution:** Make sure backend is running on `http://localhost:5000`

### Issue: Changes not appearing
**Solution:** Hard refresh browser (Ctrl+Shift+R) or restart dev server

### Issue: Blank page in browser
**Solution:** Check browser console for errors (F12)

### Issue: "User not authenticated"
**Solution:** Check if token is in localStorage (F12 → Application → Local Storage)

---

## Tips for Learning React

1. **Start small:** Understand one component at a time
2. **Read the console:** Errors are very helpful in React
3. **Use React DevTools:** Browser extension for debugging
4. **Experiment:** Change things and see what happens
5. **Console.log everything:** `console.log(data)` is your friend

---

## Next Steps

### To Enhance This App:

1. **Add loading spinners** - Better UX during API calls
2. **Add success notifications** - Toast messages for actions
3. **Dark mode** - Toggle between light/dark themes
4. **Search/filter** - Search through subscriptions
5. **Charts** - Visualize spending with charts
6. **Export data** - Download subscriptions as CSV
7. **Profile page** - Edit user details
8. **Settings page** - Manage account settings

---

## Resources for Learning

- **React Docs:** https://react.dev
- **React Router Docs:** https://reactrouter.com
- **Tailwind CSS Docs:** https://tailwindcss.com
- **MDN Web Docs:** https://developer.mozilla.org

---

## Summary

Your frontend has:
- ✅ 4 pages (Landing, Register, Login, Dashboard)
- ✅ 3 reusable components (Navbar, ProtectedRoute, AddSubscription)
- ✅ Authentication system with JWT tokens
- ✅ Full CRUD operations for subscriptions
- ✅ Modern, responsive design
- ✅ Clean code structure

**What you've built is a complete, production-ready frontend application!**

---

**Author:** Ayush Kumar
**Project:** SubsManager
**Last Updated:** 2025

Happy coding! 🚀
