import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Grid, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { db, auth } from '../firebase'; // Import Firestore database and auth
import { addDoc, collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const MyDogs = () => {
  const [dog, setDog] = useState({
    name: '',
    breed: '',
    age: '',
    weight: '',
    height: '',
    vaccinationDate: '',
    image: '', // Store dog's image
  });
  const [dogs, setDogs] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Fetch user's dog profiles from Firestore
  const fetchDogs = async () => {
    if (!auth.currentUser) return;

    const q = query(collection(db, 'profiles'), where('userId', '==', auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    const dogList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setDogs(dogList);
  };

  useEffect(() => {
    fetchDogs(); // Fetch dogs when the component mounts
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDog({ ...dog, [name]: value });
  };

  // Add the image upload logic in handleImageUpload to store image URL in Firestore
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `dogImages/${file.name}`);

      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        setDog({ ...dog, image: downloadURL }); // Store the URL in state
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image');
      }
    }
  };

  // Handle form submission (Add or Update Dog)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if the user is authenticated
    if (!auth.currentUser) {
      alert('You must be logged in to add a dog profile!');
      return; // Stop the function execution if the user is not logged in
    }

    if (editingIndex !== null) {
      // Updating existing dog profile
      const updatedDog = dog;
      try {
        const dogRef = doc(db, 'profiles', dogs[editingIndex].id);
        await updateDoc(dogRef, updatedDog);
        const updatedDogs = [...dogs];
        updatedDogs[editingIndex] = updatedDog;
        setDogs(updatedDogs);
        setEditingIndex(null); 
        alert('Dog profile updated successfully!');
      } catch (error) {
        console.error('Error updating dog profile:', error);
        alert('Failed to update dog profile');
      }
    } else {
      // Adding new dog profile
      try {
        const dogWithUser = { ...dog, userId: auth.currentUser.uid };
        const docRef = await addDoc(collection(db, 'profiles'), dogWithUser);
        console.log('Dog profile saved with ID:', docRef.id);
  
        setDogs([...dogs, dogWithUser]);
        alert('Dog profile saved successfully!');
      } catch (error) {
        console.error('Error saving dog profile:', error.message); // Log the error message
        alert(`Failed to save dog profile. Error: ${error.message}`); // Show the error message
      }
    }
  
    setDog({ name: '', breed: '', age: '', weight: '', height: '', vaccinationDate: '', image: '' });
  };

  // Handle editing dog info
  const handleEdit = (index) => {
    const dogToEdit = dogs[index];
    setDog(dogToEdit);
    setEditingIndex(index); // Set the index to indicate we're editing
  };

  // Handle deleting a dog
  const handleDelete = async (index) => {
    const dogToDelete = dogs[index];
    try {
      await deleteDoc(doc(db, 'profiles', dogToDelete.id)); // Delete dog profile from Firestore
      const updatedDogs = dogs.filter((_, i) => i !== index);
      setDogs(updatedDogs); // Remove the dog from the list
      alert('Dog profile deleted successfully!');
    } catch (error) {
      console.error('Error deleting dog profile:', error);
      alert('Failed to delete dog profile');
    }
  };

  return (
    <div style={{ 
      padding: '30px', 
      backgroundImage: 'url("https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600")', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      minHeight: '100vh', 
      color: 'white'
    }}>
      <Typography variant="h3" gutterBottom align="center" style={{ fontWeight: 'bold' }}>
        My Dogs Page
      </Typography>

      {/* Dog Form */}
      <Paper elevation={5} style={{ padding: '30px', marginBottom: '30px', borderRadius: '12px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Form Fields */}
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Dog's Name"
                name="name"
                value={dog.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Dog's Breed"
                name="breed"
                value={dog.breed}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Dog's Age"
                name="age"
                type="number"
                value={dog.age}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Dog's Weight (kg)"
                name="weight"
                type="number"
                value={dog.weight}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Dog's Height (cm)"
                name="height"
                type="number"
                value={dog.height}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Vaccination Date"
                name="vaccinationDate"
                type="date"
                value={dog.vaccinationDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            {/* Image Upload */}
            <Grid item xs={12} sm={6}>
              <Button 
                variant="contained" 
                component="label" 
                fullWidth
                style={{ maxWidth: '200px', marginBottom: '10px' }}
              >
                Upload Dog's Picture
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </Button>
            </Grid>
          </Grid>

          {/* Submit Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <StyledButton 
              type="submit" 
              variant="contained" 
              color="primary"
            >
              {editingIndex !== null ? 'Update Dog' : 'Add Dog'}
            </StyledButton>
          </div>
        </form>
      </Paper>

      {/* Dogs List */}
      <Grid container spacing={3}>
        {dogs.map((dog, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
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
                <Typography variant="body1" style={{ color: '#7f8c8d' }}>Vaccination Date: {dog.vaccinationDate}</Typography>

                {/* Edit and Delete Buttons */}
                <div style={{ marginTop: '10px' }}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={() => handleEdit(index)} 
                    style={{ marginRight: '10px' }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const StyledTextField = styled(TextField)({
  '& label': {
    color: 'rgba(0, 0, 0, 0.8)', // Darker label
  },
  '& .MuiInputBase-root': {
    color: '#2c3e50', // Darker text color
  },
});

const StyledButton = styled(Button)({
  backgroundColor: '#2980b9',
  color: 'white',
  '&:hover': {
    backgroundColor: '#3498db',
  },
});

const StyledCard = styled(Card)({
  backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white
  borderRadius: '12px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
});

export default MyDogs;
