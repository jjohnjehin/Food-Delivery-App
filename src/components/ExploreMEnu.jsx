import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  Divider,
  Chip,
  IconButton,
  Avatar,
  LinearProgress,
  Alert,
  Container,
  Paper,
  Badge,
  Tooltip,
  Skeleton,
  Fade,
  Zoom
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ShoppingCart as CartIcon,
  LocalOffer as OfferIcon,
  AccessTime as TimeIcon,
  Star as StarIcon,
  Restaurant as RestaurantIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Share as ShareIcon,
  Visibility as ViewIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  TrendingUp as TrendingIcon,
  Bolt as FlashIcon,
  LocalShipping as ShippingIcon,
  Payment as PaymentIcon,
  Security as SecurityIcon
} from "@mui/icons-material";
import { Footer } from "./Footer";
import { appColors, colorUtils } from '../theme/colors';

export const ExploreMenu = ({ cart, setCart, fav = [], setFav }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id;
  const slogan = location.state?.slogan;
  const category = location.state?.category || "";
  const image = location.state?.image;
  const restaurent_name = location.state?.restaurent_name;
  const dish_name = location.state?.dish_name;
  const price = location.state?.price;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cardData, setCardData] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();

        const products = Array.isArray(result) && Array.isArray(result[0]?.products)
          ? result[0].products
          : [];

        const filtered = category
          ? products.filter(
              (item) =>
                item.category?.toLowerCase() === category.toLowerCase()
            )
          : products;

        setCardData(filtered);
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

    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#f5f5f5', 
      pt: 12,
      marginTop: "100px"
    }}>
      {/* Hero Section with Offer Banner */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Fade in timeout={800}>
          <Paper
            elevation={8}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 4,
              overflow: 'hidden',
              position: 'relative',
              mb: 4
            }}
          >
            <Box sx={{ position: 'absolute', top: 0, right: 0, width: 200, height: 200, opacity: 0.1 }}>
              <FlashIcon sx={{ fontSize: 200, color: 'white' }} />
            </Box>
            
            <Grid container sx={{ minHeight: 300 }}>
              <Grid item xs={12} md={6} sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Chip
                  icon={<OfferIcon />}
                  label="SPECIAL OFFER"
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    color: 'white', 
                    mb: 2,
                    fontWeight: 'bold'
                  }}
                />
                
                <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
                  {category}
                </Typography>
                
                <Typography variant="h5" sx={{ color: 'white', mb: 2, opacity: 0.9 }}>
                  {dish_name}
                </Typography>
                
                <Typography variant="body1" sx={{ color: 'white', mb: 3, opacity: 0.8 }}>
                  {restaurent_name} • {slogan}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {formatPrice(price)}
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'line-through' }}>
                    {formatPrice(price * 1.5)}
                  </Typography>
                </Box>
                
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: '#667eea',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)',
                      transform: 'translateY(-2px)',
                      boxShadow: 4
                    },
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => navigate("/PaymentDetails")}
                >
                  Order Now
                </Button>
              </Grid>
              
              <Grid item xs={12} md={6} sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box
                  sx={{
                    width: '80%',
                    height: '80%',
                    borderRadius: 4,
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    boxShadow: 8,
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: 4,
                      background: 'linear-gradient(45deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%)'
                    }
                  }}
                />
                
                {/* Countdown Timer */}
                <Paper
                  sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    bgcolor: 'rgba(255,255,255,0.95)',
                    borderRadius: 3,
                    p: 2,
                    textAlign: 'center',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
                    Sale Ends In
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#e74c3c' }}>
                    {formatTime(secondsLeft)}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Fade>

        {/* Payment Summary Section */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box sx={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}>
                  <RestaurantIcon sx={{ fontSize: 120 }} />
                </Box>
                
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                  🍽️ {dish_name}
                </Typography>
                
                <Typography variant="h6" sx={{ mb: 2, opacity: 0.9 }}>
                  {restaurent_name}
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
                  {slogan}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <StarIcon sx={{ color: '#ffd700' }} />
                  <Typography variant="body2">4.8 (2.5k reviews)</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationIcon />
                  <Typography variant="body2">Free delivery • 25-35 min</Typography>
                </Box>
              </Paper>
            </Fade>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Fade in timeout={1200}>
              <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#2c3e50' }}>
                  💳 Payment Summary
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography>Quantity</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                        sx={{ bgcolor: '#f8f9fa' }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography sx={{ minWidth: 30, textAlign: 'center' }}>
                        {selectedQuantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                        sx={{ bgcolor: '#f8f9fa' }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Subtotal</Typography>
                    <Typography>{formatPrice(price * selectedQuantity)}</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Delivery Fee</Typography>
                    <Typography color="success.main">Free</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Taxes</Typography>
                    <Typography>{formatPrice((price * selectedQuantity) * 0.05)}</Typography>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      Total
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#e74c3c' }}>
                      {formatPrice((price * selectedQuantity) * 1.05)}
                    </Typography>
                  </Box>
                </Box>
                
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    bgcolor: '#e74c3c',
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 'bold',
                    '&:hover': {
                      bgcolor: '#c0392b',
                      transform: 'translateY(-2px)',
                      boxShadow: 4
                    },
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => navigate("/PaymentDetails")}
                >
                  <PaymentIcon sx={{ mr: 1 }} />
                  Pay {formatPrice((price * selectedQuantity) * 1.05)}
                </Button>
              </Paper>
            </Fade>
          </Grid>
        </Grid>

        {/* Related Dishes Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#2c3e50' }}>
            🍽️ Related Dishes
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
            Discover more delicious options from {restaurent_name}
          </Typography>
        </Box>

        {/* Loading State */}
        {loading && (
          <Grid container spacing={3}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item} sx={{bgcolor:"red",width:"300px"}}>
                <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
                  <Skeleton variant="rectangular" height={200} />
                  <CardContent>
                    <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
                    <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
                    <Skeleton variant="text" height={16} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Error State */}
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {/* Related Dishes Grid */}
        {!loading && !error && (
          <Grid container spacing={3}>
            {cardData.length > 0 ? (
              cardData.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <Zoom in timeout={300 + index * 100}>
                    <Card
                      sx={{
                        width: "300px",
                        borderRadius: 3,
                        overflow: 'hidden',
                        boxShadow: 3,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: 8,
                          '& .card-media': {
                            transform: 'scale(1.05)'
                          }
                        }
                      }}
                      onClick={() => navigate("/Item2")}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={item.image}
                          alt={item.dish_name}
                          className="card-media"
                          sx={{
                            transition: 'transform 0.3s ease',
                            objectFit: 'cover'
                          }}
                        />
                        
                        <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFav(item);
                            }}
                            sx={{
                              bgcolor: 'rgba(255,255,255,0.9)',
                              backdropFilter: 'blur(10px)',
                              '&:hover': {
                                bgcolor: 'rgba(255,255,255,1)'
                              }
                            }}
                          >
                            {fav.some((f) => f.id === item.id) ? (
                              <FavoriteIcon sx={{ color: '#e74c3c' }} />
                            ) : (
                              <FavoriteBorderIcon />
                            )}
                          </IconButton>
                        </Box>
                        
                        {item.discount && (
                          <Chip
                            label={`${item.discount}% OFF`}
                            sx={{
                              position: 'absolute',
                              top: 12,
                              left: 12,
                              bgcolor: '#e74c3c',
                              color: 'white',
                              fontWeight: 'bold'
                            }}
                          />
                        )}
                      </Box>
                      
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#2c3e50' }}>
                          {item.dish_name}
                        </Typography>
                        
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                          {item.restaurant_name}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <StarIcon sx={{ color: '#ffd700', fontSize: 18 }} />
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {item.rating}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            • {item.delivery_time || '25-35 min'}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#e74c3c' }}>
                            {formatPrice(item.price)}
                          </Typography>
                          
                          <Tooltip title="Quick View">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Add quick view logic
                              }}
                              sx={{ bgcolor: '#f8f9fa' }}
                            >
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<CartIcon />}
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(item);
                            }}
                            sx={{
                              flex: 1,
                              borderRadius: 2,
                              borderColor: '#e74c3c',
                              color: '#e74c3c',
                              '&:hover': {
                                bgcolor: '#e74c3c',
                                color: 'white'
                              }
                            }}
                          >
                            Add to Cart
                          </Button>
                          
                          <Button
                            variant="contained"
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate("/PaymentDetails");
                            }}
                            sx={{
                              flex: 1,
                              bgcolor: '#e74c3c',
                              borderRadius: 2,
                              '&:hover': {
                                bgcolor: '#c0392b'
                              }
                            }}
                          >
                            Buy Now
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Zoom>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 6,
                    textAlign: 'center',
                    borderRadius: 3,
                    bgcolor: '#f8f9fa'
                  }}
                >
                  <RestaurantIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                    No related dishes available
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Check back later for more delicious options
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        )}
      </Container>
      
      <Footer />
    </Box>
  );
};
