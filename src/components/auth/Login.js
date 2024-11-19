import React from 'react';
import { Button, TextField, Typography, Paper, Box } from '@mui/material';

const Login = () => {
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
          Login
        </Typography>
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
          Login
        </Button>
        <Typography align="center" style={{ marginTop: '20px' }}>
          Don't have an account? <a href="/signup">Sign up</a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
