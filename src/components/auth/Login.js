import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import SplashScreen from '../SplashScreen';
import { Link } from 'react-router-dom';
import { keyframes } from '@mui/system';

// Bounce animation
const bounceAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);

      setShowSplash(true);
      setTimeout(() => {
        setShowSplash(false);
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setLoading(false);
      setError('Login failed. Please check your credentials.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDirection="column"
      sx={{
        backgroundImage: 'url(https://images.pexels.com/photos/59523/pexels-photo-59523.jpeg?auto=compress&cs=tinysrgb&w=600)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <Typography
        variant="h2"
        align="center"
        sx={{
          mb: 5,
          fontFamily: '"Pacifico", cursive',
          fontWeight: 'bold',
          fontSize: '5rem',
          letterSpacing: '3px',
          color: '#4caf50',
          animation: `${bounceAnimation} 2s infinite ease-in-out`,
        }}
      >
        PawPal
      </Typography>

      <Paper elevation={3} sx={{ padding: 4, width: { xs: '90%', sm: '400px' } }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontFamily: '"Pacifico", cursive',
            color: '#1976d2',
            mb: 2,
          }}
        >
          Log In
        </Typography>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {error && (
          <Typography color="error" align="center" sx={{ marginTop: 1 }}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 3, padding: 1 }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        <Typography align="center" sx={{ marginTop: 2 }}>
          Don't have an account?{' '}
          <Link
            to="/signup"
            style={{
              textDecoration: 'none',
              color: '#1976d2',
              fontWeight: 'bold',
            }}
          >
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
