import React, { useState } from 'react';
import { TextField, Typography, Paper, Box, Button, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { keyframes } from '@mui/system';

// Bouncing animation keyframes
const bounceAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // For loading indicator
  const [showPassword, setShowPassword] = useState(false); // To toggle password visibility
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError('');
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile and save details in Firestore
      await updateProfile(user, {
        displayName: fullName,
      });
      await setDoc(doc(db, 'users', user.uid), {
        fullName: fullName,
        email: email,
        createdAt: new Date(),
      });

      // Navigate to the dashboard
      setTimeout(() => navigate('/dashboard'), 0);
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        backgroundImage: 'url(https://images.pexels.com/photos/931948/pexels-photo-931948.jpeg?auto=compress&cs=tinysrgb&w=600)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
      }}
    >
      {/* PawPal Text with Bouncing Animation */}
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

      <Paper
        elevation={4}
        sx={{
          padding: '30px',
          width: { xs: '90%', sm: '400px' },
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '8px',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontFamily: '"Pacifico", cursive',
            color: '#1976d2',
            mb: 2,
          }}
        >
          Sign Up
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
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
          type={showPassword ? 'text' : 'password'} // Toggle between text and password
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
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            marginTop: '20px',
            padding: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            textTransform: 'none',
            borderRadius: '4px',
          }}
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
        </Button>
        <Typography align="center" sx={{ marginTop: '20px', fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <Link
            to="/login"
            style={{
              textDecoration: 'none',
              color: '#1976d2',
              fontWeight: 'bold',
            }}
          >
            Log in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;
