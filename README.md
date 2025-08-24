# Expense Tracker(MERN + Tailwind)

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

