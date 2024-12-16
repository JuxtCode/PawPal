import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { db } from "../firebase"; // Ensure this points to your Firebase configuration
import { collection, addDoc } from "firebase/firestore";

const DogGrooming = () => {
  const [formData, setFormData] = useState({
    userName: "",
    dogName: "",
    preferredDate: "",
    specialRequests: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.userName || !formData.dogName || !formData.preferredDate) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      // Save the form data to the grooming collection in Firestore
      await addDoc(collection(db, "grooming"), {
        ...formData,
        createdAt: new Date().toISOString(),
      });

      alert("Grooming session booked successfully!");
      setFormData({
        userName: "",
        dogName: "",
        preferredDate: "",
        specialRequests: "",
      });
    } catch (error) {
      console.error("Error booking grooming session:", error);
      alert("Failed to book grooming session. Please try again.");
    }
  };

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
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#34495e" }}>
          Dog Grooming Services
        </Typography>
        <Typography variant="body1" align="center" gutterBottom sx={{ color: "#7f8c8d" }}>
          Book a grooming session for your furry friend!
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: "20px" }}>
          <TextField
            label="Your Name"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            label="Dog's Name"
            name="dogName"
            value={formData.dogName}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            label="Preferred Date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            label="Special Requests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
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
