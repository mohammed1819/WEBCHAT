# PulseBridge

PulseBridge is a polished real-time chat application built with modern web technologies. It combines a React + Vite frontend with an Express + MongoDB backend, using Socket.IO for live messaging, online presence, and instant UI updates.

## Live Demo

- Frontend: https://pulsebridge-inky.vercel.app/
- Backend API: https://webchat-4fs4.onrender.com

## What I built

PulseBridge showcases a complete full-stack realtime messaging workflow:

- Secure authentication using JWT stored in cookies
- Real-time presence and chat via Socket.IO
- Persistent conversations in MongoDB
- Profile editing with status message and avatar uploads
- Live contact presence indicator and inbox search
- Deployment-ready app with separate Render backend and Vercel frontend

## Tech stack

- Frontend: React, Vite, Zustand, Tailwind CSS, DaisyUI, React Router
- Backend: Node.js, Express, MongoDB, Mongoose, Socket.IO
- Authentication: JWT + secure cookies
- Media storage: Cloudinary image uploads
- Deployment: Render (backend) + Vercel (frontend)

## Key skills demonstrated

- Full-stack application architecture
- Real-time websocket integration
- Authentication and session handling
- Cross-origin request support and cookie security
- Responsive UI and polished user flows
- Deployment and production configuration

## Local setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# update .env values before running
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Docker Compose

This project also includes Docker support with `docker-compose.yml` at the repo root and Dockerfiles in both `backend/` and `frontend/`.

```bash
docker compose up --build
```

This starts all three services together:
- `mongo` on host port `27017`
- `backend` on host port `5001`
- `frontend` on host port `3000`

The frontend container serves the built React app with Nginx and proxies `/api` and `/socket.io` requests to the backend container.

To stop and remove containers:

```bash
docker compose down
```

## Production build

### Frontend build

```bash
cd frontend
npm run build
```

### Backend start

```bash
cd backend
npm start
```

## Environment variables

The backend expects these values in `backend/.env`:

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CLIENT_URL` (frontend origin)

The frontend can use:

- `VITE_API_URL` (optional production API base)

## Notes

- The app is designed to be deployment friendly with Render and Vercel.
- The repo can be renamed to `pulse-bridge` for cleaner branding.
- Button loading states and socket reconnection handling are included for a smooth user experience.
