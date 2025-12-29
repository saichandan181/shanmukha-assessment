# User Management System - Frontend

Modern React frontend for user management with authentication and role-based UI.

## 🚀 Features

- ✅ Secure authentication flow
- ✅ Role-based UI (Admin/User)
- ✅ Protected routes
- ✅ Responsive design (mobile + desktop)
- ✅ Form validation
- ✅ Loading states & error handling
- ✅ Toast notifications
- ✅ Pagination
- ✅ Confirmation modals

## 🛠 Tech Stack

- **Framework**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Notifications**: React Toastify

## 📋 Prerequisites

- Node.js 16+ and npm
- Backend API running
- Git

## 🔧 Installation

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Update `.env`:
```env
VITE_API_URL=https://shanmukha-assessment-api.vercel.app/api (Production) or http://localhost:5000/api (Local)
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📱 Pages & Features

### Public Pages

#### Login Page (`/login`)
- Email and password authentication
- Form validation
- Error handling
- Link to signup page

#### Signup Page (`/signup`)
- User registration
- Email, password, full name fields
- Password confirmation
- Form validation

### Protected Pages

#### Dashboard (`/dashboard`)
- User profile overview
- Account statistics
- Quick actions
- Role-based content

#### Profile Page (`/profile`)
- Update profile information
- Change password
- Tab-based interface
- Form validation

#### Admin Dashboard (`/admin`) - Admin Only
- User management table
- Pagination (10 users per page)
- Activate/Deactivate users
- Confirmation modals
- Search and filtering

## 🎨 UI Components

### Layout Components
- **Navbar**: Navigation bar with user info and logout
- **ProtectedRoute**: Route guard for authenticated users
- **Loader**: Loading spinner component
- **Modal**: Reusable modal for confirmations
- **Pagination**: Pagination control for lists

### Design System
- **Primary Color**: Blue (#3B82F6)
- **Responsive**: Mobile-first design
- **Accessibility**: ARIA labels and keyboard navigation
- **Dark Mode**: Ready for implementation

## 📁 Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── ProtectedRoute.jsx   # Route protection
│   │   ├── Loader.jsx           # Loading spinner
│   │   ├── Modal.jsx            # Confirmation modal
│   │   └── Pagination.jsx       # Pagination component
│   ├── contexts/
│   │   └── AuthContext.jsx      # Auth state management
│   ├── pages/
│   │   ├── Login.jsx            # Login page
│   │   ├── Signup.jsx           # Signup page
│   │   ├── Dashboard.jsx        # User dashboard
│   │   ├── Profile.jsx          # Profile page
│   │   └── AdminDashboard.jsx   # Admin dashboard
│   ├── services/
│   │   ├── api.js               # Axios configuration
│   │   ├── authService.js       # Auth API calls
│   │   ├── userService.js       # User API calls
│   │   └── adminService.js      # Admin API calls
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # App entry point
│   └── index.css                # Global styles
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🔐 Authentication Flow

1. **Login/Signup**: User enters credentials
2. **Token Storage**: JWT stored in localStorage
3. **API Requests**: Token sent in Authorization header
4. **Auto Logout**: Redirect to login on 401 errors
5. **Protected Routes**: Check auth before rendering

## 🎯 User Roles

### User Role
- Access to dashboard
- View/edit own profile
- Change password

### Admin Role
- All user permissions
- Access to admin dashboard
- Manage all users
- Activate/deactivate users

## 🚀 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variable:
   - `VITE_API_URL`: Your backend API URL

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy `dist` folder to Netlify

3. Set environment variable:
   - `VITE_API_URL`: Your backend API URL

4. Add `_redirects` file in `public`:
```
/*    /index.html   200
```

## 🎨 Customization

### Change Theme Colors

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your color palette
      }
    }
  }
}
```

### Add New Routes

1. Create page component in `src/pages/`
2. Add route in `src/App.jsx`:
```javascript
<Route path="/new-page" element={<NewPage />} />
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🧪 Testing (Future Enhancement)

Recommended testing setup:
- **Unit Tests**: Vitest
- **Component Tests**: React Testing Library
- **E2E Tests**: Playwright

## 🔒 Security Features

- ✅ Protected routes
- ✅ Secure token storage
- ✅ Auto logout on token expiry
- ✅ HTTPS in production (recommended)
- ✅ Input sanitization
- ✅ XSS protection

## 🐛 Troubleshooting

### Common Issues

1. **Cannot connect to API**
   - Check `VITE_API_URL` in `.env`
   - Verify backend is running
   - Check CORS settings

2. **Login not working**
   - Clear localStorage
   - Check network tab for errors
   - Verify credentials

3. **Build errors**
   - Delete `node_modules` and reinstall
   - Clear npm cache: `npm cache clean --force`

## 📄 License

MIT

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For issues and questions, please open a GitHub issue.
