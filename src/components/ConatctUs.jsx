import React from 'react';
import { Box, Grid, Typography, TextField, Button, Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export const ContactUs = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 6 }, backgroundColor: '#f9f9f9',marginTop:'100px' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
          Contact Us
        </Typography>
        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <form>
              <TextField fullWidth label="Full Name" variant="outlined" margin="normal" required />
              <TextField fullWidth label="Email Address" type="email" variant="outlined" margin="normal" required />
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                margin="normal"
                required
              />
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                Send Message
              </Button>
            </form>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Get in Touch
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnIcon fontSize="small" /> Address: 123 Food Street, Nagercoil City, Kanyakumari
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon fontSize="small" /> Phone: +91 98765 43210
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon fontSize="small" /> Email: support@freshfeast.com
            </Typography>

            {/* Optional: Google Map Embed */}
            <Box sx={{ mt: 3 }}>
              <iframe
                title="map"
                src="https://maps.google.com/maps?q=kanyakumari,nagercoil&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};


