import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  IconButton,
  Container,
  Paper,
  Avatar,
  Divider,
  Fade,
  Slide,
  Alert,
  Snackbar,
  Tooltip,
  Badge,
  LinearProgress,
  Tabs,
  Tab
} from "@mui/material";
import {
  LocalOffer as OfferIcon,
  Star as StarIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  ShoppingCart as CartIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Share as ShareIcon,
  FlashOn as FlashIcon,
  Discount as DiscountIcon,
  Restaurant as RestaurantIcon,
  DeliveryDining as DeliveryIcon,
  Payment as PaymentIcon,
  TrendingUp as TrendingIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { appColors, colorUtils } from "../theme/colors";

export const Offers = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const offerCategories = [
    { id: "all", label: "All Offers", icon: <OfferIcon />, count: 24 },
    { id: "food", label: "Food Deals", icon: <RestaurantIcon />, count: 12 },
    { id: "delivery", label: "Free Delivery", icon: <DeliveryIcon />, count: 8 },
    { id: "payment", label: "Payment Offers", icon: <PaymentIcon />, count: 4 }
  ];

  const featuredOffers = [
    {
      id: 1,
      title: "50% OFF on First Order",
      description: "New users get 50% off up to ₹200 on their first order",
      discount: "50%",
      maxDiscount: "₹200",
      code: "NEW50",
      validUntil: "2024-12-31",
      category: "food",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      restaurant: "All Restaurants",
      minOrder: "₹199",
      isFlash: true,
      isPopular: true
    },
    {
      id: 2,
      title: "Free Delivery on Orders Above ₹299",
      description: "No delivery charges on orders above ₹299",
      discount: "100%",
      maxDiscount: "₹60",
      code: "FREEDEL",
      validUntil: "2024-12-31",
      category: "delivery",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      restaurant: "All Restaurants",
      minOrder: "₹299",
      isFlash: false,
      isPopular: true
    },
    {
      id: 3,
      title: "UPI Cashback - Get ₹50 Back",
      description: "Use UPI and get ₹50 cashback on orders above ₹150",
      discount: "₹50",
      maxDiscount: "₹50",
      code: "UPI50",
      validUntil: "2024-12-31",
      category: "payment",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      restaurant: "All Restaurants",
      minOrder: "₹150",
      isFlash: true,
      isPopular: false
    },
    {
      id: 4,
      title: "Weekend Special - Buy 1 Get 1",
      description: "Buy any pizza and get one free this weekend",
      discount: "100%",
      maxDiscount: "₹299",
      code: "WEEKEND",
      validUntil: "2024-12-31",
      category: "food",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      restaurant: "Pizza Corner",
      minOrder: "₹199",
      isFlash: false,
      isPopular: true
    },
    {
      id: 5,
      title: "Student Discount - 20% OFF",
      description: "Students get 20% off on all orders with valid ID",
      discount: "20%",
      maxDiscount: "₹100",
      code: "STUDENT20",
      validUntil: "2024-12-31",
      category: "food",
      image: "https://images.unsplash.com/photo-1504674900240-8947e31be3f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      restaurant: "All Restaurants",
      minOrder: "₹100",
      isFlash: false,
      isPopular: false
    },
    {
      id: 6,
      title: "Early Bird Special - 30% OFF",
      description: "Order before 11 AM and get 30% off on breakfast items",
      discount: "30%",
      maxDiscount: "₹150",
      code: "EARLY30",
      validUntil: "2024-12-31",
      category: "food",
      image: "https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      restaurant: "Breakfast Hub",
      minOrder: "₹99",
      isFlash: true,
      isPopular: true
    }
  ];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const toggleFavorite = (offerId) => {
    setFavorites(prev => 
      prev.includes(offerId) 
        ? prev.filter(id => id !== offerId)
        : [...prev, offerId]
    );
    setSnackbar({
      open: true,
      message: favorites.includes(offerId) ? "Removed from favorites" : "Added to favorites",
      severity: "success"
    });
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setSnackbar({
      open: true,
      message: "Coupon code copied to clipboard!",
      severity: "success"
    });
  };

  const applyOffer = (offer) => {
    setSnackbar({
      open: true,
      message: `Applied ${offer.code} - ${offer.title}`,
      severity: "success"
    });
    // Navigate to products page with offer applied
    navigate('/');
  };

  const filteredOffers = selectedTab === 0 
    ? featuredOffers 
    : featuredOffers.filter(offer => offer.category === offerCategories[selectedTab].id);

  return (
    <Box sx={{ marginTop: "100px", minHeight: "100vh", bgcolor: appColors.background.secondary }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 6,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ position: 'absolute', top: -50, right: -50, opacity: 0.1 }}>
            <OfferIcon sx={{ fontSize: 200 }} />
          </Box>
          
          <Fade in timeout={800}>
            <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <Typography variant="h2" fontWeight="bold" mb={2}>
                🎉 Amazing Offers
              </Typography>
              <Typography variant="h5" mb={3} sx={{ opacity: 0.9 }}>
                Discover incredible deals and save big on your favorite food
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Chip
                  icon={<TrendingIcon />}
                  label="24 Active Offers"
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
                <Chip
                  icon={<FlashIcon />}
                  label="Flash Deals"
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
                <Chip
                  icon={<StarIcon />}
                  label="Best Rated"
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Category Tabs */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Browse by Category
          </Typography>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minWidth: 120,
                textTransform: 'none',
                fontWeight: 'bold'
              }
            }}
          >
            {offerCategories.map((category, index) => (
              <Tab
                key={category.id}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {category.icon}
                    <Box>
                      <Typography variant="body2">{category.label}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {category.count} offers
                      </Typography>
                    </Box>
                  </Box>
                }
                sx={{ alignItems: 'flex-start' }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Offers Grid */}
        <Grid container spacing={3}>
          {filteredOffers.map((offer, index) => (
            <Grid item xs={12} sm={6} md={4} key={offer.id}>
              <Slide direction="up" in={true} timeout={300 + index * 100}>
                <Card
                  sx={{
                    height: '100%',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6
                    }
                  }}
                >
                  {/* Offer Image */}
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={offer.image}
                      alt={offer.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    
                    {/* Badges */}
                    <Box sx={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 1 }}>
                      {offer.isFlash && (
                        <Chip
                          icon={<FlashIcon />}
                          label="FLASH"
                          size="small"
                          sx={{
                            bgcolor: appColors.accent.red,
                            color: 'white',
                            fontWeight: 'bold'
                          }}
                        />
                      )}
                      {offer.isPopular && (
                        <Chip
                          icon={<StarIcon />}
                          label="POPULAR"
                          size="small"
                          sx={{
                            bgcolor: appColors.accent.yellow,
                            color: 'white',
                            fontWeight: 'bold'
                          }}
                        />
                      )}
                    </Box>

                    {/* Favorite Button */}
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: 'rgba(255,255,255,0.9)',
                        '&:hover': { bgcolor: 'white' }
                      }}
                      onClick={() => toggleFavorite(offer.id)}
                    >
                      {favorites.includes(offer.id) ? (
                        <FavoriteIcon color="error" />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>

                    {/* Discount Badge */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 12,
                        right: 12,
                        bgcolor: appColors.primary.main,
                        color: 'white',
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        fontWeight: 'bold'
                      }}
                    >
                      {offer.discount} OFF
                    </Box>
                  </Box>

                  {/* Offer Details */}
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="bold" mb={1} noWrap>
                      {offer.title}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" mb={2} sx={{ minHeight: 40 }}>
                      {offer.description}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <RestaurantIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {offer.restaurant}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <TimeIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        Min order: {offer.minOrder}
                      </Typography>
                    </Box>

                    {/* Coupon Code */}
                    <Paper
                      sx={{
                        p: 2,
                        mb: 2,
                        bgcolor: appColors.background.light,
                        border: `2px dashed ${appColors.primary.main}`,
                        borderRadius: 2
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Use Code
                          </Typography>
                          <Typography variant="h6" fontWeight="bold" color={appColors.primary.main}>
                            {offer.code}
                          </Typography>
                        </Box>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => copyCode(offer.code)}
                          sx={{
                            borderColor: appColors.primary.main,
                            color: appColors.primary.main,
                            '&:hover': {
                              borderColor: appColors.primary.dark,
                              bgcolor: appColors.primary.light
                            }
                          }}
                        >
                          Copy
                        </Button>
                      </Box>
                    </Paper>

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => applyOffer(offer)}
                        sx={{
                          bgcolor: appColors.primary.main,
                          color: 'white',
                          '&:hover': {
                            bgcolor: appColors.primary.dark
                          }
                        }}
                      >
                        Apply Offer
                      </Button>
                      <Tooltip title="Share offer">
                        <IconButton
                          size="small"
                          sx={{
                            bgcolor: appColors.background.light,
                            '&:hover': {
                              bgcolor: appColors.accent.blue
                            }
                          }}
                        >
                          <ShareIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              </Slide>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {filteredOffers.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <OfferIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" mb={2}>
              No offers in this category
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Check back later for new offers
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setSelectedTab(0)}
              sx={{
                borderColor: appColors.primary.main,
                color: appColors.primary.main
              }}
            >
              View All Offers
            </Button>
          </Box>
        )}
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};