import React, { useState, useEffect} from 'react'
import { Container, Typography, Grid, Box } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import NotifyMe from './Notifyme/NotifyMe';


const MidSection = () => {
    const calculateTimeLeft = () => {
        const targetDate = new Date('2024-08-31T00:00:00'); // Target date: 31th August 2024
        const now = new Date();
        const difference = targetDate - now;
        return Math.max(Math.floor(difference / 1000), 0); // Convert difference to seconds
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
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
    const isSmallScreen = useMediaQuery('(max-width:600px)');
  return (
    <div>
        <Container
                maxWidth="sm"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    overflow: 'hidden'
                }}
            >
                <Typography variant="h2" component="h1" gutterBottom sx={{ color: 'black', fontWeight: 'bold', fontSize: isSmallScreen ? '3rem' : '4rem' }}>
                    Coming Soon
                </Typography>
                <Grid container spacing={4} justifyContent="center" className='container'>
                    <Grid item xs={3}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Typography sx={{ fontSize: isSmallScreen ? '3.5rem' : '5rem', color: 'black', fontWeight: 'bold' }}>
                        {days}
                        </Typography>
                        <Typography sx={{ fontSize: isSmallScreen ? '1rem' : '1.5rem', color: 'black', fontWeight: 'bold', marginTop: '10px' }}>
                        DAYS
                        </Typography>
                    </Box>
                    </Grid>
                    <Grid item xs={3}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Typography sx={{ fontSize: isSmallScreen ? '3.5rem' : '5rem', color: 'black', fontWeight: 'bold' }}>
                        {hours}
                        </Typography>
                        <Typography sx={{ fontSize: isSmallScreen ? '1rem' : '1.5rem', color: 'black', fontWeight: 'bold', marginTop: '10px' }}>
                        HOURS
                        </Typography>
                    </Box>
                    </Grid>
                    <Grid item xs={3}>
                    <Box display="flex" flexDirection="column" alignItems="center" paddingRight="10px">
                        <Typography sx={{ fontSize: isSmallScreen ? '3.5rem' : '5rem', color: 'black', fontWeight: 'bold' }}>
                        {minutes}
                        </Typography>
                        <Typography sx={{ fontSize: isSmallScreen ? '1rem' : '1.5rem', color: 'black', fontWeight: 'bold', marginTop: '10px' }}>
                        MINUTES
                        </Typography>
                    </Box>
                    </Grid>
                    <Grid item xs={3}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Typography sx={{ fontSize: isSmallScreen ? '3.5rem' : '5rem', color: 'black', fontWeight: 'bold' }}>
                        {secs}
                        </Typography>
                        <Typography sx={{ fontSize: isSmallScreen ? '1rem' : '1.5rem', color: 'black', fontWeight: 'bold', marginTop: '10px' }}>
                        SECONDS
                        </Typography>
                    </Box>
                    </Grid>
                </Grid>
                <Grid>
                    <NotifyMe />
                </Grid>
            </Container>
    </div>
  )
}

export default MidSection