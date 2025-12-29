# User Management System - Backend

Production-grade backend API for user management with authentication and RBAC.

## 🚀 Features

- ✅ Secure authentication with Supabase Auth
- ✅ JWT-based session management
- ✅ Role-based access control (Admin/User)
- ✅ User lifecycle management
- ✅ Input validation with Joi
- ✅ Centralized error handling
- ✅ RESTful API design
- ✅ Unit tests with Jest

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Validation**: Joi
- **Testing**: Jest, Supertest

## 📋 Prerequisites

- Node.js 16+ and npm
- Supabase account and project
- Git

## 🔧 Installation

1. **Clone the repository**
```bash
cd backend
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

Update `.env` with your Supabase credentials:
```env
PORT=5000
NODE_ENV=development

SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

JWT_SECRET=your_secure_jwt_secret
FRONTEND_URL=http://localhost:5173
```

## 🗄 Database Setup

1. Go to your Supabase project SQL Editor
2. Run the SQL scripts in the `/sql` folder in order:
   - `01_create_users_table.sql`
   - `02_enable_rls.sql`
   - `03_create_trigger_function.sql`

3. Create an admin user (after signup):
```sql
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'your-admin-email@example.com';
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Run Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

## 📚 API Documentation

### Base URL
```
https://shanmukha-assessment-api.vercel.app/api (Production) or http://localhost:5000/api (Local)
```

### Authentication Endpoints

#### 1. Sign Up
```http
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123",
  "full_name": "John Doe"
}
```

**Response (201)**
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
    "access_token": "jwt_token",
    "refresh_token": "refresh_token"
  }
}
```

#### 2. Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Response (200)**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "access_token": "jwt_token",
    "refresh_token": "refresh_token"
  }
}
```

#### 3. Get Current User
```http
GET /auth/me
Authorization: Bearer {token}
```

**Response (200)**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "user",
    "status": "active",
    "last_login": "2024-01-15T10:30:00Z",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

#### 4. Logout
```http
POST /auth/logout
Authorization: Bearer {token}
```

### User Endpoints (Authenticated)

#### 1. Get Profile
```http
GET /users/me
Authorization: Bearer {token}
```

#### 2. Update Profile
```http
PUT /users/me
Authorization: Bearer {token}
Content-Type: application/json

{
  "full_name": "Updated Name",
  "email": "newemail@example.com"
}
```

#### 3. Update Password
```http
PUT /users/me/password
Authorization: Bearer {token}
Content-Type: application/json

{
  "current_password": "OldPass123",
  "new_password": "NewPass123"
}
```

### Admin Endpoints (Admin Only)

#### 1. Get All Users
```http
GET /admin/users?page=1&limit=10
Authorization: Bearer {admin_token}
```

**Response (200)**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

#### 2. Activate User
```http
PUT /admin/users/{userId}/activate
Authorization: Bearer {admin_token}
```

#### 3. Deactivate User
```http
PUT /admin/users/{userId}/deactivate
Authorization: Bearer {admin_token}
```

## 🧪 Testing

The project includes comprehensive unit tests:

- **Authentication Tests**: Signup, Login, Logout, Get Current User
- **Middleware Tests**: Authentication and Authorization
- **Validation Tests**: Input validation schemas

Run tests:
```bash
npm test
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── supabase.js          # Supabase client configuration
│   ├── controllers/
│   │   ├── authController.js     # Auth request handlers
│   │   ├── userController.js     # User request handlers
│   │   └── adminController.js    # Admin request handlers
│   ├── middleware/
│   │   ├── auth.js               # Auth & RBAC middleware
│   │   └── errorHandler.js       # Error handling middleware
│   ├── routes/
│   │   ├── authRoutes.js         # Auth routes
│   │   ├── userRoutes.js         # User routes
│   │   └── adminRoutes.js        # Admin routes
│   ├── services/
│   │   ├── authService.js        # Auth business logic
│   │   ├── userService.js        # User business logic
│   │   └── adminService.js       # Admin business logic
│   ├── utils/
│   │   ├── validators.js         # Joi validation schemas
│   │   └── response.js           # Response helpers
│   ├── app.js                    # Express app setup
│   └── server.js                 # Server entry point
├── tests/
│   ├── auth.test.js              # Auth endpoint tests
│   ├── middleware.test.js        # Middleware tests
│   └── validators.test.js        # Validation tests
├── .env.example
├── .gitignore
├── package.json
└── jest.config.js
```

## 🚀 Deployment

### Deploy to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
4. Add environment variables from `.env`

### Deploy to Railway

1. Install Railway CLI or use web dashboard
2. Run:
```bash
railway init
railway up
```
3. Add environment variables in Railway dashboard

## 🔒 Security Best Practices

- ✅ Passwords hashed with Supabase Auth
- ✅ JWT tokens for stateless authentication
- ✅ Row Level Security (RLS) enabled
- ✅ Input validation on all endpoints
- ✅ CORS configured
- ✅ Rate limiting recommended for production
- ✅ Helmet.js recommended for production

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 5000) |
| `NODE_ENV` | Environment | No (default: development) |
| `SUPABASE_URL` | Supabase project URL | Yes |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `FRONTEND_URL` | Frontend URL for CORS | No (default: http://localhost:5173) |

## 🐛 Troubleshooting

### Common Issues

1. **Cannot connect to Supabase**
   - Verify SUPABASE_URL and keys are correct
   - Check network connectivity

2. **Tests failing**
   - Ensure test database is set up
   - Check environment variables

3. **Authentication errors**
   - Verify JWT_SECRET is set
   - Check token expiration

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
