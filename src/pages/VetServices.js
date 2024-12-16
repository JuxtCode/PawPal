import React, { useState, useEffect } from "react";
import { Button, Paper, Typography, Modal, Box } from "@mui/material";
import { Calendar } from "react-calendar"; // Install react-calendar if not already done
import "react-calendar/dist/Calendar.css";
import { db, collection, addDoc, getDocs } from "../firebase"; // Ensure firebase is correctly configured and imported

const VetServices = () => {
  const [openModal, setOpenModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [reminders, setReminders] = useState([]);

  // Fetch reminders from Firestore on component load
  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const remindersSnapshot = await getDocs(collection(db, "reminders"));
        const remindersList = remindersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReminders(remindersList);
      } catch (error) {
        console.error("Error fetching reminders:", error);
      }
    };
    fetchReminders();
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    console.log("Selected Date:", selectedDate);
  };

  const handleBookAppointment = async () => {
    try {
      await addDoc(collection(db, "appointments"), {
        date: date.toISOString(),
        createdAt: new Date(),
      });
      alert("Appointment booked successfully!");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
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
          <Button variant="contained" color="primary" onClick={handleBookAppointment} style={{ marginTop: "10px" }}>
            Book Appointment
          </Button>
        </div>

        {/* Reminders Section */}
        <div style={{ margin: "20px 0" }}>
          <Typography variant="h6" style={{ color: "#34495e", marginBottom: "10px" }}>
            Reminders
          </Typography>
          {reminders.length > 0 ? (
            <ul>
              {reminders.map((reminder) => (
                <li key={reminder.id}>
                  {reminder.message} - {new Date(reminder.date).toDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <Typography variant="body2" style={{ color: "#7f8c8d" }}>
              No reminders at the moment.
            </Typography>
          )}
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
