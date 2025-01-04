import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Card, CardContent, Typography, Paper, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';
import { db, auth, collection, addDoc, getDocs, updateDoc, doc } from '../firebase';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    maxAttendees: '',
  });
  const [newComments, setNewComments] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, 'communityevents'));
      const fetchedEvents = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEvents(fetchedEvents);
    };

    fetchEvents();
  }, []);

  const handleCreateEvent = async () => {
    if (!auth.currentUser) {
      alert('You must be logged in to create an event');
      return;
    }

    const newEventData = {
      ...newEvent,
      userId: auth.currentUser.uid,
      attendees: [],
      likes: 0,
      comments: [],
      likedBy: [],
      commentedBy: [],
    };

    try {
      await addDoc(collection(db, 'communityevents'), newEventData);
      setNewEvent({
        title: '',
        description: '',
        date: '',
        location: '',
        maxAttendees: '',
      });

      const querySnapshot = await getDocs(collection(db, 'communityevents'));
      const fetchedEvents = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleLikeEvent = async (eventId) => {
    if (!auth.currentUser) {
      alert('You must be logged in to like an event');
      return;
    }

    const event = events.find(event => event.id === eventId);
    if (event) {
      const likedBy = event.likedBy || [];
      const isLiked = likedBy.includes(auth.currentUser.uid);

      const eventRef = doc(db, 'communityevents', eventId);
      await updateDoc(eventRef, {
        likes: isLiked ? event.likes - 1 : event.likes + 1,
        likedBy: isLiked
          ? likedBy.filter(userId => userId !== auth.currentUser.uid)
          : [...likedBy, auth.currentUser.uid],
      });

      const querySnapshot = await getDocs(collection(db, 'communityevents'));
      const fetchedEvents = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEvents(fetchedEvents);
    }
  };

  const handleCommentChange = (eventId, value) => {
    setNewComments(prevComments => ({
      ...prevComments,
      [eventId]: value,
    }));
  };

  const handleAddComment = async (eventId) => {
    if (!auth.currentUser) {
      alert('You must be logged in to comment');
      return;
    }

    const comment = newComments[eventId]?.trim();
    if (comment) {
      const event = events.find(event => event.id === eventId);
      if (event) {
        const eventRef = doc(db, 'communityevents', eventId);
        await updateDoc(eventRef, {
          comments: [
            ...event.comments,
            { text: comment, userId: auth.currentUser.uid, username: auth.currentUser.displayName },
          ],
        });

        setNewComments(prevComments => ({
          ...prevComments,
          [eventId]: '',
        }));

        const querySnapshot = await getDocs(collection(db, 'communityevents'));
        const fetchedEvents = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setEvents(fetchedEvents);
      }
    }
  };

  const handleDeleteComment = async (eventId, commentIndex) => {
    const event = events.find(event => event.id === eventId);
    if (event) {
      const eventRef = doc(db, 'communityevents', eventId);
      const updatedComments = event.comments.filter((_, index) => index !== commentIndex);

      await updateDoc(eventRef, { comments: updatedComments });

      const querySnapshot = await getDocs(collection(db, 'communityevents'));
      const fetchedEvents = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEvents(fetchedEvents);
    }
  };

  return (
    <div style={pageStyle}>
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h3" gutterBottom style={{ color: '#2c3e50', fontWeight: 'bold' }}>
          Community Events
        </Typography>
      </Paper>

      <Grid container spacing={3} justifyContent="center" style={{ marginBottom: '40px', marginTop: '20px' }}>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" style={{ color: '#2c3e50', fontWeight: 'bold' }}>
                Create a New Event
              </Typography>
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

      <Paper elevation={2} style={paperStyle}>
        <Typography
          variant="h3"
          style={{
            color: '#2c3e50',
            fontWeight: 'bold',
            marginTop: '40px',
            textAlign: 'center',
          }}
        >
          Upcoming Events
        </Typography>
      </Paper>

      <Grid container spacing={2} style={{ marginTop: '20px' }} justifyContent="center">
        {events.map(event => (
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
                  Attendees: {event.attendees.length}/{event.maxAttendees}
                </Typography>

                <IconButton
                  onClick={() => handleLikeEvent(event.id)}
                  style={{ marginTop: '10px', color: event.likedBy.includes(auth.currentUser?.uid) ? 'red' : 'gray' }}
                >
                  {event.likedBy.includes(auth.currentUser?.uid) ? (
                    <FavoriteIcon />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>

                <Typography variant="body2" style={{ marginTop: '10px' }}>
                  {event.likes} likes
                </Typography>

                <div style={{ marginTop: '20px' }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Add a comment"
                    value={newComments[event.id] || ''}
                    onChange={(e) => handleCommentChange(event.id, e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleAddComment(event.id)}
                    style={{ marginTop: '10px' }}
                  >
                    Add Comment
                  </Button>
                  {event.comments && event.comments.length > 0 ? (
                    event.comments.map((comment, index) => (
                      <div key={index} style={{ marginTop: '10px' }}>
                        <Typography
                          variant="body2"
                          style={{ color: '#7f8c8d', display: 'flex', justifyContent: 'space-between' }}
                        >
                          <span>{comment.username}: {comment.text}</span>
                          {comment.userId === auth.currentUser?.uid && (
                            <IconButton onClick={() => handleDeleteComment(event.id, index)} size="small">
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          )}
                        </Typography>
                      </div>
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

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#F5F5DC',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  width: '90%',
}));

const pageStyle = {
  backgroundColor: '#ecf0f1',
  backgroundImage: 'url(https://images.pexels.com/photos/1346086/pexels-photo-1346086.jpeg?auto=compress&cs=tinysrgb&w=600)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: '20px',
};

const paperStyle = {
  padding: '20px',
  backgroundColor: '#F5F5DC',
  color: 'white',
  textAlign: 'center',
};

export default EventPage;
