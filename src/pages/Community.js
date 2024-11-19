import React, { useState } from 'react';
import { Button, TextField, Grid, Card, CardContent, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    maxAttendees: '',
  });
  const [attendees, setAttendees] = useState({});
  const [newComment, setNewComment] = useState(''); // State for new comment input

  // Handle event creation
  const handleCreateEvent = () => {
    const newEventData = { 
      ...newEvent, 
      id: events.length + 1, 
      attendees: [],
      likes: 0,  // Initially no likes
      comments: [] // Initially no comments
    };
    setEvents([...events, newEventData]);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      location: '',
      maxAttendees: '',
    });
  };

  // Handle user joining an event
  const handleJoinEvent = (eventId) => {
    if (attendees[eventId] && attendees[eventId].length < events.find((event) => event.id === eventId).maxAttendees) {
      setAttendees({
        ...attendees,
        [eventId]: [...attendees[eventId], `User${attendees[eventId].length + 1}`],
      });
    }
  };

  // Handle liking an event
  const handleLikeEvent = (eventId) => {
    setEvents(events.map(event => 
      event.id === eventId 
      ? { ...event, likes: event.likes + 1 }
      : event
    ));
  };

  // Handle adding a comment to an event
  const handleAddComment = (eventId) => {
    if (newComment.trim()) {
      setEvents(events.map(event => 
        event.id === eventId 
        ? { ...event, comments: [...event.comments, newComment] }
        : event
      ));
      setNewComment(''); // Clear the comment input
    }
  };

  return (
    <div style={pageStyle}>
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h3" gutterBottom style={{ color: '#34495e', fontWeight: 'bold' }}>
          Dog Meetups & Events
        </Typography>
      </Paper>

      {/* Event Creation Form */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" style={{ color: '#2c3e50', fontWeight: 'bold' }}>
                Create a New Event
              </Typography>
              {/* Form Fields */}
              <TextField
                label="Event Title"
                fullWidth
                variant="outlined"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                style={{ marginTop: '20px' }}
              />
              <TextField
                label="Event Description"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                style={{ marginTop: '20px' }}
              />
              <TextField
                label="Event Date"
                fullWidth
                variant="outlined"
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                style={{ marginTop: '20px' }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Event Location"
                fullWidth
                variant="outlined"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                style={{ marginTop: '20px' }}
              />
              <TextField
                label="Max Attendees"
                fullWidth
                variant="outlined"
                type="number"
                value={newEvent.maxAttendees}
                onChange={(e) => setNewEvent({ ...newEvent, maxAttendees: e.target.value })}
                style={{ marginTop: '20px' }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '20px' }}
                onClick={handleCreateEvent}
              >
                Create Event
              </Button>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Display List of Events */}
      <Typography variant="h5" style={{ color: '#ffffff', fontWeight: 'bold', marginTop: '40px' }}>
        Upcoming Events
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" style={{ color: '#2c3e50', fontWeight: 'bold' }}>
                  {event.title}
                </Typography>
                <Typography variant="body1" style={{ color: '#7f8c8d' }}>
                  {event.description}
                </Typography>
                <Typography variant="body1" style={{ color: '#7f8c8d' }}>
                  Date: {event.date}
                </Typography>
                <Typography variant="body1" style={{ color: '#7f8c8d' }}>
                  Location: {event.location}
                </Typography>
                <Typography variant="body1" style={{ color: '#7f8c8d' }}>
                  Attendees: {attendees[event.id] ? attendees[event.id].length : 0}/{event.maxAttendees}
                </Typography>

                {/* Likes */}
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() => handleLikeEvent(event.id)}
                  style={{ marginTop: '20px' }}
                >
                  Like ({event.likes})
                </Button>

                {/* Comments Section */}
                <Typography variant="body2" style={{ marginTop: '20px', color: '#34495e' }}>
                  Comments
                </Typography>
                <TextField
                  label="Add a comment"
                  fullWidth
                  variant="outlined"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  style={{ marginTop: '10px' }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: '10px' }}
                  onClick={() => handleAddComment(event.id)}
                >
                  Add Comment
                </Button>

                {/* Display Comments */}
                <div style={{ marginTop: '20px' }}>
                  {event.comments.length > 0 ? (
                    event.comments.map((comment, index) => (
                      <Typography key={index} variant="body2" style={{ color: '#7f8c8d' }}>
                        {comment}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2" style={{ color: '#7f8c8d' }}>
                      No comments yet.
                    </Typography>
                  )}
                </div>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

// Styled components for consistent styling
const StyledCard = styled(Card)({
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
});

const pageStyle = {
  padding: '30px',
  background: 'url(https://images.pexels.com/photos/1346086/pexels-photo-1346086.jpeg?auto=compress&cs=tinysrgb&w=600) no-repeat center center fixed',
  backgroundSize: 'cover',
  minHeight: '100vh',
};

const paperStyle = {
  padding: '20px',
  marginBottom: '30px',
  backgroundColor: '#ffffff',
};

export default EventPage;
