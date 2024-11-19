import React from "react";
import { Box, Typography, TextField, Button, Paper, Grid } from "@mui/material";

const DogGrooming = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundImage: "url('https://images.pexels.com/photos/1378849/pexels-photo-1378849.jpeg?auto=compress&cs=tinysrgb&w=600')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: "600px",
          padding: "30px",
          borderRadius: "12px",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Add slight opacity for readability
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#34495e" }}>
          Dog Grooming Services
        </Typography>
        <Typography variant="body1" align="center" gutterBottom sx={{ color: "#7f8c8d" }}>
          Book a grooming session for your furry friend!
        </Typography>
        <Box component="form" sx={{ marginTop: "20px" }}>
          <TextField
            label="Your Name"
            fullWidth
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            label="Dog's Name"
            fullWidth
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            label="Preferred Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            label="Special Requests"
            fullWidth
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              marginTop: "20px",
              padding: "10px 0",
              backgroundColor: "#4CAF50",
              color: "white",
              fontSize: "16px",
              textTransform: "none",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#45a049",
              },
            }}
          >
            Book Grooming Session
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default DogGrooming;
