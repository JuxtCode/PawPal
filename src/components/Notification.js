import React, { useState, useEffect } from 'react';
import { db, collection, getDocs } from '../firebase';
import { Paper, List, ListItem, ListItemText, Typography } from '@mui/material';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const notificationData = [];

      const bookingsSnapshot = await getDocs(collection(db, 'bookings'));
      bookingsSnapshot.forEach((doc) => {
        notificationData.push({ type: 'Booking', ...doc.data() });
      });

      const appointmentsSnapshot = await getDocs(collection(db, 'appointments'));
      appointmentsSnapshot.forEach((doc) => {
        notificationData.push({ type: 'Appointment', ...doc.data() });
      });

      const communitySnapshot = await getDocs(collection(db, 'communityevents'));
      communitySnapshot.forEach((doc) => {
        notificationData.push({ type: 'Community Event', ...doc.data() });
      });

      setNotifications(notificationData);
    };

    fetchNotifications();
  }, []);

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
                secondary={`Message: ${notification.message || 'No message'}`}
              />
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
};

export default Notifications;
