import {
  Box,
  Typography,
  Grid,
  Button,
  Link,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
// import data from "./db.json";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { Footer } from "./Footer";
import { AISearch } from "./AISearch";
import { appColors, colorUtils } from "../theme/colors";

export const Products = ({ cart, setCart, fav, setFav, filteredItems }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [cyclingIndex, setCyclingIndex] = useState(0); // New state for cycling GIFs
  const [currentSlide, setCurrentSlide] = useState(0); // New state for sliding effect
  const [visibleItems, setVisibleItems] = useState(12); // Show 4 rows initially to ensure complete rows
// const [filteredItems, setFilteredItems] = useState([]);
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const toggleFav = (item) => {
    const isFav = fav.some((f) => f.id === item.id);
    if (isFav) {
      setFav(fav.filter((f) => f.id !== item.id));
    } else {
      setFav([...fav, item]);
    }
  };

  const handleShowMore = () => {
    setVisibleItems(prev => prev + 9); // Add 3 more rows (9 items)
  };

  const handleShowLess = () => {
    setVisibleItems(12); // Reset to initial 4 rows
  };
  const[loading,setLoading]=useState("")
  const[error,setError]=useState("")
  const[cardData,setCardData]=useState("")
  const[showAISearch,setShowAISearch]=useState(false)
console.log("DATAAAAAA:",cardData);

  const navigate = useNavigate();
  
  // Sliding items array
  const slidingItems = [
    {
      title: "Order Your",
      subtitle: "Favourite Food here",
      description: "Satisfy your cravings with our delicious, freshly prepared meals delivered straight to your doorstep! Experience the best flavors in town with fast and reliable service.",
      backgroundImage: "url(https://www.clubmahindra.com/blog/media/section_images/desktop62-95dacafc2f6457f.jpg)"
    },
    {
      title: "Fresh & Healthy",
      subtitle: "Organic Ingredients",
      description: "We use only the finest organic ingredients to create meals that are not just delicious but also nutritious. Your health is our priority!",
      backgroundImage: "url(https://learningmole.com/wp-content/uploads/2022/08/ice-cream.jpg)"
    },
    {
      title: "Fast Delivery",
      subtitle: "30 Minutes or Free",
      description: "We guarantee delivery within 30 minutes or your order is free! Our dedicated team ensures your food arrives hot and fresh every time.",
      backgroundImage: "url(https://mir-s3-cdn-cf.behance.net/project_modules/1400/639c1d130651399.6184869704c80.jpg)"
    },
    {
      title: "Best Prices",
      subtitle: "Quality Meets Affordability",
      description: "Enjoy restaurant-quality food at prices that won't break the bank. We believe great food should be accessible to everyone!",
      backgroundImage: "url(https://img.freepik.com/premium-photo/dessert-table-chocolate-cake_41969-17647.jpg)"
    }
  ];
  
  // Cycling GIF effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCyclingIndex((prevIndex) => (prevIndex + 1) % 8); // Cycle through 8 items
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Sliding effect
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 4); // Cycle through 4 items
    }, 5000); // Change every 5 seconds

    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch("http://localhost:5000/api/john/products");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      console.log("📦 Data received:", result); // <-- Debug this!

      setCardData(result.products[0].products); // or result.products based on backend
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);




  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "100px" }}>
      {/* Hero Section */}
      <Box sx={{ width: "100%", height: "450px", marginTop: "120px" }}>
        <Box
          sx={{
            width: "100%",
            height: { xs: "300px", sm: "350px", md: "450px" },
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Grid
            sx={{
              width: "83%",
              height: "100%",
              borderRadius: "10px",
              backgroundImage: slidingItems[currentSlide].backgroundImage,
              backgroundPosition: "center",
              backgroundSize: "cover",
              position: "relative",
              padding: { xs: "20px", sm: "40px", md: "50px 200px" },
              transition: "background-image 0.8s ease-in-out",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: "700",
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                position: "absolute",
                left: { xs: "1%", sm: "1%", md: "35px" },
                top: { xs: "70px", sm: "80px", md: "100px" },
                opacity: 1,
                transform: "translateY(0)",
                transition: "all 0.6s ease-in-out",
              }}
            >
              {slidingItems[currentSlide].title}
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontWeight: "700",
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                position: "absolute",
                left: { xs: "1%", sm: "1%", md: "35px" },
                top: { xs: "100px", sm: "140px", md: "170px" },
                opacity: 1,
                transform: "translateY(0)",
                transition: "all 0.6s ease-in-out",
              }}
            >
              {slidingItems[currentSlide].subtitle}
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: "0.6rem", sm: "0.7rem", md: "1rem" },
                position: "absolute",
                left: { xs: "1%", sm: "1%", md: "35px" },
                top: { xs: "150px", sm: "185px", md: "250px" },
                maxWidth: { xs: "80%", sm: "70%", md: "60%" },
                opacity: 1,
                transform: "translateY(0)",
                transition: "all 0.6s ease-in-out",
              }}
            >
              {slidingItems[currentSlide].description}
            </Typography>
            <Button
              variant="contained"
              sx={{
                position: "absolute",
                left: { xs: "1%", sm: "1%", md: "35px" },
                top: { xs: "240px", sm: "250px", md: "350px" },
                bgcolor: "white",
                color: "black",
                borderRadius: "30px",
                fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                padding: { xs: "5px 10px", sm: "8px 15px", md: "10px 20px" },
                transition: "all 0.6s ease-in-out",
                mr: 2
              }}
            >
              View Menu
            </Button>
            <Button
              variant="contained"
              onClick={() => setShowAISearch(true)}
              sx={{
                position: "absolute",
                left: { xs: "120px", sm: "140px", md: "200px" },
                top: { xs: "240px", sm: "250px", md: "350px" },
                bgcolor: "primary.main",
                color: "white",
                borderRadius: "30px",
                fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                padding: { xs: "5px 10px", sm: "8px 15px", md: "10px 20px" },
                transition: "all 0.6s ease-in-out",
                "&:hover": {
                  bgcolor: "primary.dark",
                  transform: "scale(1.05)"
                }
              }}
            >
              AI Search
            </Button>
            
            {/* Slide indicators */}
            <Box
              sx={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "8px",
              }}
            >
              {slidingItems.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: currentSlide === index ? "white" : "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </Box>
          </Grid>
        </Box>
      </Box>

      {/* Menu Header */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Grid sx={{ width: "83%" }}>
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Explore our menu
          </Typography>
        </Grid>
      </Box>

      {/* Dishes */}
      <Box
        sx={{
          width: "83%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: { xs: 1.5, sm: 2, md: 3 }

        }}
      ></Box>

      {/* Divider */}
      <Box sx={{ width: "83%", borderBottom: "1px solid grey", marginTop: "20px" }} />
      <Box sx={{width: "83%",height: "auto",display: "flex",flexWrap: "wrap",justifyContent: "center",gap: { xs: 1.5, sm: 2, md: 3 }}}>
            {[
  {
    category: "Juice",
    image: "https://www.jigsawexplorer.com/puzzles/subjects/fruit-smoothies.jpg",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3pqdDEwMXc2ZTVmZWpmZ3BjaGlkcGhudW9jcWZ3NGJ0c2Fham8zNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/cJtA0LaHjCU4TyFsaM/giphy.gif",
    slogan: "Sip the freshness, feel the vibes 🍹",
    restaurent_name:"Chill Bar",
    price:149,
    dish_name:"Fresh Fruits Mixed"
  },
  {
    category: "Rolls",
    image: "https://th.bing.com/th/id/OIP.sGcCXwOzsqdNddlSfxHNnAHaLG?w=1067&h=1600&rs=1&pid=ImgDetMain",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWo3aW4zMjM4Y2xwejhhaDhlM2NxYmtpMDNkdzlwNmJnMHFtNmU3OSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/6qj3i9pMzObio/giphy.gif",
    slogan: "Wrapped with flavor, rolled with love 🌯",
    restaurent_name:"Hot $pice CafE",
    price:119,
    dish_name:"Spicy Roll"
  },
  {
    category: "Dessert",
    image: "https://www.tasteofhome.com/wp-content/uploads/2018/01/exps21585_THCA153054D10_15_4b.jpg",
    gif: "https://media.giphy.com/media/pmaRPzw1v6zKM/giphy.gif",
    slogan: "Dessert first, drama later 🍨",
    restaurent_name:"Milky World Dairy",
    price:149,
    dish_name:"Margarita Dessert"
  },
  {
    category: "Sandwich",
    image: "https://www.rd.com/wp-content/uploads/2016/03/aol-food-perfect-sandwich-ft.jpg",
    gif: "https://media.giphy.com/media/c6a2kiRrF0Pbq/giphy.gif",
    slogan: "Stacked to slay your cravings 🥪",
    restaurent_name:"Hot Cafe",
    price:99,
    dish_name:"Sandwitch"
  },
  {
    category: "Cake",
    image: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_730,h_913/k/Edit/2023-01-Chocolate-Strawberry-Cakes/chocolate-strawberry-cake-1",
    gif: "https://media.giphy.com/media/osSO5tUr7m7gA/giphy.gif",
    slogan: "Life's too short. Eat the cake 🎂",
    restaurent_name:"World Cakes",
    price:77,
    dish_name:"Rainbow Cake"
  },
  {
    category: "Pure Veg",
    image: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/u/f/p104827-16484714136241ad75dfa4d.jpg?tr=tr:n-xlarge",
    gif: "https://media.giphy.com/media/3atYlU9uHVBx82vnUR/giphy.gif",
    slogan: "Powered by plants, served with soul 🌱",
    restaurent_name:"Veggies",
    price:129,
    dish_name:"Meals"
  },
  {
    category: "Pasta",
    image: "https://th.bing.com/th/id/OIP.GqLLcYyiMo6MRlBuJQ8JFwHaLH?rs=1&pid=ImgDetMain",
    gif: "https://media.giphy.com/media/13AJJwFqUsdoWY/giphy.gif",
    slogan: "Stay saucy, eat pasta 🍝",
    restaurent_name:"Fozen Cafe",
    price:99,
    dish_name:"Pasta"
  },
  {
    category: "Noodles",
    image: "https://thebigmansworld.com/wp-content/uploads/2022/11/korean-spicy-noodles2.jpg",
    gif: "https://media.giphy.com/media/Z2IoReHYnRxyU/giphy.gif",
    slogan: "Slurp mode: activated 🍜",
    restaurent_name:"Chinese Spot",
    price:79,
    dish_name:"Spicy Noodles"
  }
]
.map((item, index) => (
  <Box
    key={index}
    onMouseEnter={() => setHoveredIndex(index)}
    onMouseLeave={() => setHoveredIndex(null)}
    sx={{
      width: { xs: "22%", sm: "23%", md: "15%", lg: "10%" },
      height: { xs: "100px", sm: "190px", md: "200px" },
      display: 'flex',
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: 'space-around',
      position: "relative",
      marginTop:"30px"
    }}
  >
    {/* Image circle */}
    <Box
  sx={{
    width: "100%",
    height: "65%",
    borderRadius: "50%",
    overflow: "hidden",
    position: "relative",
    transition: "transform 5s ease-in-out",
    transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
  }}
  onClick={() =>
            navigate("/Item", {
              state: { category: item.category, id: item.id },
            })}
>

      {/* Static background image */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${item.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transition: "opacity 5s ease-in-out",
          opacity: (hoveredIndex === index || cyclingIndex === index) ? 0 : 1
        }}
      />
      {/* GIF layer - shows on hover OR when cycling */}
      {(hoveredIndex === index || cyclingIndex === index) && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${item.gif})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            animation: "fadeIn 5s ease-in-out",
          }}
        />
      )}
    </Box>

    {/* Name */}
    <Typography sx={{ color: "grey", fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>
      {item.category}
    </Typography>
  </Box>
))}

            </Box>

      {/* Top Dishes Header */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "30px" }}>
        <Grid sx={{ width: "83%" }}>
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Top dishes near me
          </Typography>
        </Grid>
      </Box>

      {/* Food Cards */}
      <Box sx={{width:"100%",display:"flex",justifyContent:"center",height:"100%"}}>
      <Box
  sx={{
    width: "83%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "20px",
    gap: 3
  }}
>
  {loading && (
    <Typography
      variant="h6"
      sx={{
        width: "100%",
        textAlign: "center",
        marginTop: "20px",
        color: "black",
      }}
    >
      Loading products...
    </Typography>
  )}

  {error && (
    <Typography
      variant="h6"
      sx={{
        width: "100%",
        textAlign: "center",
        marginTop: "20px",
        color: "red",
      }}
    >
      {error}
    </Typography>
  )}

  {Array.isArray(cardData) &&
    !loading &&
    !error &&
    (filteredItems.length > 0 ? filteredItems : cardData.slice(0, visibleItems)).map((item, index) => (
      <Card
        key={index}
        sx={{
          width: "300px",
          height: "250px",
          display: "flex",
          flexDirection: "column",
          justifyContent: { lg: "space-between", xs: "center" },
          marginTop: "30px",
          position: "relative",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          transformStyle: "preserve-3d",
          perspective: "1000px",
          "&:hover": {
            transform: "translateY(-15px) scale(1.02) rotateX(5deg) rotateY(-5deg)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          },
        }}
      >
        <CardMedia
          component="img"
          sx={{ height: "130px", objectFit: "cover" }}
          image={item.image}
          alt={item.dish_name}
          onClick={() =>
            navigate("/Item", {
              state: { category: item.category, id: item.id,rating:item.rating },
            })
          }
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            padding: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: item.restaurant_name?.length > 3 ? "15px" : "20px",
              fontWeight: "bold",
            }}
          >
            {item.restaurant_name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {item.dish_name}
          </Typography>
          <Typography variant="body2" sx={{ color: colorUtils.getStarColor() }}>⭐ {item.rating}</Typography>
          <Typography variant="body2" sx={{ fontStyle: "italic" }}>
  {(() => {
    const words = item.slogan?.split(" ") || [];
    return words.length > 4 ? words.slice(0, 4).join(" ") + "..." : item.slogan;
  })()}
</Typography>
          <FavoriteIcon
            onClick={() => toggleFav(item)}
            sx={{
              color: colorUtils.getFavoriteColor(fav.some((f) => f.id === item.id)),
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 2,
              backgroundColor: "rgba(0,0,0,0.4)",
              borderRadius: "50%",
              padding: "5px",
              cursor: "pointer",
            }}
          />
        </CardContent>
      </Card>
    ))}
    
    {/* Show More/Less Buttons */}
    {Array.isArray(cardData) && 
     !loading && 
     !error && (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginTop: "30px",
          marginBottom: "20px",
        }}
      >
        {/* Show More Button */}
        {(filteredItems.length > 0 ? filteredItems.length : cardData.length) > visibleItems && (
          <Button
            variant="contained"
            onClick={handleShowMore}
            sx={{
              bgcolor: "rgba(25, 118, 210, 0.1)",
              color: "#1976d2",
              borderRadius: "25px",
              padding: "12px 30px",
              fontSize: "16px",
              fontWeight: "600",
              textTransform: "none",
              border: "1px solid rgba(25, 118, 210, 0.3)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                bgcolor: "rgba(25, 118, 210, 0.2)",
                color: "#1565c0",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 16px rgba(25, 118, 210, 0.2)",
                border: "1px solid rgba(25, 118, 210, 0.5)",
              },
            }}
          >
            Show More
          </Button>
        )}
        
        {/* Show Less Button */}
        {visibleItems > 12 && (
          <Button
            variant="outlined"
            onClick={handleShowLess}
            sx={{
              borderColor: "rgba(25, 118, 210, 0.3)",
              color: "#1976d2",
              bgcolor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "25px",
              padding: "12px 30px",
              fontSize: "16px",
              fontWeight: "600",
              textTransform: "none",
              borderWidth: "2px",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                borderColor: "rgba(25, 118, 210, 0.5)",
                color: "#1565c0",
                bgcolor: "rgba(255, 255, 255, 0.2)",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(25, 118, 210, 0.15)",
              },
            }}
          >
            Show Less
          </Button>
        )}
      </Box>
    )}
</Box>
      </Box>

      {/* Advertisement Cards Section */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "50px", marginBottom: "30px" }}>
        <Box sx={{ width: "83%", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3 }}>
          {/* Advertisement Card 1 */}
          <Card
            sx={{
              width: "300px",
              height: "200px",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
              },
            }}
          >
            <CardMedia
              component="img"
              sx={{ height: "100%", objectFit: "cover" }}
              image="https://www.bdtask.com/blog/assets/plugins/ckfinder/core/connector/php/uploads/images/make-a-food-combo-by-combining-high-and-low-performing-items.jpg"
              alt="Special Offer"
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                color: "white",
                padding: "20px",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                🍕 50% OFF
              </Typography>
              <Typography variant="body2">
                On all pizzas this weekend!
              </Typography>
            </Box>
          </Card>

          {/* Advertisement Card 2 */}
          <Card
            sx={{
              width: "300px",
              height: "200px",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
              },
            }}
          >
            <CardMedia
              component="img"
              sx={{ height: "100%", objectFit: "cover" }}
              image="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Free Delivery"
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                color: "white",
                padding: "20px",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                🚚 Free Delivery
              </Typography>
              <Typography variant="body2">
                On orders above ₹299
              </Typography>
            </Box>
          </Card>

          {/* Advertisement Card 3 */}
          <Card
            sx={{
              width: "300px",
              height: "200px",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
              },
            }}
          >
            <CardMedia
              component="img"
              sx={{ height: "100%", objectFit: "cover" }}
              image="https://www.frugalandthriving.com.au/wp-content/uploads/2023/01/dessert-platter.jpg"
              alt="New Restaurant"
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                color: "white",
                padding: "20px",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                🆕 New Restaurant
              </Typography>
              <Typography variant="body2">
                Try our latest partner!
              </Typography>
            </Box>
          </Card>

          {/* Advertisement Card 4 */}
          <Card
            sx={{
              width: "300px",
              height: "200px",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
              },
            }}
          >
            <CardMedia
              component="img"
              sx={{ height: "100%", objectFit: "cover" }}
              image="https://www.bdtask.com/blog/assets/plugins/ckfinder/core/connector/php/uploads/images/allow-customize-combo-depending-on-your-customers-choice.jpg"
              alt="Weekend Special"
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                color: "white",
                padding: "20px",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                🎉 Weekend Special
              </Typography>
              <Typography variant="body2">
                Exclusive deals every weekend
              </Typography>
            </Box>
          </Card>
        </Box>
      </Box>

      {/* AI Search Component */}
      {showAISearch && (
        <AISearch />
      )}

      <Footer/>
    </Box>
  );
};
