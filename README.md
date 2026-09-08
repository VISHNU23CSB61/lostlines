# LostLines — Campus Lost & Found Management System

LostLines is a full-stack campus lost & found management system. Users register with an
email + password, then create, search, filter, sort, update, recover and delete lost/found
item records. The dashboard includes statistics, recent activity and CSV export.

---

## Architecture

```text
React 19              →  lostlines-react/   (frontend — production app)
   ↓
Vite 8                  (build tool / dev server)
   ↓
Axios                   (HTTP client)
   ↓
Express 5             →  lostlines-backend/ (backend API)
   ↓
JWT                     (authentication)
   ↓
Mongoose 9              (ODM)
   ↓
MongoDB Atlas           (database)
```

> ⚠️ **Legacy v1 static site.** The repository root (`index.html`, `home.html`,
> `script.js`, `style.css`) contains the original HTML/CSS/JS version of LostLines.
> It is **not** the production application and must **not** be deployed as the
> frontend. The production frontend lives in **`lostlines-react/`**.

---

## Project Structure (monorepo)

```text
lostlines/
├── lostlines-react/     ← React + Vite frontend (PRODUCTION FRONTEND)
├── lostlines-backend/   ← Express + Mongoose backend
├── index.html           ← LEGACY v1 static site (not used)
├── home.html            ← LEGACY v1 static site (not used)
├── script.js            ← LEGACY v1 static site (not used)
├── style.css            ← LEGACY v1 static site (not used)
├── package.json         ← root monorepo marker (both apps manage their own deps)
└── README.md
```

---

## Technology Stack

| Layer      | Technology                    |
|------------|-------------------------------|
| Frontend   | React 19, Vite 8, Axios, Chart.js, React Router (BrowserRouter) |
| Backend    | Express 5, JWT, bcryptjs, CORS |
| Data layer | Mongoose 9 (ODM)               |
| Database   | MongoDB Atlas                  |

---

## Local Development

### Prerequisites

- Node.js 20.19+ / 22.x (LTS recommended)
- MongoDB Atlas cluster (free tier is fine)

### 1. Backend

```bash
cd lostlines-backend
npm install
cp .env.example .env      # then fill in your values
npm start                 # → http://localhost:5000
```

### 2. Frontend

```bash
cd lostlines-react
npm install
cp .env.example .env.local
npm run dev               # → http://localhost:5173
```

Open `http://localhost:5173` and log in / register.

### 3. Production build (frontend)

```bash
cd lostlines-react
npm run build             # outputs to dist/
npm run preview           # serve the production build locally
```

---

## Environment Variables

Secrets exist only in the hosting environment / local `.env` files. **Never commit
real values.**

### Frontend (`lostlines-react/.env.example`)

```env
VITE_API_URL=http://localhost:5000
```

> ⚠️ `VITE_*` variables are baked into the frontend build and are visible in the
> browser. **Never** put `JWT_SECRET`, `MONGO_URI`, database passwords or private
> API keys in frontend environment variables.

Production example (set in the hosting dashboard, e.g. Vercel):

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
# Example: http://localhost:5173,https://yourdomain.com
CORS_ORIGINS=
```

| Variable       | Required | Purpose                                             |
|----------------|----------|-----------------------------------------------------|
| `MONGO_URI`    | ✅        | MongoDB Atlas connection string                     |
| `JWT_SECRET`   | ✅        | Secret used to sign/verify JWTs — use a long random value |
| `PORT`         | ✅        | Port the Express server listens on (hosts set this) |
| `CORS_ORIGINS` | optional | Comma-separated allowlist of frontend origins       |

---

## Production Deployment

Preferred setup — **Vercel** (frontend) + **Render** (backend) + **MongoDB Atlas**
(database).

### 1. Database — MongoDB Atlas

1. Create/use a cluster in [MongoDB Atlas](https://www.mongodb.com/atlas).
2. **Network Access** must allow the deployed backend to connect:
   - Add the hosting provider's outbound IP, **or**
   - Use `0.0.0.0/0` (allow all) only if you accept the risk and the cluster uses a
     strong database password.
3. Copy the connection string (e.g.
   `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/lostlines?retryWrites=true&w=majority`)
   — never commit it.

### 2. Backend — Render (or similar Node host)

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

   > Render provides the `PORT` that your app should bind; the backend already
   > reads `process.env.PORT`.

5. The backend fails-fast at startup if MongoDB is unreachable (no silent
   "healthy but broken" server).

### 3. Frontend — Vercel

1. On Vercel: **Add New → Project** → import the GitHub repo.
2. **Root Directory**: `lostlines-react`
3. Framework preset: Vite (auto-detected). `vercel.json` in `lostlines-react/`
   already sets the build command, output directory (`dist`) and an SPA rewrite
   so routes like `/dashboard` and `/profile` work after a browser refresh.
4. Add the frontend environment variable:

   ```env
   VITE_API_URL=https://<your-render-backend-url>
   ```

5. Deploy.

### SPA routing (why `/dashboard` won't 404)

The app uses React Router's `BrowserRouter` (client-side routing). When the browser
refreshes `/dashboard`, the static host receives a `GET /dashboard` request. The
`vercel.json` rewrite sends every path to `/index.html`, letting React Router re-render
the right page — no 404.

---

## API Overview

| Method | Endpoint             | Auth | Description           |
|--------|----------------------|------|-----------------------|
| POST   | `/auth/register`     | No   | Register a user       |
| POST   | `/auth/login`        | No   | Login, returns JWT    |
| GET    | `/users/profile`     | Yes  | Get own profile       |
| PUT    | `/users/profile`     | Yes  | Update name/email     |
| GET    | `/items`             | Yes  | List own items        |
| POST   | `/items`             | Yes  | Create item           |
| PUT    | `/items/:id`         | Yes  | Update item           |
| PUT    | `/items/recover/:id` | Yes  | Mark item recovered   |
| DELETE | `/items/:id`         | Yes  | Delete item           |
| GET    | `/`                  | No   | Health check          |

All protected endpoints expect `Authorization: Bearer <token>`.

---

## Security Notes

- `MONGO_URI` and `JWT_SECRET` exist **only** in the backend hosting environment.
- Frontend env vars contain only the public API URL (`VITE_API_URL`).
- `.env` files are git-ignored; `.env.example` files contain placeholders only.
- `CORS_ORIGINS` defaults to allow-all only in local development; set the allowlist
  in production.

## Features

- Register / Login / Logout with JWT
- Add lost/found items with category, priority and status
- Edit, recover and delete item records
- Search by name/location, filter by status, sort by newest/oldest
- Statistics dashboard, recent activity, CSV export, dark mode
- Profile management (name, email)
