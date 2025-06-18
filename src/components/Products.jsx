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
import data from "./db.json";
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
export const Products = ({ cart, setCart, fav, setFav }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
  const[loading,setLoading]=useState("")
  const[error,setError]=useState("")
  const[cardData,setCardData]=useState("")

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(""); // Clear previous errors if any
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 2 second delay
        const response = await fetch("http://localhost:3001/products");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setCardData(result);
        console.log(result);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
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
              backgroundImage:
                "url(https://www.clubmahindra.com/blog/media/section_images/desktop62-95dacafc2f6457f.jpg)",
              backgroundPosition: "center",
              backgroundSize: "cover",
              position: "relative",
              padding: { xs: "20px", sm: "40px", md: "50px 200px" },
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
              }}
            >
              Order Your
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontWeight: "700",
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                position: "absolute",
                left: { xs: "1%", sm: "1%", md: "35px" },
                top: { xs: "100px", sm: "140px", md: "170px" },
              }}
            >
              Favourite Food here
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: "0.6rem", sm: "0.7rem", md: "1rem" },
                position: "absolute",
                left: { xs: "1%", sm: "1%", md: "35px" },
                top: { xs: "150px", sm: "185px", md: "250px" },
                maxWidth: { xs: "80%", sm: "70%", md: "60%" },
              }}
            >
              Satisfy your cravings with our delicious, freshly prepared meals
              delivered straight to your doorstep! Experience the best flavors
              in town with fast and reliable service.
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
              }}
            >
              View Menu
            </Button>
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
    name: "Juice",
    image: "https://www.jigsawexplorer.com/puzzles/subjects/fruit-smoothies.jpg",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3pqdDEwMXc2ZTVmZWpmZ3BjaGlkcGhudW9jcWZ3NGJ0c2Fham8zNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/cJtA0LaHjCU4TyFsaM/giphy.gif",
    slogan: "Sip the freshness, feel the vibes 🍹",
    restaurent_name:"Chill Bar",
    price:149,
    dish_name:"Fresh Fruits Mixed"
  },
  {
    name: "Rolls",
    image: "https://th.bing.com/th/id/OIP.sGcCXwOzsqdNddlSfxHNnAHaLG?w=1067&h=1600&rs=1&pid=ImgDetMain",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWo3aW4zMjM4Y2xwejhhaDhlM2NxYmtpMDNkdzlwNmJnMHFtNmU3OSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/6qj3i9pMzObio/giphy.gif",
    slogan: "Wrapped with flavor, rolled with love 🌯",
    restaurent_name:"Hot $pice CafE",
    price:119,
    dish_name:"Spicy Roll"
  },
  {
    name: "Dessert",
    image: "https://www.tasteofhome.com/wp-content/uploads/2018/01/exps21585_THCA153054D10_15_4b.jpg",
    gif: "https://media.giphy.com/media/pmaRPzw1v6zKM/giphy.gif",
    slogan: "Dessert first, drama later 🍨",
    restaurent_name:"Milky World Dairy",
    price:149,
    dish_name:"Margarita Dessert"
  },
  {
    name: "Sandwich",
    image: "https://www.rd.com/wp-content/uploads/2016/03/aol-food-perfect-sandwich-ft.jpg",
    gif: "https://media.giphy.com/media/c6a2kiRrF0Pbq/giphy.gif",
    slogan: "Stacked to slay your cravings 🥪",
    restaurent_name:"Hot Cafe",
    price:99,
    dish_name:"Sandwitch"
  },
  {
    name: "Cake",
    image: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_730,h_913/k/Edit/2023-01-Chocolate-Strawberry-Cakes/chocolate-strawberry-cake-1",
    gif: "https://media.giphy.com/media/osSO5tUr7m7gA/giphy.gif",
    slogan: "Life’s too short. Eat the cake 🎂",
    restaurent_name:"World Cakes",
    price:77,
    dish_name:"Rainbow Cake"
  },
  {
    name: "Pure Veg",
    image: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/u/f/p104827-16484714136241ad75dfa4d.jpg?tr=tr:n-xlarge",
    gif: "https://media.giphy.com/media/3atYlU9uHVBx82vnUR/giphy.gif",
    slogan: "Powered by plants, served with soul 🌱",
    restaurent_name:"Veggies",
    price:129,
    dish_name:"Meals"
  },
  {
    name: "Pasta",
    image: "https://th.bing.com/th/id/OIP.GqLLcYyiMo6MRlBuJQ8JFwHaLH?rs=1&pid=ImgDetMain",
    gif: "https://media.giphy.com/media/13AJJwFqUsdoWY/giphy.gif",
    slogan: "Stay saucy, eat pasta 🍝",
    restaurent_name:"Fozen Cafe",
    price:99,
    dish_name:"Pasta"
  },
  {
    name: "Noodles",
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
    }}
  >
    {/* Image circle */}
    <Box
  onClick={() => navigate('/ExploreMenu', { state: { category: item.name,slogan:item.slogan,image:item.image,restaurent_name:item.restaurent_name,price:item.price,
            dish_name:item.dish_name
   } })}
  sx={{
    width: "100%",
    height: "65%",
    borderRadius: "50%",
    overflow: "hidden",
    position: "relative",
    transition: "transform 0.3s ease-in-out",
    transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
  }}
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
          transition: "opacity 0.3s ease-in-out",
          opacity: hoveredIndex === index ? 0 : 1,
        }}
      />
      {/* Fake GIF layer (can swap with real GIF) */}
      {hoveredIndex === index && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${item.gif})`, // Replace with real gif link if you have
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            animation: "fadeIn 0.3s ease-in-out",
          }}
        />
      )}
    </Box>

    {/* Name */}
    <Typography sx={{ color: "grey", fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>
      {item.name}
    </Typography>
  </Box>
))}

            </Box>

      {/* Top Dishes Header */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "30px" }}>
        <Grid sx={{ width: "83%" }}>
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Top dishes near you
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
    justifyContent: {
      xs: "center",
      sm: "space-between",
      md: "flex-start",
      lg: "space-between",
    },
    marginTop: "20px",
    gap: 3,
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
    cardData.slice(0, 25).map((item, index) => (
      <Card
        key={index}
        sx={{
          width: { lg: "280px", sm: "280px", xs: "280px" },
          height: "250px",
          display: "flex",
          flexDirection: "column",
          justifyContent: { lg: "space-between", xs: "center" },
          marginTop: "30px",
          position: "relative",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "translate(-10px, -10px)",
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
              state: { category: item.category, id: item.id },
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
          <Typography variant="body2">⭐ {item.rating}</Typography>
          <Typography variant="body2" sx={{ fontStyle: "italic" }}>
            {item.slogan.split(" ").length > 3
              ? item.slogan.split(" ").slice(0, 4).join(" ") + "..."
              : item.slogan}
          </Typography>

          <FavoriteIcon
            onClick={() => toggleFav(item)}
            sx={{
              color: fav.some((f) => f.id === item.id) ? "red" : "white",
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
</Box>
      </Box>
      <Footer/>
    </Box>
  );
};
