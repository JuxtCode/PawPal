import React, { useState, useEffect } from "react";
import { Typography, Button, Paper, Box, List, ListItem, ListItemText } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { db } from "../firebase"; // Ensure this points to your Firebase configuration
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

const VetAppointments = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments from Firestore
  const fetchAppointments = async () => {
    try {
      const q = query(collection(db, "vetappointments"), orderBy("appointmentDate", "asc"));
      const querySnapshot = await getDocs(q);
      const fetchedAppointments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched Appointments:", fetchedAppointments); // Log retrieved data

      setAppointments(fetchedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // Load appointments on component mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleBookAppointment = async () => {
    if (!selectedDateTime) {
      alert("Please select a date and time before booking.");
      return;
    }

    try {
      // Save the appointment in the vetappointments collection
      await addDoc(collection(db, "vetappointments"), {
        appointmentDate: selectedDateTime.toISOString(),
        createdAt: new Date().toISOString(),
      });

      alert(
        `Appointment booked for ${selectedDateTime.toLocaleDateString()} at ${selectedDateTime.toLocaleTimeString()}`
      );

      // Refresh the appointments list
      fetchAppointments();
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  const handleStartVideoConsultation = () => {
    alert("Starting video consultation...");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={pageStyle}>
        <Paper elevation={3} sx={{ p: 4, textAlign: "center", background: "rgba(255, 255, 255, 0.7)" }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Veterinary Services
          </Typography>

          <DateTimePicker
            label="Appointment Date and Time"
            value={selectedDateTime}
            onChange={(newDateTime) => setSelectedDateTime(newDateTime)}
            renderInput={(params) => (
              <input
                {...params}
                placeholder="Appointment Date and Time"
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "14px",
                  textAlign: "center",
                }}
              />
            )}
          />

          <Box sx={{ mt: 4 }}>
            <Button variant="contained" color="primary" onClick={handleBookAppointment}>
              Book Appointment
            </Button>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="secondary" onClick={handleStartVideoConsultation}>
              Start Video Consultation
            </Button>
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ p: 4, mt: 4, background: "rgba(255, 255, 255, 0.7)" }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Upcoming Appointments
          </Typography>
          <List>
            {appointments.length === 0 ? (
              <Typography>No appointments scheduled.</Typography>
            ) : (
              appointments.map((appointment) => (
                <ListItem key={appointment.id}>
                  <ListItemText
                    primary={`Date: ${new Date(appointment.appointmentDate).toLocaleDateString()}`}
                    secondary={`Time: ${new Date(appointment.appointmentDate).toLocaleTimeString()}`}
                  />
                </ListItem>
              ))
            )}
          </List>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};

// Page background style
const pageStyle = {
  padding: "30px",
  textAlign: "center",
  backgroundImage:
    "url('https://images.pexels.com/photos/1198802/pexels-photo-1198802.jpeg?auto=compress&cs=tinysrgb&w=600')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  position: "relative",
};

export default VetAppointments;
