import React from "react";
import { useLocation,useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import FavoriteIcon from '@mui/icons-material/Favorite';
import data from "./db.json";

export const ExploreMenu = ({ cart, setCart, fav = [], setFav }) => {
  const navigate=useNavigate()
  const location = useLocation();
  const category = location.state?.category;
  const slogan=location.state?.slogan

  const filteredItems = data.filter((item) => item.category.toLowerCase() === category.toLowerCase());

  console.log(filteredItems);
  console.log(category)

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
      <Box sx={{width:"100%",height:"100px",display:'flex',justifyContent:"center",alignItems:'center'}}>
        <Box sx={{width:"85%",height:"70%"}}>
          <Typography variant="h5" sx={{fontWeight:'700'}}>{category}</Typography>
          <Typography>{slogan}</Typography>
        </Box>
      </Box>

      {/* Top Picks Header */}
      <Box
        sx={{
          width: "100%",
          // maxWidth: "1200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 1,
          mb: 2,
        }}
      >
        <Box sx={{width:"85%",height:"50px"}}>
        <Typography variant="h5" fontWeight={700}>
          Restaurents to explore
        </Typography>
        </Box>
      </Box>

      {/* Food Cards or No Data Message */}
      <Box
        sx={{
          width: { xs: "95%", sm: "90%", md: "85%" },
          mx: "auto",
          display: "flex",
          flexWrap: "wrap",
          // justifyContent: "center",
          gap: 3,
          boxSizing: "border-box",
        }}
      >
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Card
              key={item.id}
              sx={{
                width: { lg: "280px", sm: "280px", xs: "280px" },
                height: "330px",
                // borderRadius: "10px",
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                position: 'relative',
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "translate(-10px, -10px)",
                },
              }}
            >
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
                sx={{ height: "130px", objectFit: "cover" }}
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" }, // column on mobile, row on larger screens
                    gap: 1, // spacing between buttons
                    mt: 1,
                    width: "100%", // ensures it stretches inside the card
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor:"white",
                      color:"orange",
                      width: { xs: "100%", sm: "auto" },
                      fontWeight:"700"}}onClick={() => addToCart(item)}>Add to Cart</Button>
                  <Button variant="contained"sx={{bgcolor: "white",color: "green",width: { xs: "100%", sm: "auto" },fontWeight: "700"}}onClick={() => {console.log(item?.price);navigate("/Payment", {state: {category: item?.price,id: item?.id}});}}>Buy Now</Button></Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography
            variant="h6"
            sx={{ mt: 4, color: "gray", textAlign: "center", width: "100%" }}
          >
            No related items available 😔
          </Typography>
        )}
      </Box>
    </Box>
  );
};
