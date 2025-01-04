import React, { useState, useEffect } from 'react';
import { db, collection, getDocs } from '../firebase'; // Import Firebase config here
import { Paper, List, ListItem, ListItemText, Typography } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Firebase auth
import dayjs from 'dayjs';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    // Monitor authentication state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        setNotifications([]); // Clear notifications if logged out
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      const notificationData = [];
      const isDue = (date) => dayjs(date).isBefore(dayjs());

      try {
        // Fetch bookings
        const bookingsSnapshot = await getDocs(collection(db, 'bookings'));
        bookingsSnapshot.forEach((doc) => {
          const data = doc.data();
          if (isDue(data.date)) {
            notificationData.push({ type: 'Booking', ...data });
          }
        });

        // Fetch vet appointments
        const appointmentsSnapshot = await getDocs(collection(db, 'vetappointments'));
        appointmentsSnapshot.forEach((doc) => {
          const data = doc.data();
          if (isDue(data.date) && data.userId === user.uid) {
            notificationData.push({ type: 'Vet Appointment', ...data });
          }
        });

        // Fetch community events
        const communitySnapshot = await getDocs(collection(db, 'communityevents'));
        communitySnapshot.forEach((doc) => {
          const data = doc.data();
          if (isDue(data.date)) {
            notificationData.push({ type: 'Community Event', ...data });
          }
        });

        setNotifications(notificationData);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [user]);

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>
        Notifications
      </Typography>
      <List>
        {notifications.length === 0 ? (
          <Typography variant="body1">No notifications to display.</Typography>
        ) : (
          notifications.map((notification, index) => (
            <ListItem key={index} style={{ borderBottom: '1px solid #ccc' }}>
              <ListItemText
                primary={`${notification.type}: ${notification.title || 'No title'}`}
                secondary={`Message: ${notification.message || 'No message'} | Due Date: ${notification.date || 'N/A'}`}
              />
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
};

export default Notifications;
