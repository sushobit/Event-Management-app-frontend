
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Box, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff, AccountCircle, Lock } from '@mui/icons-material';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      if (password === 'pass') {
        setUser(username);
        navigate('/');
      } else {
        setError('Invalid credentials');
      }
      setLoading(false);
    }, 1000); // Simulate a 1-second delay
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Container
      component={motion.div}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      maxWidth={false}
      sx={{
        background: 'linear-gradient(135deg, #f5f5f5, #dcdcdc)',
        borderRadius: 2,
        p: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Adjust as needed
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          mt: 8,
          textAlign: 'center',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          background: 'linear-gradient(135deg, #f3f4f6 30%, #e3e4e8 100%)',
          filter: 'drop-shadow(1px 1px 20px #6c63ff)',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
          Login
        </Typography>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        <p style={{color:'gray'}}>Password is "pass"</p>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={loading}
          sx={{
            position: 'relative',
            mt: 2,
            width: '100%',
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          {loading && <CircularProgress size={24} sx={{ position: 'absolute', left: '50%', top: '50%', marginLeft: '-12px', marginTop: '-12px' }} />}
          Login
        </Button>
      </Box>    
      <div
        style={{
          position: 'absolute',
          width: '50px',
          height: '50px',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          left: cursorPosition.x,
          top: cursorPosition.y,
          transition: 'left 0.1s ease-out, top 0.1s ease-out',
        }}
      />
    </Container>
  );
};

export default Login;
