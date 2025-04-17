import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
  IconButton,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StarIcon from "@mui/icons-material/Star";
import data from "./db.json";
import FavoriteIcon from '@mui/icons-material/Favorite';

export const MenuItemDetails = ({ cart, setCart, fav = [], setFav}) => {
  const location = useLocation();
  const category = location.state?.category;
  const id = location.state?.id;

  const filteredItems = data.filter((item) => item.category === category);
  console.log(filteredItems)
  const itemDetails = data.find((item) => item.id === id);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };
  const toggleFav = (item) => {
    const isFav = fav.some(f => f.id === item.id);
    if (isFav) {
      setFav(fav.filter(f => f.id !== item.id));
    } else {
      setFav([...fav, item]);
    }
  };
  return (
    <Box
      sx={{
        mt: "120px",
        px: 2,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Details Section */}
      <Box sx={{ width: "100%", maxWidth: "1200px" }}>
        

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
          {/* Deal Cards */}
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
              display: "flex",
              alignItems: "center",
              borderRadius: "20px",
              border: "1px solid #ddd",
              backgroundColor: "white",
              boxShadow: 1,
              gap: 2,
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                backgroundColor: "#5e35b1",
                color: "white",
                fontWeight: 700,
                fontSize: 12,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
                lineHeight: 1,
              }}
            >
              SAVE
              <br />
              X2
            </Box>

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

      {/* Divider */}
      <Box sx={{ width: "100%", height: "1px", bgcolor: "grey", my: 3 }} />

      {/* Top Picks Section */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 1,
          mb: 2,
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Top picks near you
        </Typography>
      </Box>

      {/* Food Cards */}
      <Box
        sx={{
          width: { xs: "95%", sm: "90%", md: "85%" },
          mx: "auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
          boxSizing: "border-box",
        }}
      >
        {filteredItems.map((item) => (
          <Card
          key={item.id}
          sx={{
            width: { xs: "100%", sm: "200px" },
            height: { lg: "400px", sm: "400px", xs: "auto" },
            borderRadius: "10px",
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: 'relative', // ✅ Add this line
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "translate(-10px, -10px)",
            },
          }}
        >
          {/* ❤️ Favorite icon - moved here */}
          <FavoriteIcon
            onClick={() => toggleFav(item)}
            sx={{
              color: fav.some(f => f.id === item.id) ? "red" : "white",
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 2,
              backgroundColor: 'rgba(0,0,0,0.4)',
              borderRadius: '50%',
              padding: '5px',
              cursor: 'pointer'
            }}
          />
          
          <CardMedia
            component="img"
            sx={{ height: "180px", objectFit: "cover" }}
            image={item.image}
            alt={item.dish_name}
          />
        
          <CardContent
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "flex-start",
              textAlign: "center",
              p: 2,
            }}
          >
            <Typography fontWeight="bold">{item.restaurant_name}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {item.dish_name}
            </Typography>
            <Typography variant="body2">⭐ {item.rating}</Typography>
            <Typography
              variant="h6"
              sx={{ color: "green", marginTop: "10px" }}
            >
              ₹{item.price}
            </Typography>
            <Button
              variant="contained"
              sx={{ bgcolor: "orange", mt: 1 }}
              onClick={() => addToCart(item)}
            >
              Add to Cart
            </Button>
          </CardContent>
        </Card>
        
        ))}
      </Box>
    </Box>
  );
};
