import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Layout from './Pages/Layout';
import Home from './Pages/Home';
import TouristAtractions from './Pages/TouristAtractions';
import Hotels from './Pages/Hotels';
import Login from './Pages/Login';
import About from './Pages/About';

function App() {
  const [user, setUser] = useState(null);

  // Check localStorage for a user ID or token to determine if the user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set the user state
    }
  }, []);

  const handleUserLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
  };

  const handleUserLogout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Clear user data from localStorage
  };

  return (
    <Router>
      <Routes>
        {
          user ? (
            <Route path="/" element={<Layout onLogout={handleUserLogout} />}>
              <Route index element={<Home />} />
              <Route path="/tourist-atractions" element={<TouristAtractions />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/about" element={<About />} />
            </Route>
          ) : (
            // Redirect to login if the user is not logged in
            <Route path="/" element={<Login setUser={handleUserLogin} />} />
          )
        }
        {
          // Catch-all route to redirect to login if a user tries to access a restricted path without logging in
          !user && (
            <Route path="*" element={<Navigate to="/" replace />} />
          )
        }
      </Routes>
    </Router>
  );
}

export default App;
