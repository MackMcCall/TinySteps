# 👣 TinySteps - Baby Milestone Tracker

A full-stack web app that lets you track your baby's milestones. Built with React, Node.js/Express, and PostgreSQL.

---

## Features

- **Add milestones** with a name, kid's name, and date
- **View all milestones** or filter by kid
- **Edit and delete** milestones (full CRUD)
- **Google OAuth login** so only you can access your data
- **Baby news feed** powered by NewsAPI
- **Responsive design** so it works on mobile and desktop

---

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **Auth:** Google OAuth 2.0 via Passport.js
- **External API:** NewsAPI (baby/parenting news)

---

## API Routes

| Method | Route                        | Description               |
|--------|------------------------------|---------------------------|
| GET    | /milestones                  | Get all milestones        |
| GET    | /milestones/:id              | Get one milestone by ID   |
| GET    | /milestones/kid/:kidName     | Get milestones for a kid  |
| POST   | /milestones                  | Create a new milestone    |
| PUT    | /milestones/:id              | Update a milestone        |
| DELETE | /milestones/:id              | Delete a milestone        |
| GET    | /news                        | Get baby news articles    |
| GET    | /auth/google                 | Start Google OAuth login  |
| GET    | /auth/google/callback        | Google OAuth callback     |
| GET    | /auth/me                     | Get current user session  |
| POST   | /auth/logout                 | Log out                   |

---

## Setup Instructions

### 1. Create the database

```bash
psql -U your_username -d your_database -f setup.sql
```

### 2. Configure backend environment variables

Edit `express-backend/.env`:

```
DATABASE_URL=your_postgres_connection_string
clientID=your_google_client_id
clientSecret=your_google_client_secret
CLIENT_BASE_URL=http://localhost:5173
NEWS_API_KEY=your_newsapi_key
PORT=3000
```

- Get Google OAuth credentials at: https://console.cloud.google.com
- Get a free NewsAPI key at: https://newsapi.org

### 3. Configure frontend environment variables

Edit `react-frontend-client/.env`:

```
VITE_API_URL=http://localhost:3000
```

### 4. Install dependencies and run

**Backend:**
```bash
cd express-backend
npm install
node server.js
```

**Frontend:**
```bash
cd react-frontend-client
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.
