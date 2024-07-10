import { Box } from '@mui/material';
import React from 'react';
import Header from '../components/Header/Header';
import MidSection from '../components/MidSection';
import Footer from '../components/Footer/Footer';

const Comingsoon = () => {
    return (
        <div>
            <Box
                display="flex"
                flexDirection="column"
                height="100vh"
            >
                <Box
                    component="header"
                    sx={{
                        padding: 2,
                    }}
                >
                    <Header />
                </Box>

                <Box
                    component="main"
                    sx={{
                    flexGrow: 1,
                    py: 12,
                    overflowY: 'auto',
                    }}
                >
                    <MidSection />
                </Box>

                <Box
                    component="footer"
                    sx={{
                        padding: 2,
                    }}
                >
                    <Footer />
                </Box>
            </Box>
        </div>
    )
}

export default Comingsoon