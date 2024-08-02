
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import EventList from './components/EventList';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(() => sessionStorage.getItem('user') || '');

  
  useEffect(() => {
    if (user) {
      sessionStorage.setItem('user', user);
    } else {
      sessionStorage.removeItem('user');
    }
  }, [user]);

  const handleLogout = () => {
    setUser('');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
        />
        <Route
          path="/"
          element={user ? <EventList user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
