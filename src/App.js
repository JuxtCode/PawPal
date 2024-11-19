// App.js

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, Box } from '@mui/material';
import Dashboard from './pages/dashboard';
import MyDogs from './pages/MyDogs';
import Subscription from './pages/Subscription';
import Training from './pages/Training';
import Community from './pages/Community';
import Navbar from './navbar';

// Import Login, Signup, Bookings, and Vet Appointments pages
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Bookings from './pages/Bookings';
import VetAppointments from './pages/VetAppointments'; // Existing page

// Import new pages
import DogGrooming from './pages/DogGrooming';
import DogBoarding from './pages/DogBoarding';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4CAF50',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4CAF50',
    },
    background: {
      default: '#121212',
      paper: '#333333',
    },
  },
});

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const currentTheme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar toggleTheme={toggleTheme} />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/mydogs" element={<MyDogs />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/training" element={<Training />} />
            <Route path="/community" element={<Community />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/vetappointments" element={<VetAppointments />} /> {/* Existing route */}
            <Route path="/doggrooming" element={<DogGrooming />} /> {/* New route */}
            <Route path="/dogboarding" element={<DogBoarding />} /> {/* New route */}
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
