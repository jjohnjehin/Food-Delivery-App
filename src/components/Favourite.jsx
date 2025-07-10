import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  CardMedia, 
  Chip,
  IconButton,
  Grid,
  Fade,
  Slide,
  Alert,
  Snackbar,
  Tooltip,
  Avatar,
  Badge,
  Divider,
  Fab
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StarIcon from "@mui/icons-material/Star";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useNavigate } from "react-router-dom";
import { appColors, colorUtils } from "../theme/colors";

export const Favourite = ({ fav, removeFromFav, addToCart }) => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Items", count: fav.length },
    { id: "restaurants", label: "Restaurants", count: fav.filter(item => item.restaurant_name).length },
    { id: "dishes", label: "Dishes", count: fav.filter(item => item.dish_name).length }
  ];

  const handleRemoveFromFav = (item) => {
    removeFromFav(item.id);
    setSnackbar({
      open: true,
      message: `${item.dish_name} removed from favorites`,
      severity: "info"
    });
  };

  const handleAddToCart = (item) => {
    if (addToCart) {
      addToCart(item);
      setSnackbar({
        open: true,
        message: `${item.dish_name} added to cart`,
        severity: "success"
      });
    }
  };

  const handlePlaceOrder = (item) => {
    // Navigate to cart or checkout with this item
    setSnackbar({
      open: true,
      message: "Redirecting to checkout...",
      severity: "info"
    });
    // You can implement the actual order placement logic here
  };

  const filteredItems = selectedCategory === "all" 
    ? fav 
    : fav.filter(item => {
        if (selectedCategory === "restaurants") return item.restaurant_name;
        if (selectedCategory === "dishes") return item.dish_name;
        return true;
      });

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
      {/* Header */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, md: 4 },
          mb: 4
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 3
          }}
        >
          <Avatar
            sx={{
              bgcolor: appColors.accent.red,
              width: 48,
              height: 48
            }}
          >
            <FavoriteIcon />
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight="bold" color={appColors.text.primary}>
              My Favorites
            </Typography>
            <Typography variant="body2" color={appColors.text.secondary}>
              {fav.length} items saved • Your personalized collection
            </Typography>
          </Box>
        </Box>

        {/* Category Filter */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Filter by Category
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {categories.map((category) => (
              <Chip
                key={category.id}
                label={`${category.label} (${category.count})`}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "filled" : "outlined"}
                sx={{
                  bgcolor: selectedCategory === category.id ? appColors.primary.main : "transparent",
                  color: selectedCategory === category.id ? appColors.text.inverse : appColors.text.primary,
                  "&:hover": {
                    bgcolor: selectedCategory === category.id ? appColors.primary.main : appColors.background.secondary
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Favorites Grid */}
        {fav.length === 0 ? (
          <Card
            sx={{
              textAlign: "center",
              py: 8,
              backgroundColor: appColors.background.primary,
              boxShadow: 3,
              borderRadius: 3
            }}
          >
            <FavoriteBorderIcon
              sx={{
                fontSize: 64,
                color: appColors.text.secondary,
                mb: 2
              }}
            />
            <Typography variant="h6" color={appColors.text.secondary} mb={2}>
              No favorites yet
            </Typography>
            <Typography variant="body2" color={appColors.text.secondary} mb={3}>
              Start adding your favorite dishes and restaurants
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/')}
              sx={{
                bgcolor: appColors.primary.main,
                color: appColors.text.inverse,
                px: 4,
                py: 1.5,
                borderRadius: 2
              }}
            >
              Explore Menu
            </Button>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {filteredItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Slide direction="up" in={true} timeout={300 + index * 100}>
                  <Card
                    sx={{
                      height: "100%",
                      backgroundColor: appColors.background.primary,
                      boxShadow: 3,
                      borderRadius: 3,
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 6
                      }
                    }}
                  >
                    {/* Item Image */}
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.image}
                        alt={item.dish_name}
                        sx={{ objectFit: "cover" }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          display: "flex",
                          gap: 1
                        }}
                      >
                        <Chip
                          label={`₹${item.price}`}
                          size="small"
                          sx={{
                            bgcolor: appColors.accent.red,
                            color: appColors.text.inverse,
                            fontWeight: "bold"
                          }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveFromFav(item)}
                          sx={{
                            bgcolor: appColors.button.danger,
                            color: appColors.text.inverse,
                            "&:hover": {
                              bgcolor: appColors.accent.red
                            }
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 12,
                          left: 12
                        }}
                      >
                        <Chip
                          icon={<StarIcon />}
                          label="4.5"
                          size="small"
                          sx={{
                            bgcolor: appColors.accent.yellow,
                            color: appColors.text.inverse,
                            fontWeight: "bold"
                          }}
                        />
                      </Box>
                    </Box>

                    {/* Item Details */}
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" fontWeight="bold" mb={1} noWrap>
                        {item.dish_name}
                      </Typography>
                      
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                        <RestaurantIcon fontSize="small" color="action" />
                        <Typography variant="body2" color={appColors.text.secondary} noWrap>
                          {item.restaurant_name}
                        </Typography>
                      </Box>

                      <Typography variant="caption" color={appColors.text.secondary} mb={2} sx={{ display: "block" }}>
                        {item.slogan}
                      </Typography>

                      <Divider sx={{ my: 2 }} />

                      {/* Price and Actions */}
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="h6" fontWeight="bold" color={appColors.primary.main}>
                          ₹{item.price}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Tooltip title="Add to cart">
                            <IconButton
                              size="small"
                              onClick={() => handleAddToCart(item)}
                              sx={{
                                bgcolor: appColors.background.secondary,
                                "&:hover": {
                                  bgcolor: appColors.accent.red
                                }
                              }}
                            >
                              <ShoppingCartIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Remove from favorites">
                            <IconButton
                              size="small"
                              onClick={() => handleRemoveFromFav(item)}
                              sx={{
                                bgcolor: appColors.background.secondary,
                                "&:hover": {
                                  bgcolor: appColors.button.danger
                                }
                              }}
                            >
                              <FavoriteIcon fontSize="small" color="error" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>

                      {/* Action Buttons */}
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          fullWidth
                          onClick={() => handleAddToCart(item)}
                          sx={{
                            borderColor: appColors.primary.main,
                            color: appColors.primary.main,
                            "&:hover": {
                              borderColor: appColors.primary.dark,
                              bgcolor: appColors.primary.light
                            }
                          }}
                        >
                          Add to Cart
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          fullWidth
                          onClick={() => handlePlaceOrder(item)}
                          sx={{
                            bgcolor: appColors.primary.main,
                            color: appColors.text.inverse,
                            "&:hover": {
                              bgcolor: appColors.primary.dark
                            }
                          }}
                        >
                          Order Now
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Empty State for Filtered Results */}
        {fav.length > 0 && filteredItems.length === 0 && (
          <Card
            sx={{
              textAlign: "center",
              py: 6,
              backgroundColor: appColors.background.primary,
              boxShadow: 3,
              borderRadius: 3
            }}
          >
            <LocalOfferIcon
              sx={{
                fontSize: 48,
                color: appColors.text.secondary,
                mb: 2
              }}
            />
            <Typography variant="h6" color={appColors.text.secondary} mb={2}>
              No items in this category
            </Typography>
            <Typography variant="body2" color={appColors.text.secondary} mb={3}>
              Try selecting a different category or add more favorites
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setSelectedCategory("all")}
              sx={{
                borderColor: appColors.primary.main,
                color: appColors.primary.main
              }}
            >
              View All Favorites
            </Button>
          </Card>
        )}
      </Box>

      {/* Floating Action Button */}
      {fav.length > 0 && (
        <Fab
          color="primary"
          aria-label="add to cart"
          onClick={() => navigate('/cart')}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            bgcolor: appColors.primary.main,
            "&:hover": {
              bgcolor: appColors.primary.dark
            }
          }}
        >
          <ShoppingCartIcon />
        </Fab>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
