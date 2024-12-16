import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { db } from "../firebase"; // Ensure this points to your Firebase configuration
import { collection, addDoc } from "firebase/firestore";

const DogBoarding = () => {
  const [formData, setFormData] = useState({
    userName: "",
    dogName: "",
    checkInDate: "",
    checkOutDate: "",
    additionalNotes: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.userName || !formData.dogName || !formData.checkInDate || !formData.checkOutDate) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      // Save the form data to the boarding collection in Firestore
      await addDoc(collection(db, "boarding"), {
        ...formData,
        createdAt: new Date().toISOString(),
      });

      alert("Boarding service booked successfully!");
      setFormData({
        userName: "",
        dogName: "",
        checkInDate: "",
        checkOutDate: "",
        additionalNotes: "",
      });
    } catch (error) {
      console.error("Error booking boarding service:", error);
      alert("Failed to book boarding service. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.pexels.com/photos/485294/pexels-photo-485294.jpeg?auto=compress&cs=tinysrgb&w=600')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: "600px",
          padding: "30px",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#34495e" }}
        >
          Dog Boarding Services
        </Typography>
        <Typography
          variant="body1"
          align="center"
          gutterBottom
          sx={{ color: "#7f8c8d" }}
        >
          Find a comfortable stay for your dog!
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
            label="Check-In Date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            label="Check-Out Date"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            label="Additional Notes"
            name="additionalNotes"
            value={formData.additionalNotes}
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
            Book Boarding Service
          </Button>
        </Box>
      </Paper>

      <Box sx={{ marginTop: "40px", width: "100%", maxWidth: "1200px" }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#ffffff" }}
        >
          Our Facilities
        </Typography>

        <Grid container spacing={4} sx={{ justifyContent: "center" }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: "12px", overflow: "hidden" }}>
              <CardMedia
                component="img"
                height="200"
                image="https://images.pexels.com/photos/16465602/pexels-photo-16465602/free-photo-of-saint-bernard-dog-in-shelter.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Boarding Facility 1"
              />
              <CardContent
                sx={{ textAlign: "center", backgroundColor: "#f4f4f4" }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#34495e" }}
                >
                  Luxury Boarding
                </Typography>
                <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
                  Comfortable stay with luxury accommodations for your furry
                  friends.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: "12px", overflow: "hidden" }}>
              <CardMedia
                component="img"
                height="200"
                image="https://images.pexels.com/photos/3111575/pexels-photo-3111575.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Boarding Facility 2"
              />
              <CardContent
                sx={{ textAlign: "center", backgroundColor: "#f4f4f4" }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#34495e" }}
                >
                  Standard Boarding
                </Typography>
                <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
                  Cozy rooms with the perfect setting for a restful stay.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: "12px", overflow: "hidden" }}>
              <CardMedia
                component="img"
                height="200"
                image="https://images.pexels.com/photos/19145877/pexels-photo-19145877/free-photo-of-a-dog-at-a-groomer.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Grooming Service"
              />
              <CardContent
                sx={{ textAlign: "center", backgroundColor: "#f4f4f4" }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#34495e" }}
                >
                  Grooming Services
                </Typography>
                <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
                  Pamper your dog with our professional grooming services.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DogBoarding;
