# Kinetic Orange — API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

### POST /auth/register
Register a new user.
```json
{ "firstName": "John", "lastName": "Doe", "email": "john@example.com", "password": "password123" }
```

### POST /auth/login
```json
{ "email": "john@example.com", "password": "password123" }
```
Returns: `{ accessToken, refreshToken, user }`

### POST /auth/refresh
```json
{ "refreshToken": "..." }
```

### POST /auth/logout
**Protected.** Invalidates refresh token.

### GET /auth/me
**Protected.** Returns current user.

### POST /auth/forgot-password
```json
{ "email": "john@example.com" }
```

### PUT /auth/reset-password/:token
```json
{ "password": "newpassword123" }
```

---

## Users

### GET /users/profile — Protected
### PUT /users/profile — Protected
### PUT /users/password — Protected
### GET /users — Admin only (supports ?search, ?role, ?page, ?limit)
### GET /users/:id — Admin only
### PUT /users/:id — Admin only
### DELETE /users/:id — Admin only

---

## Services

### GET /services — Public (supports ?featured=true)
### GET /services/:slug — Public
### GET /services/admin/all — Admin only
### POST /services — Admin only
### PUT /services/:id — Admin only
### DELETE /services/:id — Admin only

---

## Projects

### GET /projects/public — Public portfolio
### GET /projects/my — Protected (user's projects)
### GET /projects/:id — Protected
### GET /projects — Admin only
### POST /projects — Admin only
### PUT /projects/:id — Admin only
### DELETE /projects/:id — Admin only

---

## Blog

### GET /blog — Public (supports ?category, ?page, ?limit)
### GET /blog/:slug — Public
### GET /blog/admin/all — Admin only
### POST /blog — Admin only
### PUT /blog/:id — Admin only
### DELETE /blog/:id — Admin only

---

## Contact

### POST /contact — Public
### GET /contact — Admin only
### GET /contact/:id — Admin only
### PUT /contact/:id/reply — Admin only
### DELETE /contact/:id — Admin only

---

## Leads

### POST /leads — Public
### GET /leads — Admin only
### GET /leads/:id — Admin only
### PUT /leads/:id — Admin only
### DELETE /leads/:id — Admin only

---

## Invoices

### GET /invoices/my — Protected
### GET /invoices — Admin only
### GET /invoices/:id — Protected (owner or admin)
### POST /invoices — Admin only
### PUT /invoices/:id — Admin only
### DELETE /invoices/:id — Admin only

---

## Notifications

### GET /notifications — Protected
### PUT /notifications/:id/read — Protected
### PUT /notifications/read-all — Protected
### DELETE /notifications/:id — Protected

---

## Settings

### GET /settings/public — Public
### GET /settings — Admin only
### PUT /settings — Admin only
### DELETE /settings/:id — Admin only

---

## Health Check

### GET /health
Returns API status and timestamp.

---

## Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "errors": [{ "field": "email", "message": "Invalid email" }]
}
```

## Auth Headers

```
Authorization: Bearer <accessToken>
```
