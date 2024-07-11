import { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import './NotifyMe.css';

const NotifyMe = () => {
  const formRef = useRef();
  const [open, setOpen] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    
    emailjs
      .sendForm(
        "service_5wa3w5j",
        "template_90dytdq",
        formRef.current,
        "xZiE81yyC9gBEedO8"
      )
      .then(
        (result) => {
          setOpen(false);
          console.log('=== result', result);
        },
        (error) => {
          console.log('=== error', error);
        }
      );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='dialogBox'>
      <Button variant="contained" onClick={handleClickOpen} endIcon={<NotificationsActiveOutlinedIcon />}>
        Notify me about that!
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <form ref={formRef} onSubmit={sendEmail}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your name, email address and your city here. We will send updates.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Your Name"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="city"
              name="city"
              label="City"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Subscribe</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default NotifyMe;
