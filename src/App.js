import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box,Link } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const App = () => {
  const [timeLeft, setTimeLeft] = useState(2592000); 

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return { days, hours, minutes, secs };
  };

  const { days, hours, minutes, secs } = formatTime(timeLeft);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
       <Typography variant="h2" component="h1" gutterBottom sx={{ color: 'black', fontWeight: 'bold', fontSize: '4rem' }}>
        Coming Soon good
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={3}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography sx={{ fontSize: '5rem', color: 'black', fontWeight: 'bold' }}>
              {days}
            </Typography>
            <Typography sx={{ fontSize: '1.5rem', color: 'black', fontWeight: 'bold', marginTop: '10px' }}>
              DAYS
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography sx={{ fontSize: '5rem', color: 'black', fontWeight: 'bold' }}>
              {hours}
            </Typography>
            <Typography sx={{ fontSize: '1.5rem', color: 'black', fontWeight: 'bold', marginTop: '10px' }}>
              HOURS
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box display="flex" flexDirection="column" alignItems="center" paddingRight="10px">
            <Typography sx={{ fontSize: '5rem', color: 'black', fontWeight: 'bold' }}>
              {minutes}
            </Typography>
            <Typography sx={{ fontSize: '1.5rem', color: 'black', fontWeight: 'bold', marginTop: '10px' }}>
              MINUTES
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography sx={{ fontSize: '5rem', color: 'black', fontWeight: 'bold' }}>
              {secs}
            </Typography>
            <Typography sx={{ fontSize: '1.5rem', color: 'black', fontWeight: 'bold', marginTop: '10px' }}>
              SECONDS
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container justifyContent="center"  sx={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)' }}>
        <Grid item>
          <Link href="https://www.instagram.com/tagzy.in/" target="_blank" rel="noopener noreferrer" color="inherit" underline="none">
            <InstagramIcon sx={{ fontSize: '3rem', color: '#C13584', marginRight: '20px' }} />
          </Link>
        </Grid>
        <Grid item>
          <Link href="https://twitter.com/_tagzy" target="_blank" rel="noopener noreferrer" color="inherit" underline="none">
            <TwitterIcon sx={{ fontSize: '3rem', color: '#1DA1F2', marginRight: '20px' }} />
          </Link>
        </Grid>
        <Grid item>
          <Link href="https://www.youtube.com/@tagzydotin" target="_blank" rel="noopener noreferrer" color="inherit" underline="none">
            <YouTubeIcon sx={{ fontSize: '3rem', color: '#FF0000' }} />
          </Link>
        </Grid>
      </Grid>
      <Typography variant="body2" color="textSecondary" sx={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
        &copy; {new Date().getFullYear()} by TagZy. All rights reserved.
      </Typography>
    </Container>
  );
};

export default App;
