import React from 'react';
import { Card, CardContent, Typography, Button, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';

const SubscriptionPage = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$9.99/month',
      benefits: ['Access to basic features', '1 Dog profile', 'Basic customer support'],
    },
    {
      name: 'Premium',
      price: '$19.99/month',
      benefits: [
        'Access to all features',
        'Unlimited Dog profiles',
        'Priority customer support',
        'Exclusive discounts',
      ],
    },
  ];

  return (
    <div style={pageStyle}>
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h3" gutterBottom align="center" style={{ color: '#2c3e50', fontWeight: 'bold' }}>
          Subscription Plans
        </Typography>
      </Paper>

      <Grid container spacing={3} justifyContent="center">
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={3} style={planPaperStyle}>
              <CardContent>
                <Typography variant="h5" style={{ color: '#34495e', fontWeight: 'bold' }}>
                  {plan.name} Plan
                </Typography>
                <Typography variant="h6" style={{ color: '#2980b9' }}>
                  {plan.price}
                </Typography>
                <ul style={{ marginTop: '10px' }}>
                  {plan.benefits.map((benefit, idx) => (
                    <li key={idx} style={{ color: '#7f8c8d' }}>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <StyledButton variant="contained" color="primary">
                  Subscribe
                </StyledButton>
              </CardContent>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const pageStyle = {
  padding: '30px',
  background: 'url(https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=600) no-repeat center center fixed',
  backgroundSize: 'cover',
  minHeight: '100vh',
};

const paperStyle = {
  padding: '20px',
  marginBottom: '30px',
  backgroundColor: '#ffffff',
  opacity: 0.9, // Added opacity to make the background visible through the paper
};

const planPaperStyle = {
  borderRadius: '12px',
  padding: '20px',
  backgroundColor: '#ffffff',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
};

const StyledButton = styled(Button)({
  borderRadius: '10px',
  padding: '10px',
  marginTop: '20px',
  width: '100%',
  '&:hover': {
    backgroundColor: '#2980b9',
    transform: 'scale(1.05)',
  },
});

export default SubscriptionPage;
