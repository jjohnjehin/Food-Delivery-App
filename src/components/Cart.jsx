import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Divider, TextField,Drawer } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

export const Cart = ({ cart, removeFromCart, setCart }) => {
  const navigate=useNavigate()
  const [quantities, setQuantities] = useState({});

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
  const [drawerOpen, setDrawerOpen] = useState(false);
const [addressSaved, setAddressSaved] = useState(false);
const [address, setAddress] = useState({
  name: "",
  phone: "",
  street: "",
  city: "",
  pincode: "",
});


  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",marginTop:"30px"
      }}
    >
      <Box sx={{ width: "100%", height: "100px" }} />

      <Box
        sx={{
          width: "90%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        {/* LEFT COLUMN */}
        <Box sx={{ width: { xs: "100%", md: "70%" }, pr: { md: 2 } }}>
          {cart.length === 0 ? (
            <Typography variant="h6" align="center">
              🛒 No items in cart
            </Typography>
          ) : (
            cart.map((item, index) => (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
                  mb: 2,
                  p: 2,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  backgroundColor: "#fff",
                  boxShadow: 2,
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Box sx={{ width: { xs: "100%", sm: "10%" } }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Box>

                <Box sx={{ width: { xs: "100%", sm: "20%" } }}>
                  <Typography fontWeight="bold">{item.dish_name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.restaurant_name}
                  </Typography>
                </Box>

                <Box sx={{ width: { xs: "100%", sm: "20%" } }}>
                  <Typography variant="caption" color="text.secondary">
                    {item.slogan}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: { xs: "100%", sm: "10%" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => increaseQty(item.id)}
                  >
                    +
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => decreaseQty(item.id)}
                    sx={{ mt: 1 }}
                  >
                    -
                  </Button>
                </Box>

                <Box sx={{ width: { xs: "100%", sm: "10%" }, textAlign: "center" }}>
                  <Typography variant="h6">
                    {quantities[item.id] || 1}
                  </Typography>
                </Box>

                <Box sx={{ width: { xs: "100%", sm: "10%" }, textAlign: "center" }}>
                  <Typography variant="h6">
                    ₹{Number(item.price) * (quantities[item.id] || 1)}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  sx={{ bgcolor: "red" }}
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </Box>
            ))
          )}
        </Box>

        {/* RIGHT COLUMN */}
        <Box
          sx={{
            width: { xs: "100%", md: "23%" },
            p: 3,
            border: "1px solid #ccc",
            borderRadius: 2,
            backgroundColor: "#fff",
            boxShadow: 2,
            height: "fit-content",
            fontFamily: "sans-serif",
          }}
        >
          <Box
  onClick={() => setDrawerOpen(true)}
  sx={{
    border: "1px dashed #aaa",
    borderRadius: 1,
    p: 1.5,
    mb: 2,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 1,
    backgroundColor: "#f9f9f9",
  }}
>
  <HomeIcon color="action" />
  <Box>
    {addressSaved ? (
      <>
        <Typography fontWeight="bold" fontSize="14px">
          Deliver to: {address.name}
        </Typography>
        <Typography fontSize="12px" color="text.secondary">
          {address.street}, {address.city} - {address.pincode}
        </Typography>
        <Typography fontSize="12px" color="text.secondary">
          📞 {address.phone}
        </Typography>
      </>
    ) : (
      <Typography fontWeight="bold" fontSize="14px">
        ➕ Add Delivery Address
      </Typography>
    )}
  </Box>
</Box>
<Drawer
  anchor="right"
  open={drawerOpen}
  onClose={() => setDrawerOpen(false)}
  PaperProps={{
    sx: {
      width: { xs: "100%", sm: 400 }, // Full screen on mobile
    },
  }}
>
  <Box sx={{ p: 3 }}>
    <Typography variant="h6" mb={2}>Enter Delivery Address</Typography>

    <TextField
      fullWidth
      label="Name"
      variant="outlined"
      size="small"
      sx={{ mb: 2 }}
      value={address.name}
      onChange={(e) => setAddress({ ...address, name: e.target.value })}
    />
    <TextField
      fullWidth
      label="Phone"
      variant="outlined"
      size="small"
      sx={{ mb: 2 }}
      value={address.phone}
      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
    />
    <TextField
      fullWidth
      label="Street Address"
      variant="outlined"
      size="small"
      sx={{ mb: 2 }}
      value={address.street}
      onChange={(e) => setAddress({ ...address, street: e.target.value })}
    />
    <TextField
      fullWidth
      label="City"
      variant="outlined"
      size="small"
      sx={{ mb: 2 }}
      value={address.city}
      onChange={(e) => setAddress({ ...address, city: e.target.value })}
    />
    <TextField
      fullWidth
      label="Pincode"
      variant="outlined"
      size="small"
      sx={{ mb: 2 }}
      value={address.pincode}
      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
    />

    <Button
      variant="contained"
      color="primary"
      fullWidth
      onClick={() => {
        const allFilled = Object.values(address).every((val) => val.trim() !== "");
        if (allFilled) {
          setAddressSaved(true);
          setDrawerOpen(false);
        } else {
          alert("Please fill in all fields 🚨");
        }
      }}
    >
      Save Delivery Address
    </Button>
  </Box>
</Drawer>


          <TextField
            fullWidth
            placeholder="💬 Any suggestions? We will pass it on..."
            variant="standard"
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: "14px",
                padding: "4px 0",
              },
            }}
            sx={{
              mb: 2,
              backgroundColor: "transparent",
              "& input::placeholder": {
                opacity: 1,
              },
            }}
          />

          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: 1,
              p: 2,
              mb: 2,
            }}
          >
            <Box display="flex" alignItems="flex-start" gap={1}>
              <input type="checkbox" />
              <Typography fontSize="14px">
                <strong>Opt in for No-contact Delivery</strong><br />
                Unwell, or avoiding contact? Please select no-contact delivery.
                Partner will safely place the order outside your door (not for COD).
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              border: "1px dashed #aaa",
              borderRadius: 1,
              p: 1.5,
              mb: 2,
              cursor: "pointer",
            }}
          >
            <Typography fontWeight="bold" fontSize="14px">🧾 Apply Coupon</Typography>
          </Box>

          <Typography fontWeight="bold" fontSize="16px" mb={1}>Bill Details</Typography>

          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography fontSize="14px">Item Total</Typography>
            <Typography fontSize="14px">₹{totalPrice}</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography fontSize="14px">Delivery Fee | 12.1 kms</Typography>
            <Typography fontSize="14px">₹74</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography fontSize="14px">Extra discount for you</Typography>
            <Typography fontSize="14px" color="green">-₹66</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography fontSize="14px">Delivery Tip</Typography>
            <Typography fontSize="14px" color="red" sx={{ cursor: "pointer" }}>Add tip</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography fontSize="14px">GST & Other Charges</Typography>
            <Typography fontSize="14px">₹77.44</Typography>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography fontWeight="bold" fontSize="16px">TO PAY</Typography>
            <Typography fontWeight="bold" fontSize="18px">
              ₹{totalPrice + 74 - 66 + 77.44}
            </Typography>
          </Box>
          <Button variant="contained" sx={{bgcolor:"green",marginTop:"10px"}} onClick={()=>navigate('/Payment',{
              state: {
                category: totalPrice+74-66+77.44
              }
            })}>proceed with All</Button>
        </Box>
      </Box>
    </Box>
  );
};
