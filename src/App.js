import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, Box } from '@mui/material';
import Dashboard from './pages/dashboard';
import MyDogs from './pages/MyDogs';
import Subscription from './pages/Subscription';
import Training from './pages/Training';
import Community from './pages/Community';
import Navbar from './navbar';
import Profile from './pages/Profile';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Bookings from './pages/Bookings';
import VetAppointments from './pages/VetAppointments';
import DogGrooming from './pages/DogGrooming';
import EditProfile from './pages/EditProfile'; // Import EditProfile
import DogBoarding from './pages/DogBoarding';
import DogsPage from './pages/DogsPage';
import Notifications from './pages/Notification';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        if (window.location.pathname === '/signup') {
          navigate('/dashboard', { replace: true });
        }
      } else {
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const currentTheme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {isAuthenticated && <Navbar />}
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {isAuthenticated ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/mydogs" element={<MyDogs />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/training" element={<Training />} />
                <Route path="/community" element={<Community />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/vetappointments" element={<VetAppointments />} />
                <Route path="/doggrooming" element={<DogGrooming />} />
                <Route path="/dogboarding" element={<DogBoarding />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/EditProfile" element={<EditProfile />} /> {/* Add this */}
                <Route path="/DogsPage" element={<DogsPage/>} />
                <Route path="/Notification" element={<Notifications />} />
              </>
            ) : (
              <Route path="*" element={<Login />} />
            )}
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
