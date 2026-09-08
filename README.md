# 🔎 LostLines — Campus Lost & Found Management System

> A full-stack MERN application designed to help students report, search, manage, and recover lost and found items within a campus.

[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react\&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js\&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/API-Express.js-000000?logo=express\&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb\&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens\&logoColor=white)](https://jwt.io/)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF?logo=vite\&logoColor=white)](https://vite.dev/)

---

## 📌 Overview

**LostLines** is a campus-focused Lost & Found Management System.

Students can report lost or found items, view their submitted reports, search and filter items, edit or delete their reports, and mark lost items as recovered.

The application uses a **MERN stack architecture** with JWT-based authentication and MongoDB for persistent data storage.

---

## ✨ Features

### 🔐 Authentication

* User registration
* User login
* JWT-based authentication
* Protected routes
* Automatic handling of expired/invalid sessions
* Secure logout
* Password hashing
* Authentication error handling

### 📦 Item Management

Authenticated users can:

* Add lost items
* Add found items
* View item details
* Edit their own items
* Delete their own items
* Mark lost items as recovered
* View only their authorized item records

### 🔎 Search, Filter & Sort

* Search items by name
* Search by location
* Filter by status
* Sort item records
* Handle empty search results

### 📊 Dashboard Analytics

The dashboard provides:

* Total items
* Lost items
* Found items
* Recovered items
* Recovery statistics
* Visual analytics using Chart.js
* Recent activity

### 👤 User Profile

* View profile information
* Edit profile details
* Update name
* Update email
* Persistent profile data

### 🎨 User Experience

* Responsive interface
* Loading states
* Skeleton loaders
* Empty states
* Error states
* Toast notifications
* Confirmation dialogs
* Smooth animations
* Dark mode support

---

# 🏗️ Tech Stack

## Frontend

* React
* Vite
* React Router
* Axios
* React Toastify
* Framer Motion
* Chart.js
* react-chartjs-2
* Lucide React

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcrypt

## Development Tools

* Git
* GitHub
* VS Code
* MongoDB Atlas
* npm

---

# 🏛️ System Architecture

```text
                    ┌──────────────────────┐
                    │       User           │
                    │   Web Browser        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React + Vite       │
                    │     Frontend         │
                    └──────────┬───────────┘
                               │
                         Axios / REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Node.js + Express  │
                    │      Backend         │
                    └──────────┬───────────┘
                               │
                     JWT Authentication
                               │
                               ▼
                    ┌──────────────────────┐
                    │      Mongoose        │
                    │    Data Modeling     │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    MongoDB Atlas     │
                    │       Database       │
                    └──────────────────────┘
```

---

# 📂 Project Structure

```text
lostlines/
│
├── lostlines-backend/
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Item.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   └── user.js
│   │
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── lostlines-react/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── README.md
└── package.json
```

> The repository may also contain legacy static LostLines files from the earlier HTML/CSS/JavaScript implementation.

---

# 🔄 Application Flow

## Registration

```text
User
 ↓
Registration Form
 ↓
Express API
 ↓
Validate User
 ↓
Hash Password
 ↓
MongoDB
 ↓
Account Created
```

## Login

```text
User
 ↓
Login
 ↓
Express API
 ↓
Validate Credentials
 ↓
Generate JWT
 ↓
Frontend stores authentication state
 ↓
Protected Dashboard
```

## Add Item

```text
User
 ↓
Add Item Form
 ↓
Axios
 ↓
POST /items
 ↓
JWT Middleware
 ↓
Validate Request
 ↓
MongoDB
 ↓
Dashboard Updated
```

## Delete Item

```text
User
 ↓
Delete
 ↓
Confirmation
 ↓
DELETE /items/:id
 ↓
JWT Authentication
 ↓
Ownership Verification
 ↓
MongoDB
 ↓
Item Deleted
 ↓
Dashboard Updated
```

---

# 🔐 Security

LostLines uses several security practices:

### JWT Authentication

Protected API endpoints require a valid JWT.

```text
Authorization: Bearer <JWT>
```

### Ownership Protection

Users can manage only their own item records.

```text
User A
  ↓
Own Item → Allowed

User A
  ↓
User B's Item → Denied
```

### Password Security

Passwords are hashed before being stored.

Plain-text passwords are not stored in the database.

### Environment Variables

Sensitive configuration is stored using environment variables.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Never commit real secrets to GitHub.

---

# 🌐 API Endpoints

## Authentication

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| POST   | `/auth/register` | Register a user |
| POST   | `/auth/login`    | Login a user    |

## User

| Method | Endpoint         | Description                      |
| ------ | ---------------- | -------------------------------- |
| GET    | `/users/profile` | Get authenticated user's profile |

## Items

| Method | Endpoint     | Description                    |
| ------ | ------------ | ------------------------------ |
| GET    | `/items`     | Get authenticated user's items |
| POST   | `/items`     | Create an item                 |
| PUT    | `/items/:id` | Update owned item              |
| DELETE | `/items/:id` | Delete owned item              |

> Authentication is required for protected endpoints.

---

# 🗄️ Database

LostLines uses **MongoDB Atlas** for persistent storage.

### Main Collections

```text
Users
Items
```

### Item Example

```json
{
  "name": "Black Wallet",
  "location": "Library",
  "status": "Lost",
  "owner": "USER_ID"
}
```

The `owner` field connects an item to the authenticated user.

---

# 🌍 Production Deployment

LostLines is deployed as three parts:

```text
Frontend   React + Vite   →  Vercel (or similar static host)
Backend    Node + Express →  Render (or similar Node host)
Database   MongoDB        →  MongoDB Atlas
```

## Environment Variables

Secrets exist only in the hosting environment / local `.env` files — never in Git.

### Frontend (`lostlines-react/.env.example`)

```env
VITE_API_URL=http://localhost:5000
```

> ⚠️ `VITE_*` variables are baked into the frontend build and are visible in the
> browser. **Never** put `JWT_SECRET`, `MONGO_URI`, database passwords or private
> API keys in frontend environment variables.

Production example (set in the frontend host, e.g. Vercel):

```env
VITE_API_URL=https://lostlines-api.onrender.com
```

### Backend (`lostlines-backend/.env.example`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Optional: comma-separated list of allowed frontend origins.
# Leave empty during development to allow all origins.
CORS_ORIGINS=
```

| Variable       | Required | Purpose                                             |
|----------------|----------|-----------------------------------------------------|
| `MONGO_URI`    | ✅        | MongoDB Atlas connection string                     |
| `JWT_SECRET`   | ✅        | Secret used to sign/verify JWTs — use a long random value |
| `PORT`         | ✅        | Port the Express server listens on (hosts set this) |
| `CORS_ORIGINS` | optional | Comma-separated allowlist of frontend origins       |

## Database — MongoDB Atlas

1. Create/use a cluster in [MongoDB Atlas](https://www.mongodb.com/atlas).
2. **Network Access** must allow the deployed backend to connect:
   - Add the hosting provider's outbound IP, **or**
   - Use `0.0.0.0/0` (allow all) only if you accept the risk and the cluster uses a
     strong database password.
3. Copy the connection string
   (`mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/lostlines?retryWrites=true&w=majority`)
   and set it as `MONGO_URI` in the backend host — never commit it.

## Backend Deployment — Render

1. Push this repository to GitHub.
2. On Render: **New → Web Service** → connect the GitHub repo.
3. Configure:

   | Setting            | Value                            |
   |--------------------|----------------------------------|
   | Root Directory     | `lostlines-backend`              |
   | Build Command      | `npm install`                    |
   | Start Command      | `npm start`                      |
   | Instance Type      | Free / Starter                   |

4. Add environment variables in the Render dashboard:

   ```env
   MONGO_URI=mongodb+srv://<your-connection-string>
   JWT_SECRET=<long-random-secret>
   PORT=10000
   CORS_ORIGINS=https://<your-vercel-frontend-url>
   ```

5. The backend fails-fast at startup if MongoDB is unreachable — it never serves
   a "healthy but broken" API.

## Frontend Deployment — Vercel

1. On Vercel: **Add New → Project** → import the GitHub repo.
2. **Root Directory**: `lostlines-react`
3. Framework preset: Vite (auto-detected). The `vercel.json` inside
   `lostlines-react/` sets the build command, output directory (`dist`) and an SPA
   rewrite so routes like `/dashboard` and `/profile` work after a browser refresh.
4. Add the frontend environment variable:

   ```env
   VITE_API_URL=https://<your-render-backend-url>
   ```

5. Deploy.

## SPA Routing (why `/dashboard` won't 404 after refresh)

The app uses React Router's `BrowserRouter` (client-side routing). When the browser
refreshes `/dashboard`, the static host receives a `GET /dashboard` request. The
`vercel.json` rewrite sends every path to `/index.html`, letting React Router re-render
the right page — no 404.

## Deployment Security Notes

- `MONGO_URI` and `JWT_SECRET` exist **only** in the backend hosting environment.
- Frontend env vars contain only the public API URL (`VITE_API_URL`).
- `.env` files are git-ignored; `.env.example` files contain placeholders only.
- `CORS_ORIGINS` defaults to allow-all only in local development; set the allowlist
  in production.

---
# ⚙️ Local Setup

## 1. Clone Repository

```bash
git clone https://github.com/VISHNU23CSB61/lostlines.git
cd lostlines
```

## 2. Backend Setup

```bash
cd lostlines-backend
npm install
```

Create `.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend:

```bash
node server.js
```

Backend runs on:

```text
http://localhost:5000
```

---

## 3. Frontend Setup

Open another terminal:

```bash
cd lostlines-react
npm install
npm run dev
```

Vite will provide the local frontend URL.

---

# 🧪 Testing

The application has been tested across the major user flows.

```text
Authentication       ✅
Registration         ✅
Login                ✅
Logout               ✅
JWT Handling         ✅
Protected Routes     ✅
Profile              ✅
Add Item             ✅
View Item            ✅
Edit Item             ✅
Delete Item          ✅
Recover Item         ✅
Search               ✅
Filter               ✅
Sort                 ✅
Statistics           ✅
Analytics            ✅
Loading States       ✅
Error States         ✅
Empty States         ✅
Responsive UI        ✅
```

Testing should be repeated after production deployment.

---

# 🛡️ Error Handling

The application handles common API failures such as:

```text
400 → Bad Request
401 → Unauthorized
403 → Forbidden
404 → Not Found
500 → Server Error
```

Frontend handling includes:

* API error messages
* Authentication expiration handling
* Network error handling
* Loading states
* Toast notifications
* Empty states

---

# 📈 Development Progress

LostLines was developed incrementally.

```text
Phase 1
HTML / CSS / JavaScript
        ↓
Phase 2
React Migration
        ↓
Phase 3
Node.js + Express
        ↓
Phase 4
MongoDB + Mongoose
        ↓
Phase 5
JWT Authentication
        ↓
Phase 6
CRUD Operations
        ↓
Phase 7
Dashboard + Analytics
        ↓
Phase 8
Security + Validation
        ↓
Phase 9
Testing + UI Polish
        ↓
Phase 10
Production Deployment
```

---

# 🚀 Current Status

### Development

**Core MERN application:** ✅ Completed

**Authentication:** ✅ Completed

**CRUD:** ✅ Completed

**Security & Validation:** ✅ Completed

**Testing & UI Polish:** ✅ Completed

**Production Deployment:** 🟡 Configured — final manual hosting step required

**Portfolio/Documentation:** 🔄 Final stage

---

# 🔮 Future Improvements

Potential future improvements include:

* Campus-wide public item discovery
* Image upload for items
* Email notifications
* Item matching/recommendation system
* Admin dashboard
* Claim verification
* Real-time notifications
* Advanced search
* Cloud image storage
* Mobile application

These features are outside the current core implementation.

---

# 💡 Why MongoDB?

MongoDB fits LostLines because item records naturally work as documents.

For example:

```text
Lost Item
├── name
├── location
├── status
└── owner
```

MongoDB also integrates naturally with Node.js through Mongoose and supports cloud hosting through MongoDB Atlas.

---

# 🎯 Learning Outcomes

This project provided practical experience with:

* Full-stack web development
* React component architecture
* REST APIs
* Express.js
* MongoDB
* Mongoose
* JWT authentication
* Authorization
* CRUD operations
* Axios
* API error handling
* Frontend routing
* State management
* Form validation
* Git & GitHub
* Responsive UI
* Debugging
* Deployment preparation

---

# 👨‍💻 Author

**Vishnu S**

Computer Science Engineering Student

### Interests

* Cloud Computing
* DevOps
* Full-Stack Development
* Software Engineering

---

# 📜 License

This project is developed as an academic/personal portfolio project.

---

## ⭐ Support

If this project is useful or interesting, consider giving the repository a ⭐ on GitHub.

**LostLines — Turning lost items into found stories. 🔎**
