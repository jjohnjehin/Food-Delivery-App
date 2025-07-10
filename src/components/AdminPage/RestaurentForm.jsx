import {
  Box,
  Grid,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Button,
} from '@mui/material';
import React, { useState } from 'react';
import { Footer } from '../Footer';
import axios from 'axios';

const cuisineOptions = ['South Indian', 'North Indian', 'Chinese', 'Italian', 'Mexican', 'Arabian'];

export const RestaurentForm = () => {
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    email: '',
    contactNumber: '',
    alternateContact: '',
    address: '',
    city: '',
    pincode: '',
    location: '',
    type: '',
    cuisine: [],
    openingTime: '',
    closingTime: '',
    gstNumber: '',
    fssaiNumber: '',
    bankAccountNumber: '',
    accountHolderName: '',
    ifscCode: '',
    upiId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCuisineChange = (event) => {
    const {
      target: { value },
    } = event;
    const selected = typeof value === 'string' ? value.split(',') : value;
    setFormData((prev) => ({ ...prev, cuisine: selected }));
  };

  const handleTypeChange = (e) => {
    setFormData((prev) => ({ ...prev, type: e.target.value }));
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `${position.coords.latitude}, ${position.coords.longitude}`;
          setFormData((prev) => ({ ...prev, location: coords }));
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Enable GPS or location access");
        }
      );
    } else {
      alert("Geolocation not supported");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/restaurant-partner", formData);
      alert("Restaurant Partner Registered ✅");
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Error submitting form");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ width: "100%", height: "100%" }}>
        <Grid sx={{ width: "100%", height: "100px", bgcolor: '#e36414', display: 'flex', alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h3" sx={{ fontWeight: "700", color: "beige", fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" } }}>
            𝕱𝖗𝖊𝖘𝖍 𝕱𝖊𝖆𝖘𝖙 (Partners-App)
          </Typography>
        </Grid>

        <Box sx={{ width: '96%', px: 4, py: 6, backgroundColor: '#f9f9f9' }}>
          <Typography variant="h4" fontWeight="bold" mb={4}>Restaurant Partner Registration</Typography>

          {/* Basic Info */}
          <Typography variant="h6" fontWeight="600" gutterBottom>Basic Information</Typography>
          <Grid container spacing={2} mb={4}>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Restaurant Name" name="restaurantName" value={formData.restaurantName} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Owner/Manager Name" name="ownerName" value={formData.ownerName} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Email Address" name="email" value={formData.email} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Contact Number" name="contactNumber" value={formData.contactNumber} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Alternate Contact" name="alternateContact" value={formData.alternateContact} onChange={handleChange} /></Grid>
          </Grid>

          {/* Location */}
          <Typography variant="h6" fontWeight="600" gutterBottom>Location</Typography>
          <Grid container spacing={2} mb={4}>
            <Grid item xs={12}><TextField fullWidth multiline rows={2} label="Address" name="address" value={formData.address} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={4}><TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={4}><TextField fullWidth label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Location (Click to auto-fill)" value={formData.location} onClick={handleGetLocation} InputProps={{ readOnly: true }} />
            </Grid>
          </Grid>

          {/* Restaurant Details */}
          <Typography variant="h6" fontWeight="600" gutterBottom>Restaurant Details</Typography>
          <Grid container spacing={2} mb={4}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select value={formData.type} onChange={handleTypeChange} label="Type">
                  <MenuItem value="Veg">Veg</MenuItem>
                  <MenuItem value="Non-Veg">Non-Veg</MenuItem>
                  <MenuItem value="Both">Both</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Cuisine Type</InputLabel>
                <Select
                  multiple
                  value={formData.cuisine}
                  onChange={handleCuisineChange}
                  input={<OutlinedInput label="Cuisine Type" />}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {cuisineOptions.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={formData.cuisine.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Opening Time" type="time" name="openingTime" value={formData.openingTime} onChange={handleChange} InputLabelProps={{ shrink: true }} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Closing Time" type="time" name="closingTime" value={formData.closingTime} onChange={handleChange} InputLabelProps={{ shrink: true }} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="GST Number" name="gstNumber" value={formData.gstNumber} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="FSSAI License Number" name="fssaiNumber" value={formData.fssaiNumber} onChange={handleChange} /></Grid>
          </Grid>

          {/* Banking */}
          <Typography variant="h6" fontWeight="600" gutterBottom>Banking & Payment</Typography>
          <Grid container spacing={2} mb={4}>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Bank Account Number" name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Account Holder Name" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="IFSC Code" name="ifscCode" value={formData.ifscCode} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="UPI ID (Optional)" name="upiId" value={formData.upiId} onChange={handleChange} /></Grid>
          </Grid>

          {/* Submit */}
          <Box sx={{ width: '100%', mt: 3 }}>
            <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: 'orange', '&:hover': { bgcolor: '#e69500' }, fontWeight: 600 }}>
              Submit
            </Button>
          </Box>
        </Box>
        <Footer />
      </Box>
    </form>
  );
};
