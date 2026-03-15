# DMTshow — Comedy Collab

A registration landing page for **DMTshow**, a comedy talent show. Built with React, styled-components, framer-motion, and an Express backend.

![DMTshow UI](https://github.com/user-attachments/assets/473e23fc-27e5-4092-97dc-774088846960)

## Features

- Animated spotlight effects and microphone SVG
- Live participant counter fetched from the backend
- Registration form modal (full name, age, city, phone)
- Admin panel with password login and participant list with a reload button

## Tech Stack

- **Frontend**: React 19 + Vite, styled-components, framer-motion, axios
- **Backend**: Node.js + Express
- **Font**: [Montserrat](https://fonts.google.com/specimen/Montserrat) (700, 900)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the API server

```bash
ADMIN_PASSWORD=your_secure_password npm run server
```

> The server runs on port `3001` by default (configurable via `PORT` env variable).  
> **Important**: Always set `ADMIN_PASSWORD` in production. Without it, a development-only default is used.

### 3. Start the frontend dev server

```bash
npm run dev
```

The Vite dev server proxies all `/api` requests to the backend server on port 3001.

### 4. Build for production

```bash
npm run build
```

## Environment Variables

| Variable         | Description                              | Default            |
|------------------|------------------------------------------|--------------------|
| `ADMIN_PASSWORD` | Password for the admin panel             | `dmtshow_admin_dev` (dev only) |
| `PORT`           | Port for the Express API server          | `3001`             |

> ⚠️ **Note**: The backend uses in-memory storage. All registration data is lost on server restart. For production, integrate a persistent database.
