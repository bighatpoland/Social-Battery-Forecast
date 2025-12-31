import React from 'react';
import { Box, Typography, Button, Card, CardContent, Grid, Container } from '@mui/material';
import BatteryIcon from '@mui/icons-material/BatteryFull';
import ChatIcon from '@mui/icons-material/Chat';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DateRangeIcon from '@mui/icons-material/DateRange';

const LandingPage: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #1e3a8a 50%, #7c3aed 100%)',
        color: 'white',
        p: 2,
      }}
    >
      <Container maxWidth="md">
        {/* Hero Section */}
        <Box textAlign="center" sx={{ py: 8 }}>
          <Typography variant="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
            Social Battery Forecast
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, color: 'primary.light' }}>
            Recharge Your Social Energy – Forecast, Track, and Thrive with AI-Powered Insights
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={onGetStarted}
            sx={{ px: 4, py: 2, fontSize: '1.2rem' }}
          >
            Get Started
          </Button>
        </Box>

        {/* Features Section */}
        <Typography variant="h3" textAlign="center" sx={{ mb: 4 }}>
          Key Features
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'center',
                p: 2,
              }}
            >
              <CardContent>
                <TrendingUpIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6">AI Forecasts</Typography>
                <Typography>Get daily predictions based on your interactions.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'center',
                p: 2,
              }}
            >
              <CardContent>
                <BatteryIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6">Interactive Sliders</Typography>
                <Typography>Adjust factors for real-time insights.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'center',
                p: 2,
              }}
            >
              <CardContent>
                <ChatIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6">Chat Assistant</Typography>
                <Typography>Personalized advice to recharge.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'center',
                p: 2,
              }}
            >
              <CardContent>
                <DateRangeIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6">Date-Aware Tracking</Typography>
                <Typography>Forecasts tied to specific days.</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* How It Works */}
        <Typography variant="h3" textAlign="center" sx={{ mb: 4 }}>
          How It Works
        </Typography>
        <Box sx={{ mb: 8 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>1. Input Your Day</Typography>
          <Typography>Use sliders to set factors like encounters and eye contact.</Typography>
          <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>2. Get a Forecast</Typography>
          <Typography>Receive AI-powered predictions for your social battery.</Typography>
          <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>3. Chat for Tips</Typography>
          <Typography>Talk to the assistant for personalized recharging advice.</Typography>
        </Box>

        {/* Testimonials */}
        <Typography variant="h3" textAlign="center" sx={{ mb: 4 }}>
          What Users Say
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                p: 2,
              }}
            >
              <CardContent>
                <Typography>"Helped me avoid social burnout!"</Typography>
                <Typography sx={{ mt: 1, fontStyle: 'italic' }}>- User A</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                p: 2,
              }}
            >
              <CardContent>
                <Typography>"Simple and insightful."</Typography>
                <Typography sx={{ mt: 1, fontStyle: 'italic' }}>- User B</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box textAlign="center" sx={{ py: 4, borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <Typography variant="body2">© 2025 Social Battery Forecast. All rights reserved.</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            This is satire. Predictions are fake. Your feelings are real.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;