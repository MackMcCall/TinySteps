# 👣 TinySteps - Baby Milestone Tracker

A full-stack web app for tracking your baby's milestones. Built with React, Node.js/Express, and PostgreSQL.

🔗 **Live App:** [https://tinysteps-backend-vdgf.onrender.com](https://tinysteps-backend-vdgf.onrender.com)

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
- **Deployment:** Render

---

## API Routes

| Method | Route                    | Description              |
| ------ | ------------------------ | ------------------------ |
| GET    | /milestones              | Get all milestones       |
| GET    | /milestones/:id          | Get one milestone by ID  |
| GET    | /milestones/kid/:kidName | Get milestones for a kid |
| POST   | /milestones              | Create a new milestone   |
| PUT    | /milestones/:id          | Update a milestone       |
| DELETE | /milestones/:id          | Delete a milestone       |
| GET    | /news                    | Get baby news articles   |
| GET    | /auth/google             | Start Google OAuth login |
| GET    | /auth/google/callback    | Google OAuth callback    |
| GET    | /auth/me                 | Get current user session |
| POST   | /auth/logout             | Log out                  |

---

## Reflection

### Design Choices

I chose React for the frontend because I have had prior experience with MVC frameworks and therefore wanted to get better with React.
For the backend I went with Node.js and Express.
For authentication I used Google OAuth.

### Challenges

The biggest challenge was definitely getting everything hosted. I went down a rabbit hole of trying to host the backend and the fronend seperately, which led to issues with cookies and cors. I abandoned that route and just got both the backend and the frontend through the same domain.

### Learning Outcomes

This project taught me a lot about how full-stack apps actually fit together beyond just writing the code. Deployment introduced a whole layer of complexity that doesn't exist in local development — environment variables, CORS, cookie security, and how platforms like Render work. I learned that things that work perfectly on localhost can break in production for reasons that have nothing to do with your code being wrong.

I also got a much better understanding of how OAuth works end-to-end, how session cookies are managed across requests, and why same-origin policy exists in the first place. The debugging process of tracing a request through the Network tab, checking response headers, and reading server logs was valuable.

### Future Work

- **Multiple users/families** — right now the app shows all milestones to any logged in user. A real version would scope milestones to the logged in family so different users only see their own data.
- **Milestone categories** — being able to tag milestones (first words, motor skills, social, etc.) and filter by category.
- **Timeline view** — a visual timeline instead of just a list/table would be a nicer way to see a kid's milestones at a glance.
- **Production session store** — replace the in-memory session store with `connect-pg-simple` so sessions persist properly across server restarts.
