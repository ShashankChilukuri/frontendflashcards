import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Flashcards from './Home';
import Dashboard from './Dashboard';
import AdminLogin from './AdminLogin';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true); // Set authentication status to true
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Set authentication status to false
  };

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Flashcards />} />
        <Route path="/login" element={<AdminLogin onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard onLogout={handleLogout} />} />} />
      </Routes>
    </Router>
  );
};

export default App;
