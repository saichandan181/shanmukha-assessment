# 🚀 User Management System

**Full-Stack User Management System** with Secure Authentication, RBAC, and Modern UI

> 📜 **Assessment**: Purple Merit Technologies Backend Intern Assessment

[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org)

---

## 📌 Project Overview

A production-grade user management system featuring:

- 🔐 **Secure Authentication** - Email/password with JWT tokens
- 👥 **Role-Based Access Control (RBAC)** - Admin and User roles
- 📊 **User Lifecycle Management** - Create, read, update, activate/deactivate
- 🎨 **Modern Responsive UI** - Mobile-first design with Tailwind CSS
- ☁️ **Cloud Deployment** - Ready for production deployment
- ✅ **Comprehensive Testing** - Unit tests with Jest

---

## 🎯 Features

### Authentication
- ✅ Email & Password signup
- ✅ Secure login with JWT
- ✅ Session management
- ✅ Password change functionality
- ✅ Auto logout on token expiry

### Authorization (RBAC)
- 👤 **User Role**: Access to personal dashboard and profile
- 👑 **Admin Role**: Full user management capabilities

### User Management
- ✅ View all users (paginated)
- ✅ Activate/Deactivate users
- ✅ Update profile information
- ✅ Change password
- ✅ Track last login

### UI/UX
- ✅ Responsive design (mobile + desktop)
- ✅ Form validation with error messages
- ✅ Loading states & spinners
- ✅ Toast notifications
- ✅ Confirmation modals
- ✅ Protected routes
- ✅ Role-based navigation

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js + Express | Server framework |
| Supabase | PostgreSQL database + Auth |
| Joi | Input validation |
| Jest + Supertest | Testing |
| bcrypt | Password hashing (via Supabase) |
| dotenv | Environment management |

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Axios | HTTP client |
| Tailwind CSS | Styling |
| Vite | Build tool |
| React Toastify | Notifications |

### Database
| Component | Technology |
|-----------|------------|
| Database | Supabase (PostgreSQL) |
| Authentication | Supabase Auth |
| Security | Row Level Security (RLS) |

### Deployment
| Component | Platform |
|-----------|----------|
| Backend | Vercel (https://shanmukha-assessment-api.vercel.app) |
| Frontend | Vercel (https://shanmukha-assessment.vercel.app) |
| Database | Supabase Cloud |

---

## 🌐 Live URLs

- **Frontend Application**: https://shanmukha-assessment.vercel.app
- **Backend API**: https://shanmukha-assessment-api.vercel.app/api
- **API Documentation**: https://shanmukha-assessment-api.vercel.app/api-docs
- **Health Check**: https://shanmukha-assessment-api.vercel.app/health

---

## 📁 Repository Structure

```
user-management-system/
├── backend/                    # Express.js API
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   ├── controllers/       # Request handlers
│   │   ├── middleware/        # Auth & error handling
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Helpers & validators
│   │   ├── app.js             # Express app
│   │   └── server.js          # Entry point
│   ├── tests/                 # Jest unit tests
│   ├── .env.example           # Environment template
│   ├── package.json
│   └── README.md
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── contexts/          # React contexts
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   ├── App.jsx            # Main app
│   │   └── main.jsx           # Entry point
│   ├── .env.example           # Environment template
│   ├── package.json
│   └── README.md
│
├── sql/                        # Database migrations
│   ├── 01_create_users_table.sql
│   ├── 02_enable_rls.sql
│   ├── 03_create_trigger_function.sql
│   ├── 04_seed_admin.sql
│   └── README.md
│
└── README.md                   # This file
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Supabase account ([Sign up free](https://supabase.com))
- Git

### 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd user-management-system
```

### 2️⃣ Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor
3. Run SQL scripts from `/sql` folder in order:
   - `01_create_users_table.sql`
   - `02_enable_rls.sql`
   - `03_create_trigger_function.sql`

4. Get your Supabase credentials:
   - **Project URL**: Settings → API → Project URL
   - **Anon Key**: Settings → API → Project API keys → anon public
   - **Service Role Key**: Settings → API → Project API keys → service_role

### 3️⃣ Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
NODE_ENV=development

SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

JWT_SECRET=your_super_secret_key_change_this
FRONTEND_URL=http://localhost:5173
```

Start backend:
```bash
npm run dev
```

Backend running at `http://localhost:5000`

### 4️⃣ Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```

Frontend running at `http://localhost:5173`

### 5️⃣ Create Admin User

1. Sign up a user through the app
2. Go to Supabase SQL Editor
3. Run:
```sql
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

---

## 📖 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/signup` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| POST | `/auth/logout` | Logout user | Yes |
| GET | `/auth/me` | Get current user | Yes |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users/me` | Get profile | Yes (User) |
| PUT | `/users/me` | Update profile | Yes (User) |
| PUT | `/users/me/password` | Change password | Yes (User) |

### Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/admin/users` | Get all users (paginated) | Yes (Admin) |
| PUT | `/admin/users/:id/activate` | Activate user | Yes (Admin) |
| PUT | `/admin/users/:id/deactivate` | Deactivate user | Yes (Admin) |

### Example: Signup Request

```bash
curl -X POST https://shanmukha-assessment-api.vercel.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123",
    "full_name": "John Doe"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "full_name": "John Doe",
      "role": "user",
      "status": "active"
    },
    "access_token": "eyJhbGc..."
  }
}
```

---

## 🗄 Database Schema

### users Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (references auth.users) |
| email | TEXT | Unique email address |
| full_name | TEXT | User's full name |
| role | ENUM | 'admin' or 'user' |
| status | ENUM | 'active' or 'inactive' |
| last_login | TIMESTAMP | Last login timestamp |
| created_at | TIMESTAMP | Account creation time |
| updated_at | TIMESTAMP | Last update time |

### Row Level Security (RLS) Policies

- Users can view/update their own profile
- Only admins can view all users
- Only admins can update user status
- Automatic profile creation on signup

---

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test
```

**Test Coverage:**
- ✅ Authentication endpoints (signup, login, logout, me)
- ✅ Middleware (authentication, authorization)
- ✅ Input validation schemas
- ✅ RBAC logic

### Run with Coverage

```bash
npm test -- --coverage
```

---

## 🚀 Deployment

### Backend Deployment (Render)

1. Create account on [Render](https://render.com)
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Configure:
   - **Name**: user-management-backend
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Instance Type**: Free
5. Add environment variables (from `.env`)
6. Deploy!

### Frontend Deployment (Vercel)

1. Create account on [Vercel](https://vercel.com)
2. Click "New Project"
3. Import GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: dist
5. Add environment variable:
   - `VITE_API_URL`: Your backend URL
6. Deploy!

### Environment Variables for Production

**Backend:**
```env
NODE_ENV=production
SUPABASE_URL=<your-supabase-url>
SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
JWT_SECRET=<strong-secret-key>
FRONTEND_URL=https://your-frontend-url.vercel.app
```

**Frontend:**
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## 📹 Demo Video Script

### 3-5 Minute Walkthrough

**1. Introduction (30s)**
- Project overview
- Tech stack

**2. Authentication (1m)**
- Signup new user
- Login flow
- Dashboard access

**3. User Features (1m)**
- View profile
- Update profile
- Change password

**4. Admin Features (1.5m)**
- Login as admin
- View all users (pagination)
- Activate/Deactivate user
- Confirmation modals

**5. API Demo (1m)**
- Postman collection
- Show key endpoints
- Response format

**6. Responsive Design (30s)**
- Mobile view
- Tablet view
- Desktop view

---

## 🔒 Security Features

- ✅ Password hashing (Supabase Auth)
- ✅ JWT-based authentication
- ✅ Row Level Security (RLS)
- ✅ Input validation (Joi)
- ✅ CORS protection
- ✅ Protected routes (frontend & backend)
- ✅ SQL injection prevention
- ✅ XSS protection

---

## 🎨 Screenshots

### Login Page
![Login](docs/screenshots/login.png)

### User Dashboard
![Dashboard](docs/screenshots/dashboard.png)

### Admin Panel
![Admin](docs/screenshots/admin.png)

*(Add actual screenshots after deployment)*

---

## 📝 Future Enhancements

- [ ] Email verification
- [ ] Password reset via email
- [ ] Two-factor authentication (2FA)
- [ ] Audit logs
- [ ] Advanced search & filters
- [ ] Bulk user operations
- [ ] Export users to CSV
- [ ] Dark mode
- [ ] User avatar upload
- [ ] Activity tracking

---

## 🐛 Known Issues

None at this time. Please report issues on GitHub.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- Purple Merit Technologies for the assessment opportunity
- Supabase for the amazing backend platform
- React and Express communities

---

## 📞 Support

For questions or issues:
- 📧 Email: your.email@example.com
- 🐛 GitHub Issues: [Create an issue](https://github.com/yourusername/repo/issues)

---

**Built with ❤️ for Purple Merit Technologies Backend Intern Assessment**
