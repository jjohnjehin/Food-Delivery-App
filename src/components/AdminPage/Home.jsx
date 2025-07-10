import { Box,Grid,Typography,Button,TextField,MenuItem, Select, FormControl, InputLabel,CardMedia,CardContent,Card } from "@mui/material"
import {Footer} from "../Footer"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StoreIcon from '@mui/icons-material/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
export const Home=()=>{
     const [partnerType, setPartnerType] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setPartnerType(event.target.value);
  };

  const handleSubmit = () => {
    if (partnerType === 'restaurant') {
      navigate('/restaurentform');
    } else if (partnerType === 'delivery') {
      navigate('/deliveryform');
    } else {
      alert('Please select a partner type');
    }
    const partnerBenefits = [
  {
    icon: <StoreIcon fontSize="large" color="primary" />,
    title: 'Grow Your Business',
    desc: 'Get more orders and reach thousands of new customers in your area.',
  },
  {
    icon: <LocalShippingIcon fontSize="large" color="success" />,
    title: 'Reliable Delivery',
    desc: 'Our fast delivery fleet ensures your food gets delivered fresh and on time.',
  },
  {
    icon: <ThumbUpIcon fontSize="large" color="secondary" />,
    title: 'Trusted Platform',
    desc: 'We’re rated highly by partners for our service and support.',
  },
  {
    icon: <MonetizationOnIcon fontSize="large" sx={{ color: '#f57c00' }} />,
    title: 'Boost Your Revenue',
    desc: 'Increase your earnings with more visibility and zero hidden charges.',
  },
];
  };
    return(
        <Box sx={{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
            {/* Header */}
            <Grid sx={{width:"100%",height:"100px",bgcolor: '#e36414',display:'flex',alignItems:"center",justifyContent:"center"}}>
                <Typography variant="h3" sx={{fontWeight: "700", color: "beige",fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" },marginLeft:"30px"}}>𝕱𝖗𝖊𝖘𝖍 𝕱𝖊𝖆𝖘𝖙(Partners-App)</Typography>
            </Grid>
            {/* ADD */}
            <Box sx={{ px: 4, py: 6, backgroundColor: '#fff8f0', borderRadius: 3 }}>
      <Typography variant="h4" textAlign="center" fontWeight="bold" mb={4} color="primary">
        Why Partner With Us?
      </Typography>

      <Grid container spacing={4}>
  {[
  {
    icon: <StoreIcon fontSize="large" color="primary" />,
    title: 'Grow Your Business',
    desc: 'Get more orders and reach thousands of new customers in your area.',
  },
  {
    icon: <LocalShippingIcon fontSize="large" color="success" />,
    title: 'Reliable Delivery',
    desc: 'Our fast delivery fleet ensures your food gets delivered fresh and on time.',
  },
  {
    icon: <ThumbUpIcon fontSize="large" color="secondary" />,
    title: 'Trusted Platform',
    desc: 'We’re rated highly by partners for our service and support.',
  },
  {
    icon: <MonetizationOnIcon fontSize="large" sx={{ color: '#f57c00' }} />,
    title: 'Boost Your Revenue',
    desc: 'Increase your earnings with more visibility and zero hidden charges.',
  },
].map((benefit, index) => (
    <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: 'flex' }}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          width: '100%',
          borderRadius: 3,
          boxShadow: '0 8px 20px rgba(255, 140, 0, 0.3)',
        }}
      >
        <Box sx={{ textAlign: 'center', mt: 3 }}>{benefit.icon}</Box>
        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Typography variant="h6" fontWeight="600" gutterBottom>
            {benefit.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {benefit.desc}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>



      <Box textAlign="center" mt={5}>
  <Box
    sx={{
      position: 'relative',
      display: 'inline-block',
      borderRadius: '50px',
      padding: '4px',
      background: '#000', // fallback bg
      overflow: 'hidden',

      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '50px',
        padding: '3px',
        background: 'conic-gradient(from 0deg, #2196F3, #1E88E5, #1976D2, #2196F3)',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        animation: 'rotateBorder 3s linear infinite',
        zIndex: 0,
      },
    }}
  >
    <Button
      variant="contained"
      size="large"
      sx={{
        position: 'relative',
        zIndex: 1,
        px: 5,
        py: 1.5,
        borderRadius: '50px',
        backgroundColor: '#FFA726',
        color: '#fff',
        textTransform: 'none',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: '#FB8C00',
        },
      }}
    >
      Add Your Restaurant / Become a Delivery Partner
    </Button>
  </Box>

  {/* CSS Keyframes */}
  <style>
    {`
      @keyframes rotateBorder {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}
  </style>
</Box>

    </Box>
            {/* Form */}
            <Grid
  container
  sx={{
    width: '100%',
    height: { xs: 'auto', md: '400px' },
    mt: '30px',
    backgroundImage: 'url(https://culturalindia.org.in/wp-content/uploads/2024/06/medicine.png)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    py: { xs: 4, md: 0 },
  }}
>
  <Grid
    item
    sx={{
      width: { xs: '90%', sm: '70%', md: '350px' },
      height: { xs: 'auto', md: '50%' },
      bgcolor: 'white',
      borderRadius: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      boxShadow: '0 4px 20px rgba(255, 165, 0, 0.4)',
      px: 3,
      py: 4,
    }}
  >
    <Typography
      variant="h5"
      sx={{
        fontWeight: 700,
        color: 'orange',
        fontSize: { xs: '1.2rem', sm: '1.5rem' },
        textAlign: 'center',
      }}
    >
      Become a Partner With Us
    </Typography>

    <FormControl sx={{ width: '100%', maxWidth: '250px', mt: 2 }} size="small">
      <InputLabel id="partner-type-label">Select Partner Type</InputLabel>
      <Select
        labelId="partner-type-label"
        value={partnerType}
        label="Select Partner Type"
        onChange={handleChange}
      >
        <MenuItem value="restaurant">Restaurant Partner</MenuItem>
        <MenuItem value="delivery">Delivery Partner</MenuItem>
      </Select>
    </FormControl>

    <Button
      variant="contained"
      onClick={handleSubmit}
      sx={{
        mt: 3,
        bgcolor: 'orange',
        color: 'white',
        '&:hover': { bgcolor: '#e69500' },
        width: { xs: '100%', sm: 'auto' },
      }}
    >
      Submit
    </Button>
  </Grid>
</Grid>

            <Grid container spacing={3} justifyContent="center">
      {[
  {
    img: "https://img.freepik.com/premium-photo/food-delivery-app-fast-service-background-background-images-hd-wallpapers-background-image_976375-11675.jpg",
    slogan: 'Serving smiles every day!',
    review: '"Best delivery experience ever!"',
  },
  {
    img: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/food-delivery-ad-design-template-f1322356747bbef25712aac7d54e945e_screen.jpg?ts=1660970489',
    slogan: 'Fresh food, fast service!',
    review: '"Customers love our speed!"',
  },
  {
    img: 'https://img.freepik.com/premium-photo/poster-pizza-company-that-says-delivery-every-now-now-now-now_640251-52218.jpg',
    slogan: 'Tastes that stay with you.',
    review: '"Highly professional delivery!"',
  },
  {
    img: 'https://th.bing.com/th/id/OIP.NRSTqvVqiNiRXj_Xq85PCwHaNM?r=0&pid=ImgDet&w=184&h=328&c=7&dpr=1.3',
    slogan: 'Delivering delight daily.',
    review: '"Excellent support and growth!"',
  },
].map((item, index) => (
        <Grid item sx={{height:"300px"}} xs={12} sm={6} md={3} key={index} mt={10}>
          <Card sx={{ height: '100%', borderRadius: 3 }}>
            <CardMedia
              component="img"
              image={item.img}
              alt={`partner-${index}`}
              height="160"
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                {item.slogan}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.review}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
            <Footer/>
        </Box>
    )
}