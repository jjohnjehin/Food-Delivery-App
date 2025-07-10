import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LockIcon from '@mui/icons-material/Lock';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={3}
      bgcolor="#f5f5f5"
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 500,
          textAlign: 'center',
          borderRadius: 2,
        }}
      >
        <LockIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
        
        <Typography variant="h4" gutterBottom color="error.main">
          Access Denied
        </Typography>
        
        <Typography variant="h6" gutterBottom color="text.secondary">
          You don't have permission to access this page
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
          {user ? (
            `You are logged in as ${user.role}. Please contact support if you believe this is an error.`
          ) : (
            'Please log in to access this page.'
          )}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={handleGoHome}
          >
            Go Home
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
          >
            Go Back
          </Button>
          
          {user && (
            <Button
              variant="text"
              color="error"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
}; 