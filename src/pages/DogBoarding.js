import React from "react";
import { Box, Typography, TextField, Button, Paper, Grid, Card, CardMedia, CardContent } from "@mui/material";

const DogBoarding = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        minHeight: "100vh",
        backgroundImage: "url('https://images.pexels.com/photos/485294/pexels-photo-485294.jpeg?auto=compress&cs=tinysrgb&w=600')",  // Background Image URL
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
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#34495e" }}>
          Dog Boarding Services
        </Typography>
        <Typography variant="body1" align="center" gutterBottom sx={{ color: "#7f8c8d" }}>
          Find a comfortable stay for your dog!
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
            label="Check-In Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            label="Check-Out Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            label="Additional Notes"
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

      {/* Showcase Section for Boarding Facilities and Grooming Services */}
      <Box sx={{ marginTop: "40px", width: "100%", maxWidth: "1200px" }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#ffffff" }}>
          Our Facilities
        </Typography>

        <Grid container spacing={4} sx={{ justifyContent: "center" }}>
          {/* Example Boarding Image 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: "12px", overflow: "hidden" }}>
              <CardMedia
                component="img"
                height="200"
                image="https://images.pexels.com/photos/16465602/pexels-photo-16465602/free-photo-of-saint-bernard-dog-in-shelter.jpeg?auto=compress&cs=tinysrgb&w=600"  // Replace with actual image URL
                alt="Boarding Facility 1"
              />
              <CardContent sx={{ textAlign: "center", backgroundColor: "#f4f4f4" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#34495e" }}>
                  Luxury Boarding
                </Typography>
                <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
                  Comfortable stay with luxury accommodations for your furry friends.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Example Boarding Image 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: "12px", overflow: "hidden" }}>
              <CardMedia
                component="img"
                height="200"
                image="https://images.pexels.com/photos/3111575/pexels-photo-3111575.jpeg?auto=compress&cs=tinysrgb&w=600"  // Replace with actual image URL
                alt="Boarding Facility 2"
              />
              <CardContent sx={{ textAlign: "center", backgroundColor: "#f4f4f4" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#34495e" }}>
                  Standard Boarding
                </Typography>
                <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
                  Cozy rooms with the perfect setting for a restful stay.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Example Grooming Service Image */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: "12px", overflow: "hidden" }}>
              <CardMedia
                component="img"
                height="200"
                image="https://images.pexels.com/photos/19145877/pexels-photo-19145877/free-photo-of-a-dog-at-a-groomer.jpeg?auto=compress&cs=tinysrgb&w=600"  // Replace with actual image URL
                alt="Grooming Service"
              />
              <CardContent sx={{ textAlign: "center", backgroundColor: "#f4f4f4" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#34495e" }}>
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
