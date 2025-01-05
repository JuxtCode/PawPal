import React, { useState, useEffect } from 'react';
import { Grid, Typography, Card, CardContent, CardActions, Button, Box, Checkbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/system';
import { db, auth } from '../firebase'; // Import Firestore and Auth
import { getDocs, query, where, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const MyDogs = () => {
  const [dogs, setDogs] = useState([]);
  const navigate = useNavigate(); // React Router navigation hook

  // Fetch user's dog profiles from Firestore
  const fetchDogs = async () => {
    if (!auth.currentUser) return;

    const q = query(collection(db, 'profiles'), where('userId', '==', auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    const dogList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      // Add default checkbox states
      isBooked: doc.data().isBooked || false,
      isGroomed: doc.data().isGroomed || false,
      isBoarded: doc.data().isBoarded || false,
      needsTraining: doc.data().needsTraining || false,
      hasSeenVet: doc.data().hasSeenVet || false,
    }));
    setDogs(dogList);
  };

  // Fetch dogs when the component mounts
  useEffect(() => {
    fetchDogs();
  }, []);

  const handleServiceClick = (service) => {
    navigate(service); // Navigate to respective service page
  };

  const handleCheckboxChange = (dogId, field) => {
    setDogs((prevDogs) =>
      prevDogs.map((dog) =>
        dog.id === dogId ? { ...dog, [field]: !dog[field] } : dog
      )
    );
  };

  const handleViewDetails = (dogId) => {
    navigate(`/dog-details/${dogId}`); // Navigate to Dog Details page
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url(https://images.pexels.com/photos/2623968/pexels-photo-2623968.jpeg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          color: '#fdfdfd',
          fontWeight: 'bold',
          marginBottom: '40px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
        }}
      >
        My Dogs
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {dogs.map((dog) => (
          <Grid item xs={12} sm={6} md={4} key={dog.id}>
            <StyledCard>
              <CardContent>
                {/* Dog Image */}
                {dog.image && (
                  <img
                    src={dog.image}
                    alt={dog.name}
                    style={{
                      width: '100%',
                      height: '180px',
                      borderRadius: '10px',
                      objectFit: 'cover',
                      marginBottom: '15px',
                    }}
                  />
                )}
                <Typography
                  variant="h5"
                  sx={{
                    color: '#2c3e50',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: '10px',
                  }}
                >
                  {dog.name}
                </Typography>

                <Box sx={{ marginBottom: '15px' }}>
                  <Typography variant="body2" sx={{ color: '#7f8c8d', marginBottom: '5px' }}>
                    Breed: {dog.breed}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#7f8c8d', marginBottom: '5px' }}>
                    Age: {dog.age} years
                  </Typography>
                </Box>

                {/* Services Section */}
                {[
                  { label: 'Booking', field: 'isBooked', service: '/Bookings' },
                  { label: 'Grooming', field: 'isGroomed', service: '/doggrooming' },
                  { label: 'Boarding', field: 'isBoarded', service: '/dogboarding' },
                  { label: 'Training', field: 'needsTraining', service: '/Training' },
                  { label: 'Vet Check', field: 'hasSeenVet', service: '/vetappointments' },
                ].map(({ label, field, service }) => (
                  <ServiceSection
                    key={field}
                    label={label}
                    completed={dog[field]}
                    dogId={dog.id}
                    field={field}
                    onCheckboxChange={handleCheckboxChange}
                    onRequestClick={() => handleServiceClick(service)}
                  />
                ))}
              </CardContent>

              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: '#34495e',
                    color: '#ecf0f1',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                    '&:hover': { backgroundColor: '#2c3e50' },
                  }}
                  onClick={() => handleViewDetails(dog.id)}
                >
                  View Details
                </Button>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Service Section Component
const ServiceSection = ({ label, completed, dogId, field, onCheckboxChange, onRequestClick }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
    }}
  >
    <Typography
      variant="body2"
      sx={{
        color: completed ? '#27ae60' : '#e74c3c',
        fontWeight: 'bold',
      }}
    >
      {label}
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={completed}
            onChange={() => onCheckboxChange(dogId, field)}
            sx={{
              color: completed ? '#27ae60' : '#e74c3c',
              '&.Mui-checked': { color: '#27ae60' },
            }}
          />
        }
        label=""
      />
      {!completed && (
        <Button
          size="small"
          variant="outlined"
          sx={{
            textTransform: 'capitalize',
            borderColor: '#34495e',
            color: '#34495e',
            '&:hover': {
              borderColor: '#2c3e50',
              backgroundColor: '#ecf0f1',
            },
          }}
          onClick={onRequestClick}
        >
          Request
        </Button>
      )}
    </Box>
  </Box>
);

// Styled Card Component
const StyledCard = styled(Card)(({ theme }) => ({
  padding: '15px',
  borderRadius: '15px',
  backgroundColor: '#ffffff',
  boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.2)',
  },
}));

export default MyDogs;
