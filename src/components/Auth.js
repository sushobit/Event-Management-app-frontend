
import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = () => {
    axios.post('https://event-management-app-backend-1ub1.onrender.com/users/login', { username, password })
      .then(response => setToken(response.data.token))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {token && <p>Logged in! Token: {token}</p>}
    </div>
  );
};

export default Auth;
