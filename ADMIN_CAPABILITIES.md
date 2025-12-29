# Admin Capabilities Documentation

## Admin Role Overview

Admins have **full control** over user management in the system. An admin account has elevated privileges that regular users don't have.

---

## 🔐 What Can An Admin Do?

### 1. **View All Users**
- **Endpoint**: `GET /api/admin/users`
- **Description**: Retrieve a paginated list of all users in the system
- **Capabilities**:
  - See all user profiles (email, name, role, status)
  - View user account creation dates
  - See last login timestamps
  - Filter and paginate through users
- **Permissions**: Admin only
- **Example Use Cases**:
  - Monitor user growth
  - Audit user activity
  - Generate user reports
  - Identify inactive accounts

### 2. **View Individual User Details**
- **Endpoint**: `GET /api/admin/users/:id`
- **Description**: Get detailed information about any specific user
- **Capabilities**:
  - View complete user profile
  - See user's current status
  - Check user's role
  - View registration and last login dates
- **Permissions**: Admin only
- **Example Use Cases**:
  - Investigate user issues
  - Verify user information
  - Support ticket resolution

### 3. **Activate User Accounts**
- **Endpoint**: `PUT /api/admin/users/:id/activate`
- **Description**: Change a user's status from 'inactive' to 'active'
- **Capabilities**:
  - Enable login for previously deactivated users
  - Restore account access
  - Re-enable all user features
- **Permissions**: Admin only
- **Example Use Cases**:
  - Reactivate suspended accounts
  - Restore access after payment
  - Un-ban users after appeals
  - Enable accounts after verification

### 4. **Deactivate User Accounts**
- **Endpoint**: `PUT /api/admin/users/:id/deactivate`
- **Description**: Change a user's status from 'active' to 'inactive'
- **Capabilities**:
  - Prevent user from logging in
  - Suspend account access
  - Disable all user features
  - Keep user data intact (no deletion)
- **Permissions**: Admin only
- **Example Use Cases**:
  - Suspend accounts for policy violations
  - Temporary account suspension
  - Ban malicious users
  - Disable inactive accounts

---

## ❌ What Can An Admin NOT Do?

The following actions are **NOT** currently available to admins (by design):

1. **Delete User Accounts** - Users are deactivated, not deleted (data preservation)
2. **Change User Passwords** - Users must change their own passwords
3. **Change User Email** - Only users can update their own email
4. **Change User Roles** - Role changes require database-level access
5. **View User Passwords** - Passwords are hashed and never exposed
6. **Impersonate Users** - No login-as functionality
7. **Bulk Operations** - No bulk activate/deactivate (must be done individually)
8. **Delete Themselves** - Admins cannot deactivate their own account

---

## 📊 Admin vs Regular User Comparison

| Feature | Regular User | Admin |
|---------|-------------|-------|
| View own profile | ✅ | ✅ |
| Edit own profile | ✅ | ✅ |
| Change own password | ✅ | ✅ |
| View all users | ❌ | ✅ |
| View other users | ❌ | ✅ |
| Activate users | ❌ | ✅ |
| Deactivate users | ❌ | ✅ |
| Change user roles | ❌ | ❌* |
| Delete users | ❌ | ❌* |
| View user passwords | ❌ | ❌ |

*Requires direct database access or future feature implementation

---

## 🔒 Admin Security & Access Control

### How Admins Are Protected:

1. **JWT Authentication**: Admins must authenticate with valid JWT token
2. **Role-Based Middleware**: `requireAdmin()` middleware checks role on every request
3. **Row Level Security**: Database-level policies restrict data access
4. **Status Checks**: Inactive admins are denied access
5. **Audit Trail**: All admin actions are logged with timestamps

### Admin Middleware Flow:
```
Request → authenticate() → Check JWT → Get User → Check Status → requireAdmin() → Check Role === 'admin' → Allow/Deny
```

---

## 🎯 Common Admin Workflows

### **Workflow 1: Suspend Problematic User**
```
1. GET /api/admin/users?page=1&limit=10 (Find user)
2. GET /api/admin/users/{id} (Verify user details)
3. PUT /api/admin/users/{id}/deactivate (Suspend account)
```

### **Workflow 2: Reactivate User After Appeal**
```
1. GET /api/admin/users/{id} (Review user)
2. PUT /api/admin/users/{id}/activate (Restore access)
```

### **Workflow 3: Monitor User Base**
```
1. GET /api/admin/users?page=1&limit=100 (Get all users)
2. Filter by status/role on frontend
3. Generate reports
```

---

## 🚀 How to Create Your First Admin User

Since signup creates regular users by default, you need to promote a user to admin:

### **Option 1: Using Supabase Dashboard**
1. Go to: https://jfhfaiuptnqohahjyfvz.supabase.co
2. Click **Table Editor** → **users** table
3. Find your user
4. Edit the `role` field → Change to `admin`
5. Save

### **Option 2: Using SQL**
```sql
-- Run in Supabase SQL Editor
UPDATE public.users 
SET role = 'admin'::user_role 
WHERE email = 'your-email@example.com';
```

### **Option 3: Using Provided SQL Script**
Run `sql/04_seed_admin.sql` instructions in Supabase SQL Editor.

---

## 📱 Admin API Examples

### **Example 1: Get All Users (Paginated)**
```bash
curl -X GET "https://shanmukha-assessment-api.vercel.app/api/admin/users?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

### **Example 2: Deactivate User**
```bash
curl -X PUT "https://shanmukha-assessment-api.vercel.app/api/admin/users/{user-uuid}/deactivate" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

### **Example 3: Activate User**
```bash
curl -X PUT "https://shanmukha-assessment-api.vercel.app/api/admin/users/{user-uuid}/activate" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

---

## 🎨 Admin Dashboard Features (Frontend)

The Admin Dashboard (`/admin`) provides:

- **User Management Table**
  - View all users in paginated table
  - See role, status, email, name, created date
  - Real-time status indicators (badges)

- **Quick Actions**
  - Activate/Deactivate buttons for each user
  - Confirmation modals before actions
  - Toast notifications for success/error

- **Pagination Controls**
  - Navigate through pages
  - 10 users per page
  - Total count display

- **Search & Filter** (Future Enhancement)
  - Search by name/email
  - Filter by role/status
  - Sort by columns

---

## 🔮 Future Admin Features (Roadmap)

Potential enhancements for admin capabilities:

1. **Role Management** - Change user roles (user ↔ admin)
2. **Bulk Operations** - Activate/deactivate multiple users at once
3. **User Deletion** - Soft delete with data retention
4. **Audit Logs** - View history of all admin actions
5. **Email Notifications** - Notify users on status changes
6. **Advanced Filters** - Search, sort, filter users
7. **User Statistics** - Dashboard with charts and metrics
8. **Export Data** - Export user list to CSV/Excel
9. **Session Management** - View and revoke active sessions
10. **Role Permissions** - Granular permission system

---

## 📞 Support

For admin-related issues or feature requests:
- Check the API documentation at `/api-docs`
- Review the backend logs for errors
- Contact support team
- Submit feature requests via GitHub Issues

---

**Last Updated**: December 29, 2025  
**Version**: 1.0.0
