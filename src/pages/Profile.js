import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Avatar, Button } from '@mui/material';
import { styled } from '@mui/system';
import { auth } from '../firebase'; // Import Firebase Authentication
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ProfileContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: 'url("https://images.pexels.com/photos/15356250/pexels-photo-15356250/free-photo-of-puppy-dachshund-playing-on-green-grass.jpeg?auto=compress&cs=tinysrgb&w=600")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}));

const AnimatedPaper = styled(Paper)(({ theme }) => ({
  padding: '30px',
  width: '80%',
  maxWidth: '500px',
  textAlign: 'center',
  animation: 'fadeIn 0.8s ease-in-out',
  '@keyframes fadeIn': {
    '0%': { opacity: 0, transform: 'translateY(-10px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
}));

const Profile = () => {
  const [user, setUser] = useState(null); // State to store user details
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the logged-in user
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Logout function
  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <ProfileContainer>
      <AnimatedPaper elevation={3}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            marginBottom: '20px',
            backgroundColor: '#4CAF50',
          }}
        >
          {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
        </Avatar>
        <Typography variant="h5" gutterBottom>
          {user?.displayName || 'User Name'} {/* Display name from Firebase */}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {user?.email || 'user@example.com'} {/* Display email from Firebase */}
        </Typography>

        {/* Button Group: Edit Profile and Logout */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/EditProfile')}
            sx={{
              width: '200px', // Set fixed width for the Edit Profile button
              padding: '10px 20px',
              alignSelf: 'center', // Center the button horizontally
            }}
          >
            Edit Profile
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleLogout}
            sx={{
              width: '200px', // Set fixed width for the Logout button
              padding: '5px 15px', // Smaller padding for a smaller button
              fontSize: '0.875rem', // Slightly smaller font size
              alignSelf: 'center', // Center the button horizontally
            }}
          >
            Logout
          </Button>
        </Box>
      </AnimatedPaper>
    </ProfileContainer>
  );
};

export default Profile;
