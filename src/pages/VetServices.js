import React, { useState } from "react";
import { Button, Paper, Typography, Modal, Box } from "@mui/material";
import { styled } from "@mui/system";
import { Calendar } from "react-calendar"; // Install react-calendar if not already done
import "react-calendar/dist/Calendar.css";

const VetServices = () => {
  const [openModal, setOpenModal] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    console.log("Selected Date:", selectedDate);
  };

  return (
    <div style={containerStyle}>
      <Paper style={paperStyle}>
        <Typography variant="h4" style={{ color: "#34495e", fontWeight: "bold" }}>
          Veterinary Services
        </Typography>
        <Typography variant="body1" style={{ color: "#7f8c8d", margin: "20px 0" }}>
          Manage appointments, receive reminders, and consult with a vet online.
        </Typography>

        {/* Calendar for Appointments */}
        <div style={{ margin: "20px 0" }}>
          <Typography variant="h6" style={{ color: "#34495e", marginBottom: "10px" }}>
            Book a Vet Appointment
          </Typography>
          <Calendar onChange={handleDateChange} value={date} />
          <Typography variant="body2" style={{ color: "#7f8c8d", marginTop: "10px" }}>
            Selected Date: {date.toDateString()}
          </Typography>
        </div>

        {/* Reminders Section */}
        <div style={{ margin: "20px 0" }}>
          <Typography variant="h6" style={{ color: "#34495e", marginBottom: "10px" }}>
            Reminders
          </Typography>
          <ul>
            <li>Upcoming vet visit: {new Date().toDateString()}</li>
            <li>Vaccination due next week</li>
          </ul>
        </div>

        {/* Video Consultation */}
        <div style={{ margin: "20px 0" }}>
          <Typography variant="h6" style={{ color: "#34495e", marginBottom: "10px" }}>
            Video Consultation
          </Typography>
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Start Video Consultation
          </Button>
        </div>
      </Paper>

      {/* Modal for Video Consultation */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" style={{ marginBottom: "20px" }}>
            Connecting to the vet...
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

// Styles
const containerStyle = {
  padding: "40px",
  backgroundColor: "#f7f9fa",
  minHeight: "100vh",
};

const paperStyle = {
  padding: "30px",
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

export default VetServices;
