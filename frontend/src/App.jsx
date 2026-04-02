import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import AdminDashboard from "./pages/AdminDashboard";
import Event from './Pages/Event'
import Authentication from './Pages/Authentication'
import Payment from './Pages/Payment'
 

// Create a ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user'); 
  
  return isAuthenticated ? children : <Navigate to="/authentication" replace />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/" element={<Home />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/event" 
        element={
          <ProtectedRoute>
            <Event />
          </ProtectedRoute>
        } 
      />
      <Route path="/authentication" element={<Authentication />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
   
  )
}

export default App