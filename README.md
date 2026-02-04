# HRMS Lite - Frontend

This is the frontend for the Human Resource Management System (HRMS) built with React, Vite, and Tailwind CSS. It provides a responsive interface for managing employees and tracking attendance.

## Features

- **Dynamic Dashboard**: Summary of key HR metrics.
- **Employee Management**: Add, view, edit, and delete employee records.
- **Attendance Interface**: Quick marking of daily attendance and viewing records.
- **Real-time Notifications**: Feedback via React Hot Toast.

##  Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API
- **Routing**: React Router v7
- **API Client**: Axios

## Getting Started

### Prerequisites

- Node.js 18+
- npm 

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the `frontend` root:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```

4. Run Development Server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

## Project Structure

```text
frontend/
├── src/
│   ├── components/     # Reusable UI components (common, layout, admin, attendance)
│   ├── context/        # React Context providers (Auth, etc.)
│   ├── pages/          # Main page components
│   ├── services/       # API integration layers
│   ├── utils/          # Helper functions and formatting
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Entry point
├── public/             # Static assets
└── index.html          # HTML template
```

## Design Principles

- **Inter Font**: Uses the Inter font family for high legibility.
- **Glassmorphism**: Subtle effects for a modern look.
- **Responsive**: Fully optimized for mobile, tablet, and desktop.
