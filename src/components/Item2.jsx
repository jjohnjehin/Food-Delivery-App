import React from "react";
import { useLocation ,useNavigate} from "react-router-dom";
import { useState } from "react";
import { Box, Card, CardMedia, CardContent, Typography, Button,Stack,Chip,Rating,IconButton } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import StarIcon from '@mui/icons-material/Star';
import data from "./db.json"
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const Item2 = ({ cart, setCart,fav,setFav }) => {
  const location = useLocation();
  const category = location.state?.category;
  const id=location.state?.id

  console.log("🔥 Category received:", category);

  // Filter items that match the category
//   const filteredItems = data.filter((item) => item.category === category);

//   const addToCart = (item) => {
//     setCart([...cart, item]);
//   };
  const itemDetails = data.find((item) => item.id === id);

console.log(itemDetails?.restaurant_name);
const toggleFav = (item) => {
  const isFav = fav.some((f) => f.id === item.id);
  if (isFav) {
    setFav(fav.filter((f) => f.id !== item.id));
  } else {
    setFav([...fav, item]);
  }
};
const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const tax = Math.floor((itemDetails?.price || 0) * 0.05);
  const total = (itemDetails?.price || 0) * quantity + tax;
  const navigate=useNavigate()


  return (
    <Box
    sx={{
      mt: "120px",
      px: 2,
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    {/* Details Section */}
    <Box sx={{ width: "100%", maxWidth: "1200px" }}>
    <Card
      sx={{
        borderRadius: 4,
        mb: 3,
        boxShadow: 3,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: { md: 250 },
      }}
    >
      {/* Column 1: Image */}
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box
          component="img"
          src={itemDetails?.image}
          alt={itemDetails?.dish_name}
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: 3,
            maxHeight: 200,
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Column 2: Details */}
      <CardContent
        sx={{
          flex: 1,
          width: { xs: "100%", md: "40%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {itemDetails ? (
          <Typography variant="h5" fontWeight={600}>
            {itemDetails.restaurant_name}
          </Typography>
        ) : (
          <Typography variant="h6" color="error">
            Restaurant not found
          </Typography>
        )}

        <Stack direction="row" spacing={2} alignItems="center" mt={1}>
          <Chip
            icon={<StarIcon sx={{ color: "white" }} />}
            label={`${itemDetails?.rating} (478 reviews)`}
            color="success"
            size="small"
            sx={{ color: "white" }}
          />
          <Typography variant="body2">
            • ₹{itemDetails?.price * 2 - 49} for two
          </Typography>
        </Stack>

        <Typography sx={{ color: "red", mt: 1 }}>
          {itemDetails?.dish_name}
        </Typography>

        <Typography variant="body2" mt={1}>
          <strong>Outlet:</strong> Veppamoodu
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} mt={1}>
          <AccessTimeIcon fontSize="small" />
          <Typography variant="body2">30–35 mins</Typography>
        </Stack>
      </CardContent>

      {/* Column 3: Bill Summary */}
      <Box
  sx={{
    width: "100%", // Full width on small screens
    maxWidth: { md: "30%",xs:"90%",sm:"90%" }, // Restrict width only on medium and up
    borderTop: { xs: "1px solid #ddd", md: "none" }, // Top border on mobile
    borderLeft: { md: "1px solid #ddd" }, // Left border on desktop
    mt: { xs: 2, md: 0 }, // Top margin only on mobile
    p: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }}
>
  <Box>
    <Typography variant="h6" fontWeight="bold" mb={1}>
      Bill Summary
    </Typography>

    {/* Quantity Selector */}
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
      mb={1}
      flexWrap="wrap"
    >
      <Typography>Quantity</Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <Button variant="outlined" size="small" onClick={handleDecrease}>
          -
        </Button>
        <Typography>{quantity}</Typography>
        <Button variant="outlined" size="small" onClick={handleIncrease}>
          +
        </Button>
      </Stack>
    </Stack>

    <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
      <Typography>Price</Typography>
      <Typography>₹{itemDetails?.price * quantity}</Typography>
    </Stack>
    <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
      <Typography>Tax</Typography>
      <Typography>₹{tax}</Typography>
    </Stack>
    <Stack direction="row" justifyContent="space-between" mt={1} flexWrap="wrap">
      <Typography fontWeight="bold">Total</Typography>
      <Typography fontWeight="bold">₹{total}</Typography>
    </Stack>
  </Box>

  <Button
  variant="contained"
  color="success"
  sx={{ mt: 2, width: "100%" }}
  onClick={() => navigate('/Payment', { state: { total } })}
>
  Proceed
</Button>
</Box>

    </Card>

      {/* Deals Section */}
      <Typography variant="h6" fontWeight={600} mb={1}>
        Deals for you
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          pb: 1,
          width: "100%",
        }}
      >
        <Card
          sx={{
            minWidth: 220,
            flexShrink: 0,
            p: 2,
            display: "flex",
            gap: 2,
            alignItems: "center",
            backgroundColor: "#ede7f6",
          }}
        >
          <Chip label="SAVE X2" color="primary" size="small" />
          <Box>
            <Typography fontWeight={600}>Extra ₹20 Off</Typography>
            <Typography variant="body2" color="text.secondary">
              Applicable over & above coupons
            </Typography>
          </Box>
        </Card>

        <Card
          sx={{
            minWidth: 220,
            flexShrink: 0,
            p: 2,
            display: "flex",
            gap: 2,
            alignItems: "center",
            backgroundColor: "#fff3e0",
          }}
        >
          <Chip
            icon={<LocalOfferIcon />}
            label="%"
            color="warning"
            size="small"
          />
          <Box>
            <Typography fontWeight={600}>40% Off Upto ₹80</Typography>
            <Typography variant="body2" color="text.secondary">
              USE SWIGGYIT
            </Typography>
          </Box>
        </Card>
        <Card
  sx={{
    minWidth: 250,
    p: 2,
    display: 'flex',
    alignItems: 'center',
    borderRadius: '20px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    boxShadow: 1,
    gap: 2,
    flexShrink: 0,
  }}
>
  {/* Left badge */}
  <Box
    sx={{
      width: 50,
      height: 50,
      backgroundColor: '#5e35b1',
      color: 'white',
      fontWeight: 700,
      fontSize: 12,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      lineHeight: 1,
    }}
  >
    SAVE<br />X2
  </Box>

  {/* Text content */}
  <Box>
    <Typography fontWeight="bold" fontSize="1rem">
      Extra ₹66 Off
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Applicable over & above coupons
    </Typography>
  </Box>
</Card>

      </Box>
    </Box>

    

    
    

  </Box>
  );
};

