import React from 'react';
import { Button, TextField, Typography, Paper, Box } from '@mui/material';

const Signup = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      style={{ backgroundColor: '#f4f4f9' }}
    >
      <Paper elevation={3} style={{ padding: '30px', width: '400px' }}>
        <Typography variant="h4" align="center" style={{ marginBottom: '20px' }}>
          Sign Up
        </Typography>
        <TextField
          fullWidth
          label="Full Name"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '20px', padding: '10px 0' }}
        >
          Sign Up
        </Button>
        <Typography align="center" style={{ marginTop: '20px' }}>
          Already have an account? <a href="/login">Login</a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;
