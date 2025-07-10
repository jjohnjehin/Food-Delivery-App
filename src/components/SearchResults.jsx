import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Container
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { appColors, colorUtils } from '../theme/colors';






export const SearchResults = ({ cart, setCart, fav = [], setFav }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = location.state?.query || "";
  
  const [searchValue, setSearchValue] = useState(searchQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Advertisement data
  const advertisements = [
    {
      id: 1,
      title: "Special Weekend Offer",
      description: "Get 50% off on all pizzas this weekend!",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=200&fit=crop",
      discount: "50% OFF",
      category: "Pizza"
    },
    {
      id: 2,
      title: "New Restaurant Alert",
      description: "Try our newest burger joint with amazing deals!",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=200&fit=crop",
      discount: "30% OFF",
      category: "Burger"
    },
    {
      id: 3,
      title: "Healthy Food Week",
      description: "Fresh salads and healthy options available now!",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=200&fit=crop",
      discount: "25% OFF",
      category: "Healthy"
    }
  ];

  useEffect(() => {
    if (searchQuery) {
      performSearch(searchQuery);
      setSearchValue(searchQuery); // Set the search box value to the menu category
    }
  }, [searchQuery]);

  const performSearch = async (query) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const result = await response.json();
      
      const products = Array.isArray(result) && Array.isArray(result[0]?.products)
        ? result[0].products
        : [];

      // Filter products based on search query
      const filtered = products.filter(product => {
        const queryLower = query.toLowerCase();
        const dishName = product.dish_name?.toLowerCase() || '';
        const restaurantName = product.restaurant_name?.toLowerCase() || '';
        const category = product.category?.toLowerCase() || '';
        
        // If it's a menu category search, prioritize category matching
        if (queryLower === category) {
          return true; // Exact category match
        }
        
        // General search across all fields
        return dishName.includes(queryLower) ||
               restaurantName.includes(queryLower) ||
               category.includes(queryLower);
      });

      setSearchResults(filtered);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      performSearch(searchValue.trim());
    }
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const toggleFav = (item) => {
    const isFav = fav.some((f) => f.id === item.id);
    if (isFav) {
      setFav(fav.filter((f) => f.id !== item.id));
    } else {
      setFav([...fav, item]);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: appColors.background.secondary,
        pt: { xs: 2, md: 4 },
        pb: 4,
        marginTop: "100px"
      }}
    >
      <Header cartLength={cart.length} favLength={fav.length} />
      
      <Box sx={{ mt: "120px", px: 2,width:"80%" }}>
        {/* Search Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" fontWeight="bold">
            Search Results
          </Typography>
        </Box>

        {/* Search Input */}
        <Box sx={{ mb: 4 }}>
          <form onSubmit={handleSearchSubmit}>
            <TextField
            sx={{width:"45%"}}
              fullWidth
              placeholder="Search for food, restaurants, or categories..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </form>
        </Box>

        {/* Results */}
        {loading ? (
          <Typography variant="h6" textAlign="center" sx={{ color: appColors.primary.main }}>
            Searching...
          </Typography>
        ) : searchResults.length > 0 ? (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {searchQuery && ['pizza', 'burger', 'pasta', 'noodles', 'dessert', 'beverages'].includes(searchQuery.toLowerCase()) ? 
                `Found ${searchResults.length} ${searchQuery} items` : 
                `Found ${searchResults.length} result(s) for "${searchQuery}"`
              }
            </Typography>
            
            <Grid container spacing={3} sx={{display:"flex",justifyContent:'center'}}>
              {searchResults.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id} sx={{width:"300px"}}>
                  <Card
                    sx={{
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-5px)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.image}
                      alt={item.dish_name}
                      onClick={() => navigate("/Item", {
                        state: { category: item.category, id: item.id, rating: item.rating }
                      })}
                      sx={{ cursor: "pointer" }}
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {item.dish_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {item.restaurant_name}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        ⭐ {item.rating}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: "bold", color: colorUtils.getPriceColor() }}>
                        ₹{item.price}
                      </Typography>
                      
                      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                        <IconButton
                          size="small"
                          onClick={() => toggleFav(item)}
                          sx={{
                            color: colorUtils.getFavoriteColor(fav.some((f) => f.id === item.id)),
                          }}
                        >
                          ❤️
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => addToCart(item)}
                          sx={{ color: colorUtils.getCartColor() }}
                        >
                          🛒
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        ) : searchQuery ? (
          <Typography variant="h6" textAlign="center" color="gray">
            No results found for "{searchQuery}" 😔
          </Typography>
        ) : (
          <Typography variant="h6" textAlign="center" color="gray">
            Enter a search term to find food items
          </Typography>
        )}

        {/* Advertisement Section */}
        <Box sx={{ mt: 6, mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, textAlign: "center" }}>
            Special Offers & Promotions
          </Typography>
          
          <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
            {advertisements.map((ad) => (
              <Grid item xs={12} sm={6} md={4} key={ad.id} sx={{ width: "300px" }}>
                <Card
                  sx={{
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                    },
                  }}
                  onClick={() => {
                    // Navigate to search with the ad category
                    navigate('/search', { state: { query: ad.category } });
                  }}
                >
                  {/* Discount Badge */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      zIndex: 2,
                    }}
                  >
                    <Chip
                      label={ad.discount}
                      color="error"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                      }}
                    />
                  </Box>

                  <CardMedia
                    component="img"
                    height="200"
                    image={ad.image}
                    alt={ad.title}
                    sx={{
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "linear-gradient(45deg, rgba(255,140,0,0.3), rgba(255,69,0,0.3))",
                        zIndex: 1,
                      },
                    }}
                  />

                  <CardContent
                    sx={{
                      position: "relative",
                      zIndex: 2,
                      background: "linear-gradient(135deg, #fff 0%, #f8f9fa 100%)",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {ad.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {ad.description}
                    </Typography>
                    <Typography variant="body2" color="primary" fontWeight="bold">
                      Click to explore {ad.category} items →
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}; 