import React, { useState } from "react";
import { Typography, Button, Paper, Box } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// Helper function to send a reminder
const sendReminder = (appointmentDate) => {
  const reminderTime = new Date(appointmentDate);
  reminderTime.setHours(reminderTime.getHours() - 1); // Reminder 1 hour before the appointment
  
  const reminderMessage = `Reminder: Your appointment is scheduled for ${appointmentDate.toLocaleDateString()} at ${appointmentDate.toLocaleTimeString()}`;
  
  // Reminder simulation (could be replaced with real notification system)
  setTimeout(() => {
    alert(reminderMessage);
  }, reminderTime - new Date());
};

const VetAppointments = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const handleBookAppointment = () => {
    if (selectedDateTime) {
      // Simulate sending a reminder
      sendReminder(selectedDateTime);

      alert(`Appointment booked for ${selectedDateTime.toLocaleDateString()} at ${selectedDateTime.toLocaleTimeString()}`);
    } else {
      alert("Please select a date and time before booking.");
    }
  };

  const handleStartVideoConsultation = () => {
    // This can be replaced with an actual video consultation link (e.g., Zoom/Meet)
    alert("Starting video consultation...");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={pageStyle}>
        <Paper elevation={3} sx={{ p: 4, textAlign: "center", background: "rgba(255, 255, 255, 0.7)" }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Veterinary Services
          </Typography>
          
          {/* DateTimePicker for selecting both date and time */}
          <DateTimePicker
            label="Appointment Date and Time"
            value={selectedDateTime}
            onChange={(newDateTime) => setSelectedDateTime(newDateTime)}
            renderInput={(params) => (
              <input
                {...params}
                placeholder="Appointment Date and Time"
                style={{ width: "100%", padding: "10px", fontSize: "14px", textAlign: "center" }} // Style the input box
              />
            )}
          />
          
          <Box sx={{ mt: 4 }}>
            {/* Button to book appointment */}
            <Button variant="contained" color="primary" onClick={handleBookAppointment}>
              Book Appointment
            </Button>
          </Box>

          {/* Button for video consultation */}
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="secondary" onClick={handleStartVideoConsultation}>
              Start Video Consultation
            </Button>
          </Box>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};

// Page background style with the provided image
const pageStyle = {
  padding: "30px",
  textAlign: "center",
  backgroundImage: "url('https://images.pexels.com/photos/1198802/pexels-photo-1198802.jpeg?auto=compress&cs=tinysrgb&w=600')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  position: "relative",
};

export default VetAppointments;
