import React, { useState, useEffect } from 'react';
import { Grid, Typography, Card, CardContent, Button } from '@mui/material';
import { styled } from '@mui/system';
import { db, auth } from '../firebase'; // Import Firestore and Auth
import { getDocs, query, where, collection } from 'firebase/firestore';

const MyDogs = () => {
  const [dogs, setDogs] = useState([]);

  // Fetch user's dog profiles from Firestore
  const fetchDogs = async () => {
    if (!auth.currentUser) return;

    const q = query(collection(db, 'profiles'), where('userId', '==', auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    const dogList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setDogs(dogList);
  };

  // Fetch dogs when the component mounts
  useEffect(() => {
    fetchDogs(); // Fetch dogs when the component mounts
  }, []);

  return (
    <div>
      <Typography variant="h3" gutterBottom align="center" style={{ fontWeight: 'bold' }}>
        My Dogs
      </Typography>

      {/* Dogs List */}
      <Grid container spacing={3}>
        {dogs.map((dog) => (
          <Grid item xs={12} sm={6} md={4} key={dog.id}>
            <StyledCard>
              <CardContent>
                {/* Display Dog Image */}
                {dog.image && (
                  <img src={dog.image} alt={dog.name} style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
                )}
                <Typography variant="h6" style={{ color: '#34495e' }}>{dog.name}</Typography>
                <Typography variant="body1" style={{ color: '#7f8c8d' }}>Breed: {dog.breed}</Typography>
                <Typography variant="body1" style={{ color: '#7f8c8d' }}>Age: {dog.age} years</Typography>
                <Typography variant="body1" style={{ color: '#7f8c8d' }}>Weight: {dog.weight} kg</Typography>
                <Typography variant="body1" style={{ color: '#7f8c8d' }}>Height: {dog.height} cm</Typography>
                <Typography variant="body1" style={{ color: '#7f8c8d' }}>
                  Vaccination Date: {dog.vaccinationDate}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

// Styled components
const StyledCard = styled(Card)(/* Add your styles here */);

export default MyDogs;
