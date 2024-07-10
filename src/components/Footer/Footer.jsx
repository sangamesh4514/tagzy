import { Grid, Link, Typography } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  return (
    <div>
        <Grid container justifyContent="center" sx={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', padding:'25px'}}>
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
        <Typography variant="body2" color="textSecondary" sx={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', padding:'25px'}}>
            &copy; {new Date().getFullYear()} by TagZy. All rights reserved.
        </Typography>
    </div>
  )
}

export default Footer