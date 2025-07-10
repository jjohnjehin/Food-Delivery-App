import React, { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Divider, 
  TextField, 
  Drawer, 
  IconButton,
  Card,
  CardContent,
  Chip,
  Avatar,
  Badge,
  Fade,
  Slide,
  Alert,
  Snackbar,
  Fab,
  Tooltip
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PaymentIcon from "@mui/icons-material/Payment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import { appColors, colorUtils } from "../theme/colors";

export const Cart = ({ cart, removeFromCart, setCart }) => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addressSaved, setAddressSaved] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    const initialQuantities = {};
    cart.forEach((item) => {
      initialQuantities[item.id] = 1;
    });
    setQuantities(initialQuantities);
  }, [cart]);

  const increaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decreaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  const totalPrice = cart.reduce(
    (total, item) =>
      total + Number(item.price) * (quantities[item.id] || 1),
    0
  );

  const deliveryFee = 74;
  const discount = 66;
  const gst = 77.44;
  const finalTotal = totalPrice + deliveryFee - discount + gst;

  const handleRemoveItem = (item) => {
    removeFromCart(item);
    setSnackbar({
      open: true,
      message: `${item.dish_name} removed from cart`,
      severity: "info"
    });
  };

  const handleSaveAddress = () => {
    const allFilled = Object.values(address).every((val) => val.trim() !== "");
    if (allFilled) {
      setAddressSaved(true);
      setDrawerOpen(false);
      setSnackbar({
        open: true,
        message: "Delivery address saved successfully!",
        severity: "success"
      });
    } else {
      setSnackbar({
        open: true,
        message: "Please fill in all fields",
        severity: "error"
      });
    }
  };

  const handleProceedToPayment = () => {
    if (!addressSaved) {
      setSnackbar({
        open: true,
        message: "Please add delivery address first",
        severity: "warning"
      });
      return;
    }
    navigate('/Payment', {
      state: {
        category: finalTotal
      }
    });
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
              bgcolor: appColors.primary.main,
              width: 48,
              height: 48
            }}
          >
            <ShoppingCartIcon />
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight="bold" color={appColors.text.primary}>
              Your Cart
            </Typography>
            <Typography variant="body2" color={appColors.text.secondary}>
              {cart.length} items • Total: ₹{finalTotal.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 3
          }}
        >
          {/* Cart Items */}
          <Box sx={{ flex: 1 }}>
            {cart.length === 0 ? (
              <Card
                sx={{
                  textAlign: "center",
                  py: 8,
                  backgroundColor: appColors.background.primary,
                  boxShadow: 3
                }}
              >
                <ShoppingCartIcon
                  sx={{
                    fontSize: 64,
                    color: appColors.text.secondary,
                    mb: 2
                  }}
                />
                <Typography variant="h6" color={appColors.text.secondary} mb={2}>
                  Your cart is empty
                </Typography>
                <Typography variant="body2" color={appColors.text.secondary} mb={3}>
                  Add some delicious items to get started
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
                  Start Shopping
                </Button>
              </Card>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {cart.map((item, index) => (
                  <Slide direction="up" in={true} timeout={300 + index * 100}>
                    <Card
                      key={index}
                      sx={{
                        backgroundColor: appColors.background.primary,
                        boxShadow: 3,
                        borderRadius: 3,
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: 6
                        }
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: { xs: "center", sm: "flex-start" },
                            gap: 3
                          }}
                        >
                          {/* Item Image */}
                          <Box
                            sx={{
                              width: { xs: "120px", sm: "100px" },
                              height: { xs: "120px", sm: "100px" },
                              position: "relative",
                              flexShrink: 0
                            }}
                          >
                            <img
                              src={item.image}
                              alt={item.dish_name}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "12px"
                              }}
                            />
                            <Chip
                              label={`₹${item.price}`}
                              size="small"
                              sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                bgcolor: appColors.accent.red,
                                color: appColors.text.inverse,
                                fontWeight: "bold"
                              }}
                            />
                          </Box>

                          {/* Item Details */}
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="h6" fontWeight="bold" mb={1}>
                              {item.dish_name}
                            </Typography>
                            <Typography variant="body2" color={appColors.text.secondary} mb={1}>
                              {item.restaurant_name}
                            </Typography>
                            <Typography variant="caption" color={appColors.text.secondary} mb={2}>
                              {item.slogan}
                            </Typography>

                            {/* Quantity Controls */}
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 2
                              }}
                            >
                              <Typography variant="body2" fontWeight="bold">
                                Quantity:
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  border: `1px solid ${appColors.text.disabled}`,
                                  borderRadius: 2,
                                  overflow: "hidden"
                                }}
                              >
                                <IconButton
                                  size="small"
                                  onClick={() => decreaseQty(item.id)}
                                  sx={{
                                    borderRadius: 0,
                                    "&:hover": {
                                      bgcolor: appColors.background.secondary
                                    }
                                  }}
                                >
                                  <RemoveIcon fontSize="small" />
                                </IconButton>
                                <Typography
                                  sx={{
                                    px: 2,
                                    py: 1,
                                    minWidth: "40px",
                                    textAlign: "center",
                                    fontWeight: "bold"
                                  }}
                                >
                                  {quantities[item.id] || 1}
                                </Typography>
                                <IconButton
                                  size="small"
                                  onClick={() => increaseQty(item.id)}
                                  sx={{
                                    borderRadius: 0,
                                    "&:hover": {
                                      bgcolor: appColors.background.secondary
                                    }
                                  }}
                                >
                                  <AddIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </Box>

                            {/* Price and Actions */}
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: 2
                              }}
                            >
                              <Typography variant="h6" fontWeight="bold" color={appColors.primary.main}>
                                ₹{Number(item.price) * (quantities[item.id] || 1)}
                              </Typography>
                              <Box sx={{ display: "flex", gap: 1 }}>
                                <Tooltip title="Add to favorites">
                                  <IconButton
                                    size="small"
                                    sx={{
                                      bgcolor: appColors.background.secondary,
                                      "&:hover": {
                                        bgcolor: appColors.accent.yellow
                                      }
                                    }}
                                  >
                                    <FavoriteIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Remove from cart">
                                  <IconButton
                                    size="small"
                                    onClick={() => handleRemoveItem(item)}
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
                                </Tooltip>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Slide>
                ))}
              </Box>
            )}
          </Box>

          {/* Order Summary */}
          <Box sx={{ width: { xs: "100%", lg: "400px" } }}>
            <Card
              sx={{
                backgroundColor: appColors.background.primary,
                boxShadow: 3,
                borderRadius: 3,
                position: "sticky",
                top: 20
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" mb={3}>
                  Order Summary
                </Typography>

                {/* Delivery Address */}
                <Box
                  onClick={() => setDrawerOpen(true)}
                  sx={{
                    border: `2px dashed ${appColors.text.disabled}`,
                    borderRadius: 2,
                    p: 2,
                    mb: 3,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: appColors.primary.main,
                      bgcolor: appColors.background.secondary
                    }
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                    <LocationOnIcon color="action" />
                    <Typography fontWeight="bold" fontSize="14px">
                      Delivery Address
                    </Typography>
                  </Box>
                  {addressSaved ? (
                    <Box>
                      <Typography fontWeight="bold" fontSize="14px" mb={0.5}>
                        {address.name}
                      </Typography>
                      <Typography fontSize="12px" color={appColors.text.secondary} mb={0.5}>
                        {address.street}, {address.city} - {address.pincode}
                      </Typography>
                      <Typography fontSize="12px" color={appColors.text.secondary}>
                        📞 {address.phone}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography fontSize="14px" color={appColors.text.secondary}>
                      Click to add delivery address
                    </Typography>
                  )}
                </Box>

                {/* Special Instructions */}
                <TextField
                  fullWidth
                  placeholder="💬 Any special instructions?"
                  variant="outlined"
                  size="small"
                  multiline
                  rows={2}
                  sx={{ mb: 3 }}
                />

                {/* No-contact Delivery */}
                <Box
                  sx={{
                    border: `1px solid ${appColors.text.disabled}`,
                    borderRadius: 2,
                    p: 2,
                    mb: 3,
                    bgcolor: appColors.background.secondary
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                    <input type="checkbox" />
                    <Box>
                      <Typography fontSize="14px" fontWeight="bold" mb={0.5}>
                        No-contact Delivery
                      </Typography>
                      <Typography fontSize="12px" color={appColors.text.secondary}>
                        Partner will safely place the order outside your door
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Coupon */}
                <Box
                  sx={{
                    border: `2px dashed ${appColors.text.disabled}`,
                    borderRadius: 2,
                    p: 2,
                    mb: 3,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: appColors.accent.red,
                      bgcolor: appColors.background.secondary
                    }
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <LocalOfferIcon color="action" />
                    <Typography fontWeight="bold" fontSize="14px">
                      Apply Coupon
                    </Typography>
                  </Box>
                </Box>

                {/* Bill Details */}
                <Typography fontWeight="bold" fontSize="16px" mb={2}>
                  Bill Details
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography fontSize="14px">Item Total</Typography>
                    <Typography fontSize="14px">₹{totalPrice.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography fontSize="14px">Delivery Fee</Typography>
                    <Typography fontSize="14px">₹{deliveryFee}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography fontSize="14px" color={appColors.status.success}>
                      Discount
                    </Typography>
                    <Typography fontSize="14px" color={appColors.status.success}>
                      -₹{discount}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography fontSize="14px">GST & Charges</Typography>
                    <Typography fontSize="14px">₹{gst}</Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                  <Typography fontWeight="bold" fontSize="18px">
                    Total Amount
                  </Typography>
                  <Typography fontWeight="bold" fontSize="20px" color={appColors.primary.main}>
                    ₹{finalTotal.toFixed(2)}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleProceedToPayment}
                  disabled={!addressSaved}
                  sx={{
                    bgcolor: appColors.primary.main,
                    color: appColors.text.inverse,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: "16px",
                    fontWeight: "bold",
                    "&:disabled": {
                      bgcolor: appColors.text.disabled
                    }
                  }}
                >
                  <PaymentIcon sx={{ mr: 1 }} />
                  Proceed to Payment
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>

      {/* Address Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 400 },
            p: 3
          },
        }}
      >
        <Typography variant="h6" mb={3}>
          Delivery Address
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            size="small"
            value={address.name}
            onChange={(e) => setAddress({ ...address, name: e.target.value })}
          />
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            size="small"
            value={address.phone}
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
          />
          <TextField
            fullWidth
            label="Street Address"
            variant="outlined"
            size="small"
            multiline
            rows={2}
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
          />
          <TextField
            fullWidth
            label="City"
            variant="outlined"
            size="small"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
          <TextField
            fullWidth
            label="Pincode"
            variant="outlined"
            size="small"
            value={address.pincode}
            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
          />
        </Box>

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleSaveAddress}
          sx={{
            bgcolor: appColors.primary.main,
            color: appColors.text.inverse,
            py: 1.5,
            borderRadius: 2
          }}
        >
          Save Address
        </Button>
      </Drawer>

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
