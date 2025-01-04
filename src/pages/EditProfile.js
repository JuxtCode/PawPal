import React, { useState } from 'react';
import { TextField, Button, Paper, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase'; // Ensure correct imports for Firebase
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const EditProfile = () => {
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Handle save changes
  const handleSaveChanges = async () => {
    if (!auth.currentUser) return;

    setLoading(true);
    setError(null);

    // Password validation
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }

    try {
      // Re-authenticate the user to ensure the old password is correct
      const credential = EmailAuthProvider.credential(auth.currentUser.email, oldPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Update display name in Firebase Authentication
      if (username) {
        await updateProfile(auth.currentUser, { displayName: username });

        // Optionally update the username in the Firestore database
        const userDoc = doc(db, 'profiles', auth.currentUser.uid);
        await updateDoc(userDoc, { displayName: username });
      }

      // Update password in Firebase Authentication
      if (newPassword) {
        await updatePassword(auth.currentUser, newPassword);
      }

      alert('Profile updated successfully!');
      navigate('/profile'); // Redirect to the Profile page
    } catch (err) {
      console.error('Error updating profile:', err);

      // Detailed error handling
      if (err.code === 'auth/wrong-password') {
        setError('The old password you entered is incorrect.');
      } else if (err.code === 'auth/weak-password') {
        setError('The new password is too weak. Please choose a stronger password.');
      } else if (err.code === 'auth/requires-recent-login') {
        setError('Please log in again to update your password.');
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: 'url("https://images.pexels.com/photos/29668631/pexels-photo-29668631/free-photo-of-cute-brown-dog-relaxing-in-green-field-outdoors.jpeg?auto=compress&cs=tinysrgb&w=600")',
        backgroundSize: 'cover',
      }}
    >
      <Paper elevation={3} sx={{ padding: '20px', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Edit Profile
        </Typography>

        {/* Username field */}
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ marginBottom: '20px' }}
        />

        {/* Old Password field with visibility toggle */}
        <TextField
          label="Old Password"
          variant="outlined"
          fullWidth
          type={showOldPassword ? 'text' : 'password'}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          sx={{ marginBottom: '20px' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowOldPassword(!showOldPassword)}>
                  {showOldPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* New Password field with visibility toggle */}
        <TextField
          label="New Password"
          variant="outlined"
          fullWidth
          type={showNewPassword ? 'text' : 'password'}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ marginBottom: '20px' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowNewPassword(!showNewPassword)}>
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Confirm New Password field with visibility toggle */}
        <TextField
          label="Confirm New Password"
          variant="outlined"
          fullWidth
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ marginBottom: '20px' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Error message */}
        {error && <Typography color="error">{error}</Typography>}

        {/* Save changes button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSaveChanges}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>

        {/* Cancel button */}
        <Button
          variant="text"
          color="secondary"
          fullWidth
          onClick={() => navigate('/profile')}
          sx={{ marginTop: '10px' }}
        >
          Cancel
        </Button>
      </Paper>
    </Box>
  );
};

export default EditProfile;
