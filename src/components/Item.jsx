import React from "react";
import { useLocation ,useNavigate} from "react-router-dom";
import { useState } from "react";
import { Box, Card, CardMedia, CardContent, Typography, Button,Stack,Chip,Rating,IconButton } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import StarIcon from '@mui/icons-material/Star';
import data from "./db.json"
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useRef } from "react";
const foodItems = [
  {
    id: 1,
    name: "Plate Shawarma",
    price: 180,
    img: "https://img.freepik.com/premium-photo/fried-chicken-with-french-fries-fire-smoke-dark-background_674594-1601.jpg?w=826",
  },
  {
    id: 2,
    name: "Family Combo 1",
    price: 550,
    img: "https://spoonnspice.com/wp-content/uploads/2023/04/Untitled-design-53.webp",
  },
  {
    id: 3,
    name: "Zinger Burger",
    price: 250,
    img: "https://img.freepik.com/premium-photo/different-flavors-ice-cream-scooped-one-bowl_419341-96071.jpg",
  },
  {
    id: 4,
    name: "Loaded Fries",
    price: 160,
    img: "https://img.freepik.com/premium-photo/blender-with-fruit-flying-isolated-black-background-fruit-juice-splash-generataive-ai_741672-1398.jpg?w=360",
  },
];

export const Item = ({ cart, setCart,fav,setFav }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const cardWidth = container.firstChild?.offsetWidth || 300; // fallback
      container.scrollBy({
        left: direction * (cardWidth + 16), // 16 = gap
        behavior: "smooth",
      });
    }
  };
  
  const location = useLocation();
  const category = location.state?.category;
  console.log(category)
  const id=location.state?.id

  console.log("🔥 Category received:", category);

  // Filter items that match the category
  const filteredItems = data.filter((item) => item.category === category);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };
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
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    {/* Details Section */}
    <Box sx={{ width: "100%", maxWidth: "1000px" }}>
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
            label={`${itemDetails.rating} (478 reviews)`}
            color="success"
            size="small"
            sx={{ color: "white" }}
          />
          <Typography variant="body2">
            • ₹{itemDetails.price * 2 - 49} for two
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
    onClick={()=>{
      console.log(itemDetails.price)
      navigate('/Payment',{
        state: {
          category: total
        }
      })
    }}
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

    {/* Line */}
    <Box sx={{ width: "100%", height: "1px", bgcolor: "grey", my: 3 }} />

    {/* ADDVERTISEMENT */}
    <Box sx={{ my: 4 ,width:{lg:"83%",xs:"300px",sm:"95%"}}}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          mb: 2,
          px: { xs: 1, sm: 2, md: 4 },
          width:"83%"
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Top Picks
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => scroll(-1)}>
            <ArrowBackIos />
          </IconButton>
          <IconButton onClick={() => scroll(1)}>
            <ArrowForwardIos />
          </IconButton>
        </Stack>
      </Stack>

      {/* Scrollable Cards */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          overflow: "hidden", // hide scrollbars
          px: { xs: 1, sm: 2, md: 4 },
          gap: 2,
          width:"83%",
        }}
      >
        {foodItems.map((item) => (
          <Card
            key={item.id}
            sx={{
              flex: "0 0 auto",
              width: {
                xs: "80%",
                sm: "45%", // only 2 cards max
                md: "45%",
              },
              minWidth: "300px",
              borderRadius: 3,
              boxShadow: 3,
              position: "relative",
              backgroundImage: `url(${item.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "350px",
            }}
          >
            {/* <CardMedia
              component="img"
              height="160"
              image={item.img}
              alt={item.name}
              sx={{ objectFit: "cover" ,backgroundRepeat:"no-repeat"}}
            /> */}
            <CardContent>
              <Typography fontWeight="bold" mb={1} sx={{color:"white"}}>
                {item.name}
              </Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography sx={{color:"white"}}>₹{item.price}</Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ background: "#f5f5f5", px: 1, borderRadius: 1 }}
                >
                  <Button size="small">−</Button>
                  <Typography>1</Typography>
                  <Button size="small">+</Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>

    </Box>
    <Box sx={{width:"100%",height:'100px',display:'flex',justifyContent:"center"}}>
      <Box sx={{height:"2px",width:"83%",bgcolor:"grey"}}></Box>
    </Box>
    <Box
      sx={{
        width: "100%",
        // maxWidth: "1200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // px: 1,
        mb: 2,
      }}
    >
      <Box sx={{width:"83%",height:"100%"}}>
      <Typography variant="h5" fontWeight={700}>
        Recommended
      </Typography>
      </Box>
    </Box>

    {/* Food Cards */}
    <Box
  sx={{
    width: { xs: "95%", sm: "90%", md: "85%", lg: "83%" },
    mx: "auto",
    display: "flex",
    flexWrap: "wrap",
    // justifyContent: "center",
    gap: 3,
    boxSizing: "border-box",
  }}
>
  {filteredItems.map((item) => (
    <Card
      key={item.id}
      sx={{
        width: { xs: "280px", sm: "280px", lg: "280px" },
        height:"330px",
        // borderRadius: "10px",
        // boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        transition: "transform 0.3s ease-in-out",
        '&:hover': {
          transform: 'translate(-10px, -10px)',
        },
      }}
    >
      {/* 👇 Image container with fixed height */}
      <Box
        sx={{
          width: "100%",
          height: "180px",
          overflow: "hidden",
          position: "relative", // So heart icon can be positioned inside
          // borderTopLeftRadius: "10px",
          // borderTopRightRadius: "10px",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          image={item.image}
          alt={item.dish_name}
        />

        {/* ❤️ Favorite Icon */}
        <FavoriteIcon
          onClick={() => toggleFav(item)}
          sx={{
            color: fav?.some((f) => f.id === item.id) ? "red" : "gray",
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 2,
            backgroundColor: "#fff",
            borderRadius: "50%",
            padding: "5px",
            cursor: "pointer",
            boxShadow: 1,
          }}
        />
      </Box>

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
          <Button variant="contained"sx={{bgcolor: "white",color: "green",width: { xs: "100%", sm: "auto" },fontWeight: "700"}}onClick={() => {console.log(item?.price);navigate("/Payment", {state: {category: item?.price,id: item?.id}});}}>Buy Now</Button>
      </Box>

      </CardContent>
    </Card>
  ))}
</Box>

  </Box>
  );
};

