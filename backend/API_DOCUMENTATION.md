# 📚 API Documentation

## Access API Documentation

### Local Development
When running locally (`npm run dev`):
- **Interactive Swagger UI**: http://localhost:5000/api-docs
- **OpenAPI JSON**: http://localhost:5000/api-docs.json

### Production (Vercel)
Swagger UI is disabled in serverless environment. Use these alternatives:

#### Option 1: Postman Collection (Recommended)
Import the Postman collection: `postman_collection.json`
- Located in project root
- Contains all endpoints with examples
- Pre-configured authentication

#### Option 2: OpenAPI JSON + Swagger Editor
1. Get the OpenAPI spec: https://shanmukha-assessment-api.vercel.app/api-docs.json
2. Copy the JSON response
3. Open [Swagger Editor](https://editor.swagger.io/)
4. Paste the JSON
5. Use the interactive UI

#### Option 3: Use This Documentation

---

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

Get a token by calling `/auth/signup` or `/auth/login`.

---

## 📡 Base URLs

- **Local**: `http://localhost:5000/api`
- **Production**: `https://shanmukha-assessment-api.vercel.app/api`

---

## 🚀 Endpoints

### Authentication

#### POST /auth/signup
Register a new user

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "full_name": "John Doe"
}
```

**Response (201):**
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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

#### POST /auth/login
Authenticate user

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "JWT_TOKEN"
  }
}
```

---

#### POST /auth/logout
🔒 Requires authentication

Logout current user

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

#### GET /auth/me
🔒 Requires authentication

Get current user profile

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "user",
    "status": "active",
    "last_login": "2025-12-29T10:00:00Z",
    "created_at": "2025-12-29T09:00:00Z",
    "updated_at": "2025-12-29T10:00:00Z"
  }
}
```

---

### User Profile

#### GET /users/me
🔒 Requires authentication

Get own profile (same as /auth/me)

---

#### PUT /users/me
🔒 Requires authentication

Update own profile

**Request:**
```json
{
  "full_name": "John Smith",
  "email": "newemail@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": { ... }
}
```

---

#### PUT /users/me/password
🔒 Requires authentication

Change password

**Request:**
```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

---

### Admin Endpoints

All admin endpoints require:
- 🔒 Authentication (JWT token)
- 👑 Admin role

---

#### GET /admin/users
👑 Admin only

Get all users with pagination

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example:**
```
GET /admin/users?page=1&limit=10
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "full_name": "John Doe",
      "role": "user",
      "status": "active",
      "created_at": "2025-12-29T09:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

---

#### GET /admin/users/:id
👑 Admin only

Get specific user by ID

**Example:**
```
GET /admin/users/7bcf2364-669b-46ae-b7fb-cd478d8320cc
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "7bcf2364-669b-46ae-b7fb-cd478d8320cc",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "user",
    "status": "active"
  }
}
```

---

#### PUT /admin/users/:id/activate
👑 Admin only

Activate user account

**Example:**
```
PUT /admin/users/7bcf2364-669b-46ae-b7fb-cd478d8320cc/activate
```

**Response (200):**
```json
{
  "success": true,
  "message": "User activated successfully",
  "data": {
    "id": "7bcf2364-669b-46ae-b7fb-cd478d8320cc",
    "status": "active"
  }
}
```

---

#### PUT /admin/users/:id/deactivate
👑 Admin only

Deactivate user account

**Example:**
```
PUT /admin/users/7bcf2364-669b-46ae-b7fb-cd478d8320cc/deactivate
```

**Response (200):**
```json
{
  "success": true,
  "message": "User deactivated successfully",
  "data": {
    "id": "7bcf2364-669b-46ae-b7fb-cd478d8320cc",
    "status": "inactive"
  }
}
```

---

## ❌ Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### Common Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (not logged in) |
| 403 | Forbidden (no permission) |
| 404 | Not Found |
| 500 | Server Error |

---

## 🧪 Testing with cURL

### Signup
```bash
curl -X POST https://shanmukha-assessment-api.vercel.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!",
    "full_name": "Test User"
  }'
```

### Login
```bash
curl -X POST https://shanmukha-assessment-api.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!"
  }'
```

### Get Current User (with token)
```bash
curl -X GET https://shanmukha-assessment-api.vercel.app/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get All Users (admin only)
```bash
curl -X GET "https://shanmukha-assessment-api.vercel.app/api/admin/users?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

---

## 📱 Testing with Postman

1. Import `postman_collection.json` from project root
2. Create an environment with:
   - `base_url`: `https://shanmukha-assessment-api.vercel.app/api`
   - `token`: (will be set automatically after login)
3. Run requests in this order:
   - Signup → Login → Get Me → (Admin endpoints if admin)

---

## 🔗 Additional Resources

- **Postman Collection**: See `postman_collection.json` in project root
- **Admin Capabilities**: See `ADMIN_CAPABILITIES.md`
- **Deployment Guide**: See `VERCEL_DEPLOYMENT.md`
- **Main README**: See `README.md`

---

**Production API**: https://shanmukha-assessment-api.vercel.app/api  
**Health Check**: https://shanmukha-assessment-api.vercel.app/health  
**OpenAPI Spec**: https://shanmukha-assessment-api.vercel.app/api-docs.json
