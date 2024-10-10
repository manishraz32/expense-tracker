import * as React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container
      className="h-full items-center justify-center"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        padding: '40px 20px',
        backgroundColor: '#F5F5F5',
        minHeight: '100%',
      }}
    >
      <Box sx={{ mb: 4 }}>
        <ErrorOutlineIcon sx={{ fontSize: 100, color: '#12C48B' }} />
      </Box>
      <Typography variant="h3" sx={{ color: '#333', fontWeight: 700 }}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="h6" sx={{ color: '#555', my: 2 }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
      <Button
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: '#12C48B',
          color: '#FFF',
          padding: '10px 20px',
          '&:hover': {
            backgroundColor: '#0F8A6A',
          },
        }}
        onClick={handleGoHome}
      >
        Go to Homepage
      </Button>
    </Container>
  );
}

export default NotFoundPage;
