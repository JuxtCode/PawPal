import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, Fade } from '@mui/material';
import { keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const bounceAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Show the splash screen for 50 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);  // Make splash screen invisible after the timeout
      navigate('/'); // Navigate to the dashboard after the timeout
    }, 30000); // 30 seconds

    return () => clearTimeout(timer); // Cleanup timer when the component unmounts
  }, [navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#388E3C',
        color: '#ffffff',
        animation: `${fadeInAnimation} 1s ease-in-out`,
        opacity: isVisible ? 1 : 0, // Control visibility
        transition: 'opacity 2s ease', // Add smooth fade-out transition
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Pacifico", cursive',
          mb: 2,
          animation: `${bounceAnimation} 2s infinite ease-in-out`,
        }}
      >
        PawPal
      </Typography>
      <Fade in={isVisible} timeout={1000}>
        <CircularProgress
          size={70}
          thickness={5}
          sx={{
            color: '#ffffff',
            mb: 2,
          }}
        />
      </Fade>
      <Typography
        variant="body1"
        sx={{
          fontSize: '1.2rem',
          fontFamily: '"Roboto", sans-serif',
          mt: 2,
          animation: `${fadeInAnimation} 2s ease-in-out`,
          animationDelay: '0s',
          animationFillMode: 'both',
        }}
      >
        All-in-one dog care solution
      </Typography>
    </Box>
  );
};

export default SplashScreen;
