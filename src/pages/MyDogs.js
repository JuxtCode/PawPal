import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Grid, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';

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

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDog({ ...dog, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDog({ ...dog, image: reader.result }); // Store image as base64 string
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  // Handle form submission (Add or Update Dog)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      const updatedDogs = [...dogs];
      updatedDogs[editingIndex] = dog;
      setDogs(updatedDogs);
      setEditingIndex(null); // Reset editing mode
    } else {
      setDogs([...dogs, dog]);
    }

    // Reset the form
    setDog({ name: '', breed: '', age: '', weight: '', height: '', vaccinationDate: '', image: '' });
  };

  // Handle editing dog info
  const handleEdit = (index) => {
    const dogToEdit = dogs[index];
    setDog(dogToEdit);
    setEditingIndex(index); // Set the index to indicate we're editing
  };

  // Handle deleting a dog
  const handleDelete = (index) => {
    const updatedDogs = dogs.filter((_, i) => i !== index);
    setDogs(updatedDogs);
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
                style={{ maxWidth: '200px', marginBottom: '10px' }} // Smaller button
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

          {/* Centered Submit Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <StyledButton 
              type="submit" 
              variant="contained" 
              color="primary" 
              style={{ width: '150px', height: '50px', fontSize: '14px', padding: '6px' }} // Set a fixed width, same height
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
                  <img src={dog.image} alt={dog.name} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                )}
                <Typography variant="h6" style={{ color: '#34495e' }}>{dog.name}</Typography>
                <Typography variant="body1" style={{ color: '#7f8c8d' }}>Breed: {dog.breed}</Typography>
                <Typography variant="body1" style={{ color: '#7f8c8d' }}>Age: {dog.age} years</Typography>
                <Typography variant="body1" style={{ color: '#7f8c8d' }}>Weight: {dog.weight} kg</Typography>
                <Typography variant="body1" style={{ color: '#7f8c8d' }}>Height: {dog.height} cm</Typography>
                <Typography variant="body1" style={{ color: '#7f8c8d' }}>
                  Vaccination Date: {dog.vaccinationDate}
                </Typography>
                <Grid container spacing={1} style={{ marginTop: '10px' }}>
                  <Grid item>
                    <StyledButton
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </StyledButton>
                  </Grid>
                  <Grid item>
                    <StyledButton
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </StyledButton>
                  </Grid>
                </Grid>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

// Styled components
const StyledTextField = styled(TextField)({
  marginBottom: '15px',
  '& .MuiInputBase-root': {
    fontSize: '14px',
  },
});

const StyledButton = styled(Button)({
  fontSize: '14px',
  padding: '8px',
  borderRadius: '8px',
});

const StyledCard = styled(Card)({
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
});

export default MyDogs;
