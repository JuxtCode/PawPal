import React, { useState } from 'react';
import { Button, TextField, Grid, Card, CardContent, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { db } from '../firebase'; // Import Firestore
import { collection, addDoc } from 'firebase/firestore'; // Firestore methods

const Bookings = () => {
  const [bookingDetails, setBookingDetails] = useState({
    serviceType: 'dog walking',
    date: null,
    time: '',
    dogName: '',
    ownerName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({ ...bookingDetails, [name]: value });
  };

  const handleDateChange = (newDate) => {
    setBookingDetails({ ...bookingDetails, date: newDate });
  };

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, 'bookings'), bookingDetails);
      console.log('Booking stored with ID:', docRef.id);
      alert('Booking saved successfully!');
    } catch (error) {
      console.error('Error storing booking:', error);
      alert('Failed to save booking. Please try again.');
    }
  };

  return (
    <div style={pageStyle}>
      <Paper elevation={6} style={paperStyle}>
        <Typography variant="h3" gutterBottom style={headingStyle}>
          Schedule Your Dog Service
        </Typography>
      </Paper>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" style={sectionTitleStyle}>
                Personal Details
              </Typography>
              <TextField
                label="Dog Name"
                fullWidth
                variant="outlined"
                name="dogName"
                value={bookingDetails.dogName}
                onChange={handleChange}
                style={textFieldStyle}
              />
              <TextField
                label="Owner's Name"
                fullWidth
                variant="outlined"
                name="ownerName"
                value={bookingDetails.ownerName}
                onChange={handleChange}
                style={textFieldStyle}
              />
              <Typography variant="h6" style={sectionTitleStyle}>
                Service Details
              </Typography>
              <TextField
                label="Service Type"
                fullWidth
                variant="outlined"
                select
                name="serviceType"
                value={bookingDetails.serviceType}
                onChange={handleChange}
                style={textFieldStyle}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="dog walking">Dog Walking</option>
                <option value="dog sitting">Dog Sitting</option>
              </TextField>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Choose Date"
                  value={bookingDetails.date}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  style={textFieldStyle}
                />
              </LocalizationProvider>
              <TextField
                label="Preferred Time"
                fullWidth
                variant="outlined"
                type="time"
                name="time"
                value={bookingDetails.time}
                onChange={handleChange}
                style={textFieldStyle}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min step
                }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={submitButtonStyle}
                onClick={handleSubmit}
              >
                Book Service
              </Button>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </div>
  );
};

// Styled Components
const StyledCard = styled(Card)({
  borderRadius: '12px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
  },
});

const pageStyle = {
  padding: '30px',
  backgroundImage: 'url("https://images.pexels.com/photos/3714060/pexels-photo-3714060.jpeg?auto=compress&cs=tinysrgb&w=600")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
};

const paperStyle = {
  padding: '25px',
  marginBottom: '30px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const headingStyle = {
  color: '#34495e',
  fontWeight: 'bold',
};

const sectionTitleStyle = {
  color: '#2c3e50',
  fontWeight: 'bold',
  marginTop: '20px',
};

const textFieldStyle = {
  marginTop: '15px',
};

const submitButtonStyle = {
  marginTop: '20px',
  padding: '12px 0',
  backgroundColor: '#4CAF50',
  color: 'white',
  fontSize: '16px',
  textTransform: 'none',
  borderRadius: '8px',
};

export default Bookings;
