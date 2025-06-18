import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Footer } from "./Footer";
export const Item = ({ cart, setCart, fav = [], setFav }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const slogan = location.state?.slogan;
  const category = location.state?.category || "";
  const image=location.state?.image
  const restaurent_name=location.state?.restaurent_name
  const dish_name=location.state?.dish_name
  const price=location.state?.price

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cardData, setCardData] = useState([]);

 useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await fetch("http://localhost:3001/products");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log(result); // Log the result to check its structure
        // Ensure result is an array
        if (!Array.isArray(result)) {
          throw new TypeError("Expected an array from the API response");
        }
        const filtered = category
          ? result.filter(
              (item) =>
                item.category?.toLowerCase() === category.toLowerCase()
            )
          : result;
        setCardData(filtered);
        console.log(filtered);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category]);

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
  
   const FOUR_HOURS_IN_SECONDS = 4 * 60 * 60;
  const [secondsLeft, setSecondsLeft] = useState(FOUR_HOURS_IN_SECONDS);
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // clean up
  }, []);
  const formatTime = (secs) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    return `${String(hours).padStart(2, '0')}h:${String(minutes).padStart(
      2,
      '0'
    )}m:${String(seconds).padStart(2, '0')}s`;
  };
 const settings = {
    arrows: true,   
    dots: true,    
    infinite: true,
    speed: 500,
    autoplay: true,       
    autoplaySpeed: 2000, 
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const images = [
  {
    url: "https://static.vecteezy.com/system/resources/previews/022/454/679/non_2x/mix-fruit-juice-in-a-glass-with-fresh-fruits-generative-ai-free-photo.jpg",
    slogan: "Freshness in Every Sip 🍓🍊",
    price: "120",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/5fdae31100d35c18cdbbd534/1663502974402-Q5P1NCEZ9QIN6Q47HFFO/IMG_1364.JPG",
    slogan: "Deliciously Homemade Flavours 🍽️",
    price: "180",
  },
  {
    url: "https://img.freepik.com/premium-photo/yummy-french-fries_693425-7982.jpg",
    slogan: "Crispy Fries, Happy Vibes 🍟",
    price: "99",
  },
];


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
      <Box sx={{ width: "100%", height: "100px", display: 'flex', justifyContent: "center", alignItems: 'center' }}>
        <Box sx={{ width: "78%", height: "70%" }}>
          <Typography variant="h4" sx={{ fontWeight: '700',fontsize:"20px" }}>Deals You Can't Miss</Typography>
        </Box>
      </Box>
      <Box sx={{ width: "100%", height: "350px", display: "flex", justifyContent: "center" }}>
      <Grid sx={{ width: "78%", height: "100%", bgcolor: "pink", overflow: "hidden", borderRadius: "20px" }}>
        <Slider {...settings}>
          {images.map((item, index) => (
            <Box key={index} sx={{ position: "relative" }}>
              <img
                src={item.url}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "350px",
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  p: 2,
                  textAlign: "center",
                  borderBottomLeftRadius: "20px",
                  borderBottomRightRadius: "20px",height:"70px",width:'100%'
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {item.slogan}
                </Typography>
                <Typography variant="subtitle1">Buy Two for <span style={{fontSize:"25px"}}>₹{parseInt(item.price.replace("₹", "")) * 2 - 39}</span></Typography>
                <Button variant="contained" sx={{bgcolor:'yellow',color:'black',position:'absolute',right:"80px",top:"35px"}} onClick={() => {
                      console.log(item?.price);
                      navigate("/Payment", {
                        state: { category: item?.price, id: item?.id }
                      });
                    }}>Buy Now</Button>
              </Box>
            </Box>
          ))}
        </Slider>
      </Grid>
    </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 1,
          mb: 2,marginTop:"50px"
        }}
      >
        <Box sx={{ width: "78%", height: "50px" }}>
          <Typography variant="h5" fontWeight={700}>
            Restaurents to explore
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: { xs: "95%", sm: "90%", md: "85%" },
          mx: "auto",
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          boxSizing: "border-box",justifyContent:"center"
        }}
      >
        {cardData.length > 0 ? (
          cardData.map((item) => (
            <Card
              key={item.id}
              sx={{
                width: { lg: "280px", sm: "280px", xs: "280px" },
                height: "330px",
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
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 1,
                    mt: 1,
                    width: "100%",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "white",
                      color: "orange",
                      width: { xs: "100%", sm: "auto" },
                      fontWeight: "700"
                    }}
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "white",
                      color: "green",
                      width: { xs: "100%", sm: "auto" },
                      fontWeight: "700"
                    }}
                    onClick={() => {
                      console.log(item?.price);
                      navigate("/Payment", {
                        state: { category: item?.price, id: item?.id }
                      });
                    }}
                  >
                    Buy Now
                  </Button>
                </Box>
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
      <Footer/>
    </Box>
  );
};
