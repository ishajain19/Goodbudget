# Expense Tracker – Beautiful UI (MERN + Tailwind)

A full-stack MERN app to track income & expenses with CRUD, weekly/monthly analytics (Recharts), and Export-to-PDF. Now with a **modern Tailwind UI** (glassmorphism, stat cards, gradients, responsive layout).

## Stack
- React + Vite, Tailwind CSS, Recharts, Axios, react-hot-toast
- Node.js + Express
- MongoDB + Mongoose
- jsPDF + autotable (PDF export)

## Quick Start

### Backend
```bash
cd server
cp .env.example .env
npm install
npm run dev
```

### Frontend
```bash
cd client
cp .env.example .env
npm install
npm run dev
```

- API: http://localhost:5000
- App: http://localhost:5173

### Endpoints
- GET /api/transactions
- POST /api/transactions
- PUT /api/transactions/:id
- DELETE /api/transactions/:id
- GET /api/transactions/summary?period=weekly|monthly

_____________________________________________________________________________

Run it locally — line by line
0) Prereqs

Install Node.js 18+

Install MongoDB and start it (defaults to mongodb://127.0.0.1:27017)

1) Unzip + run backend
unzip expense-tracker-mern-beautiful.zip
cd expense-tracker-mern-beautiful/server
cp .env.example .env
npm install
npm run dev

2) Run frontend (in a second terminal)
cd expense-tracker-mern-beautiful/client
cp .env.example .env
npm install
npm run dev


API: http://localhost:5000

App: http://localhost:5173

If you need to change anything:

Backend: server/.env → PORT, CLIENT_ORIGIN, MONGO_URI

Frontend: client/.env → VITE_API_BASE