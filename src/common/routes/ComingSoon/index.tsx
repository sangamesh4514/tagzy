import { useState, useEffect } from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ToggleModal from './ToggleModal';
import { Helmet } from 'react-helmet'

const Comingsoon = () => {
    const calculateTimeLeft = () => {
        const targetDate: Date = new Date('2024-11-30T00:00:00'); // Target date: 31th August 2024
        const now: Date = new Date();
        const difference: number = targetDate.getTime() - now.getTime();
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

    const formatTime = (seconds: number) => {
        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return { days, hours, minutes, secs };
    };

    const { days, hours, minutes, secs } = formatTime(timeLeft);
    
    return (
        <>
            <Helmet>
                <title>TagZy - Coming Soon</title>
                <meta
                    name='description'
                    content='Tagzy is coming soon. Stay tuned for updates on our web app to hire professionals.'
                />
            </Helmet>
            <div className='min-h-svh flex flex-col bg-gradient-to-r from-sky-500 to-indigo-500'>
                {/* Header */}
                <header className='text-3xl font-bold text-white pt-4 mx-auto font-mono md:text-5xl'>
                    TagZy
                </header>

                {/* Main section */}
                <div className='flex-grow flex flex-col justify-center items-center'>
                    <div className='text-4xl font-bold text-white pt-2 md:text-7xl text-center'>
                        Coming Soon
                    </div>
                    <div className='flex justify-center mt-10 space-x-4 md:space-x-14'>
                        <div className='flex flex-col items-center'>
                            <div className='text-4xl font-bold text-white md:text-7xl'>
                                {days}
                            </div>
                            <div className='text-2xl font-bold text-white md:text-3xl pt-2'>
                                Days
                            </div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <div className='text-4xl font-bold text-white md:text-7xl'>
                                {hours}
                            </div>
                            <div className='text-2xl font-bold text-white md:text-3xl pt-2'>
                                Hours
                            </div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <div className='text-4xl font-bold text-white md:text-7xl'>
                                {minutes}
                            </div>
                            <div className='text-2xl font-bold text-white md:text-3xl pt-2'>
                                Minutes
                            </div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <div className='text-4xl font-bold text-white md:text-7xl'>
                                {secs}
                            </div>
                            <div className='text-2xl font-bold text-white md:text-3xl pt-2'>
                                Seconds
                            </div>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <ToggleModal />
                    </div>
                </div>

                {/* Footer */}
                <footer className='text-center py-4'>
                    <div className='flex justify-center space-x-4'>
                        <a href="https://www.instagram.com/tagzy.in/" target="_blank" rel="noopener noreferrer">
                            <InstagramIcon sx={{ fontSize: '3rem', color: '#fff' }} />
                        </a>
                        <a href="https://twitter.com/_tagzy" target="_blank" rel="noopener noreferrer">
                            <TwitterIcon sx={{ fontSize: '3rem', color: '#fff' }} />
                        </a>
                        <a href="https://www.youtube.com/@tagzydotin" target="_blank" rel="noopener noreferrer">
                            <YouTubeIcon sx={{ fontSize: '3rem', color: '#fff' }} />
                        </a>
                    </div>
                    <div className='text-white mt-2'>
                        &copy; {new Date().getFullYear()} by TagZy. All rights reserved.
                    </div>
                </footer>
            </div>
        </>

    )
}

export default Comingsoon