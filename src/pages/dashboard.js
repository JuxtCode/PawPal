import React from "react";
import { Button, Grid, Typography, Paper, Card, CardContent, Box } from "@mui/material";
import { styled } from "@mui/system";
import { FaClinicMedical, FaBath, FaHome, FaDog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleVetAppointment = () => {
    navigate("/vetappointments");
  };

  const handleDogGrooming = () => {
    navigate("/doggrooming");
  };

  const handleDogBoarding = () => {
    navigate("/dogboarding");
  };

  return (
    <div style={dashboardContainerStyle}>
      {/* Background Video */}
      <div style={videoWrapperStyle}>
        <video autoPlay loop muted style={videoStyle}>
          <source src="https://videos.pexels.com/video-files/1182756/1182756-sd_640_360_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Main Content */}
      <div style={contentStyle}>
        <Paper elevation={3} style={welcomePaperStyle}>
          <Typography variant="h3" style={{ color: "#34495e", fontWeight: "bold" }}>
            Welcome to PawPal
          </Typography>
          <Typography variant="h6" style={{ color: "#7f8c8d", marginTop: "10px" }}>
            Your one-stop solution for managing your dog's needs!
          </Typography>
        </Paper>

        {/* Quick Links */}
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "40px" }}>
                  <FaDog color="#4CAF50" />
                </Box>
                <Typography variant="h6" align="center" style={{ color: "#34495e", fontWeight: "bold", marginTop: "15px" }}>
                  My Dogs
                </Typography>
                <Button variant="contained" color="primary" fullWidth style={cardButtonStyle}>
                  View Dogs
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "40px" }}>
                  <FaClinicMedical color="#4CAF50" />
                </Box>
                <Typography variant="h6" align="center" style={{ color: "#34495e", fontWeight: "bold", marginTop: "15px" }}>
                  Veterinary Services
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={cardButtonStyle}
                  onClick={handleVetAppointment}
                >
                  Book Vet Appointment
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "40px" }}>
                  <FaBath color="#4CAF50" />
                </Box>
                <Typography variant="h6" align="center" style={{ color: "#34495e", fontWeight: "bold", marginTop: "15px" }}>
                  Dog Grooming
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={cardButtonStyle}
                  onClick={handleDogGrooming}
                >
                  Groom Your Dog
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "40px" }}>
                  <FaHome color="#4CAF50" />
                </Box>
                <Typography variant="h6" align="center" style={{ color: "#34495e", fontWeight: "bold", marginTop: "15px" }}>
                  Dog Boarding
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={cardButtonStyle}
                  onClick={handleDogBoarding}
                >
                  Find Boarding
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>

        {/* New Features Section */}
        <Box sx={{ marginTop: "40px", padding: "20px", backgroundColor: "#", borderRadius: "12px" }}>
          <Typography variant="h4" align="center" gutterBottom style={{ color: "#Ffffff", fontFamily: "'Roboto', sans-serif", fontWeight: "bold", fontStyle: "italic" }}>
            Why Choose PawPal?
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Paper elevation={2} style={featurePaperStyle}>
                <Typography variant="h6" style={{ color: "#34495e", fontWeight: "bold" }}>
                  Personalized Care
                </Typography>
                <Typography variant="body2" style={{ color: "#7f8c8d" }}>
                  Tailored solutions for your dog's unique needs.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper elevation={2} style={featurePaperStyle}>
                <Typography variant="h6" style={{ color: "#34495e", fontWeight: "bold" }}>
                  Expert Professionals
                </Typography>
                <Typography variant="body2" style={{ color: "#7f8c8d" }}>
                  Access certified trainers and veterinarians.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper elevation={2} style={featurePaperStyle}>
                <Typography variant="h6" style={{ color: "#34495e", fontWeight: "bold" }}>
                  Community Support
                </Typography>
                <Typography variant="body2" style={{ color: "#7f8c8d" }}>
                  Join a community of dog lovers and share experiences.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

// Styled Components and Styles
const StyledCard = styled(Card)({
  borderRadius: "12px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
});

const dashboardContainerStyle = {
  position: "relative",
  height: "100vh",
  width: "100%",
  overflow: "hidden",
};

const videoWrapperStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  zIndex: -1,
};

const videoStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const contentStyle = {
  position: "relative",
  zIndex: 1,
  padding: "40px 20px",
};

const welcomePaperStyle = {
  padding: "30px",
  textAlign: "center",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  marginBottom: "40px",
};

const cardButtonStyle = {
  marginTop: "15px",
  padding: "12px 0",
  backgroundColor: "#4CAF50",
  color: "white",
  fontSize: "16px",
  textTransform: "none",
  borderRadius: "8px",
};

const featurePaperStyle = {
  padding: "20px",
  textAlign: "center",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: "12px",
};

export default Dashboard;
