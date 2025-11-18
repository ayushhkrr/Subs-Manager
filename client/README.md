# SubsManager Frontend

Modern, minimal React application for managing subscriptions.

## Quick Start

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## Important Configuration

Make sure your backend is running at `http://localhost:5000`

If you need to change the API URL, edit `client/src/services/api.js`:

```js
const API_URL = 'http://localhost:5000/api';
```

## Features

- User registration and authentication
- Dashboard with subscription management
- Add, edit, and delete subscriptions
- View total monthly costs
- Responsive design (mobile-friendly)

## Tech Stack

- React 19
- React Router 7
- Tailwind CSS 4
- Axios
- Vite

## Project Structure

```
src/
├── components/       # Reusable components
├── context/         # Global state (Auth)
├── pages/           # Page components
├── services/        # API calls
├── App.jsx          # Main app with routing
└── main.jsx         # Entry point
```

## Complete Documentation

See [FRONTEND_GUIDE.md](../FRONTEND_GUIDE.md) for comprehensive documentation explaining:
- How React works
- Detailed explanation of every file
- How to make changes
- Common issues and solutions

Perfect for React beginners!

## Pages

- `/` - Landing page
- `/register` - Sign up
- `/login` - Sign in
- `/dashboard` - Main app (protected)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
