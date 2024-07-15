import { Container, Typography, useMediaQuery } from '@mui/material'
import React from 'react'

const Header = () => {
    const isSmallScreen = useMediaQuery(`(max-width:600px)`);
    
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
                    paddingTop: 1,
                }}
            >
                <Typography 
                    variant='h4' 
                    gutterBottom 
                    sx={{ color: 'black', fontWeight: 'bold', fontSize: isSmallScreen ? '2rem' : '3rem', fontFamily: 'monospace'}}>
                    TagZy
                </Typography>
            </Container>
        </div>
    )
}

export default Header