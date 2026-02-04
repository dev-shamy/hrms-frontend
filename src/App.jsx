import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';

import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" toastOptions={{ style: { transform: 'translateY(-50%)', top: '50%' }, }} reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />

          <Route path="/employees" element={
            <Layout>
              <Employees />
            </Layout>
          } />

          <Route path="/attendance" element={
            <Layout>
              <Attendance />
            </Layout>
          } />

          <Route path="*" element={
            <Layout>
              <NotFound />
            </Layout>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
