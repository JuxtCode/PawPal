import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();  // To get the current path

  // Handlers for showing and hiding the dropdown menu
  const handleMouseEnter = () => setIsMenuOpen(true);
  const handleMouseLeave = () => setIsMenuOpen(false);

  // Function to check if the button is active
  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontFamily: '"Pacifico", cursive',  // Custom font for logo style
            background: 'linear-gradient(to right, #ffffff, #4CAF50)',  // Gradient from white to a greenish color
            WebkitBackgroundClip: 'text',  // Make the gradient apply to text only
            color: 'transparent',  // Make the text transparent to show gradient
            fontWeight: 'bold',  // Add some weight to make it stand out
          }}
        >
          PawPal
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            color={isActive('/') ? 'secondary' : 'inherit'}
            component={Link}
            to="/"
            sx={{
              color: isActive('/') ? '#ffffff' : '',  // Active button color
            }}
          >
            Dashboard
          </Button>
          <Button
            color={isActive('/mydogs') ? 'secondary' : 'inherit'}
            component={Link}
            to="/mydogs"
            sx={{
              color: isActive('/mydogs') ? '#ffffff' : '',  // Active button color
            }}
          >
            My Dogs
          </Button>
          <Button
            color={isActive('/subscription') ? 'secondary' : 'inherit'}
            component={Link}
            to="/subscription"
            sx={{
              color: isActive('/subscription') ? '#ffffff' : '',  // Active button color
            }}
          >
            Subscription
          </Button>
          <Button
            color={isActive('/training') ? 'secondary' : 'inherit'}
            component={Link}
            to="/training"
            sx={{
              color: isActive('/training') ? '#ffffff' : '',  // Active button color
            }}
          >
            Training
          </Button>
          <Button
            color={isActive('/community') ? 'secondary' : 'inherit'}
            component={Link}
            to="/community"
            sx={{
              color: isActive('/community') ? '#ffffff' : '',  // Active button color
            }}
          >
            Community
          </Button>
          <Button
            color={isActive('/bookings') ? 'secondary' : 'inherit'}
            component={Link}
            to="/bookings"
            sx={{
              color: isActive('/bookings') ? '#ffffff' : '',  // Active button color
            }}
          >
            Bookings
          </Button>

          {/* Membership dropdown menu */}
          <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{ position: 'relative', display: 'inline-block' }}
          >
            <Button color="inherit">Membership</Button>
            <Box
              sx={{
                position: 'absolute',
                top: '100%',
                left: '50%', // Center horizontally
                transform: 'translateX(-50%)', // Center adjustment
                backgroundColor: '#4CAF50',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                display: isMenuOpen ? 'flex' : 'none',
                flexDirection: 'column', // Stack buttons vertically
                gap: '10px',
                padding: '10px',
                zIndex: 10,
                alignItems: 'center', // Center items inside
              }}
            >
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: 'white',
                  textTransform: 'none',
                  padding: '5px 20px',
                  fontSize: '1rem',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  backgroundColor: '#4CAF50',
                  '&:hover': {
                    backgroundColor: '#ffffff',
                    color: '#4CAF50',
                    transform: 'scale(1.1)', // Grow effect
                  },
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                sx={{
                  color: 'white',
                  textTransform: 'none',
                  padding: '5px 20px',
                  fontSize: '1rem',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  backgroundColor: '#4CAF50',
                  '&:hover': {
                    backgroundColor: '#ffffff',
                    color: '#4CAF50',
                    transform: 'scale(1.1)', // Grow effect
                  },
                }}
              >
                Signup
              </Button>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
