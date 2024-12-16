import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Badge } from '@mui/material';
import { AccountCircle, Notifications } from '@mui/icons-material';

const Navbar = ({ toggleTheme }) => {
  const location = useLocation(); // To get the current path
  const [isActive, setIsActive] = useState(false); // State for toggle effect

  // Function to check if the button is active
  const checkIsActive = (path) => location.pathname === path;

  // Reset notification icon color when navigating away from the notifications page
  useEffect(() => {
    if (location.pathname !== '/notifications') {
      setIsActive(false); // Reset the icon color if not on the notifications page
    }
  }, [location]);

  // Toggle notification icon color when clicked
  const toggleNotificationColor = () => {
    setIsActive(!isActive);
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontFamily: '"Pacifico", cursive',
            background: 'linear-gradient(to right, #ffffff, #4CAF50)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: 'bold',
          }}
        >
          PawPal
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            sx={{
              color: checkIsActive('/') ? '#ffffff' : 'inherit',
            }}
            component={Link}
            to="/"
          >
            Dashboard
          </Button>
          <Button
            sx={{
              color: checkIsActive('/mydogs') ? '#ffffff' : 'inherit',
            }}
            component={Link}
            to="/mydogs"
          >
            My Dogs
          </Button>
          <Button
            sx={{
              color: checkIsActive('/subscription') ? '#ffffff' : 'inherit',
            }}
            component={Link}
            to="/subscription"
          >
            Subscription
          </Button>
          <Button
            sx={{
              color: checkIsActive('/training') ? '#ffffff' : 'inherit',
            }}
            component={Link}
            to="/training"
          >
            Training
          </Button>
          <Button
            sx={{
              color: checkIsActive('/community') ? '#ffffff' : 'inherit',
            }}
            component={Link}
            to="/community"
          >
            Community
          </Button>
          <Button
            sx={{
              color: checkIsActive('/bookings') ? '#ffffff' : 'inherit',
            }}
            component={Link}
            to="/bookings"
          >
            Bookings
          </Button>
          <IconButton
            color={isActive ? 'secondary' : 'inherit'} // Change color when active
            component={Link}
            to="/notifications"
            onClick={toggleNotificationColor} // Toggle color on click
            sx={{
              fontSize: 28, // Adjust icon size
              color: isActive ? '#ffffff' : '#000000', // Active color is white, inactive is black
            }}
          >
            <Badge color="secondary" badgeContent={4}>
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton
            color="inherit"
            component={Link}
            to="/profile"
          >
            <AccountCircle fontSize="large" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
