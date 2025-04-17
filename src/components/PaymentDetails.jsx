import React from 'react';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  Select,
  MenuItem,
  Link,Drawer,Alert,InputLabel,FormControl
} from '@mui/material';
import { useState } from 'react';
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from 'react-router-dom';

export const PaymentDetails=()=> {
      const [drawerOpen, setDrawerOpen] = useState(false);
    const [addressSaved, setAddressSaved] = useState(false);
    const [address, setAddress] = useState({
      name: "",
      phone: "",
      street: "",
      city: "",
      pincode: "",
    });
    const [selectedMethod, setSelectedMethod] = useState("");
  const [netBankingOption, setNetBankingOption] = useState("");
  const navigate = useNavigate();
  const handlePayment = () => {
    navigate("/PaymentSummary", {
      state: {
        method: selectedMethod,
        bank: selectedMethod === "netbanking" ? netBankingOption : null
      }
    });
  };
  return (
    <Box sx={{ width: "100%", height: "100%", mt: { xs: 8, sm: 10, md: 12 }, display: "flex", flexDirection: "column", alignItems: "center" ,marginTop:{lg:"150px",xs:"150px",sm:"150px"}}}>
  <Typography variant='h5' sx={{ fontWeight: "700", fontSize: { xs: "24px", sm: "28px", md: "32px" } }}>Checkout</Typography>

  <Box sx={{
    width: { xs: "90%", sm: "85%", md: "70%", lg: "63%" },
    minHeight: "100px",
    border: "1px solid grey",
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: 'space-around',
    borderRadius: "10px ",
    gap: 2,
    mt: 2,
    px: 2,
    py: 2
  }}>
    {/* Delivery Header */}
    <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
      <Typography variant='h6' sx={{ fontWeight: "700", ml: 1 }}>Delivery Address</Typography>
    </Box>

    {/* Address Card */}
    <Box sx={{ flex: 2 }}>
      <Box
        onClick={() => setDrawerOpen(true)}
        sx={{
          borderRadius: 1,
          p: 1.5,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 1,
          "&:hover": {
            backgroundColor: "#f5f5f5",
          }
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
    </Box>

    {/* Edit Btn */}
    <Box sx={{ flex: 1, display: 'flex', justifyContent: "center", alignItems: 'center' }}>
      <Button
        variant='contained'
        sx={{ height: "45px", bgcolor: "white", color: "red", fontSize: "14px" }}
        onClick={() => setDrawerOpen(true)}
      >
        Edit
      </Button>
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
      },
    }}
  >
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" mb={2}>Enter Delivery Address</Typography>
      {["name", "phone", "street", "city", "pincode"].map((field, i) => (
        <TextField
          key={i}
          fullWidth
          label={field.charAt(0).toUpperCase() + field.slice(1)}
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
          value={address[field]}
          onChange={(e) => setAddress({ ...address, [field]: e.target.value })}
        />
      ))}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => {
          const allFilled = Object.values(address).every(val => val.trim() !== "");
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

  {/* Payment Section */}
  <Box sx={{
    width: { xs: "90%", sm: "85%", md: "70%", lg: "63%" },
    minHeight: "840px",
    border: "1px solid grey",
    mt: 3,
    pb: 3,
    borderRadius:"10px"
  }}>
    <Box sx={{ width: "100%", maxWidth: 900, mx: "auto", p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "orange" }}>
        Select a payment method
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Your available balance</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
          <TextField size="small" placeholder="Enter Code" fullWidth sx={{width:{lg:"97%",xs:"75%",sm:"91%"}}}/>
          <Button variant="outlined" sx={{width:{lg:"97%",xs:"75%",sm:"91%"}}}>Apply</Button>
        </Box>
      </Box>

      {/* Payment Methods */}
      <RadioGroup value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)}>
        {[
          {
            value: "upi",
            label: (
              <>
                <Typography fontWeight={600}>Amazon Pay <span style={{ fontSize: 12 }}>UPI</span></Typography>
                <Typography fontSize={14}>Indian Bank **5290 🔔</Typography>
              </>
            )
          },
          {
            value: "card",
            label: (
              <>
                <Typography>Credit or debit card</Typography>
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  {[
                    { src: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png", alt: "Visa" },
                    { src: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png", alt: "Mastercard" },
                    { src: "https://th.bing.com/th/id/R.2fa00c6cd65fc3e6260623d6a1e9cc52?rik=tLnbWjnw2iJGDQ&pid=ImgRaw&r=0", alt: "Maestro" },
                    { src: "https://th.bing.com/th/id/R.48eaeab4cb35b98326e25a71479a5d19?rik=BTpamseHj921GA&pid=ImgRaw&r=0", alt: "RuPay" },
                  ].map((card, i) => (
                    <Box key={i} sx={{
                      width:{lg:40,xs:20}, height: 25, bgcolor: "#fff", borderRadius: 1,
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      <img src={card.src} alt={card.alt} style={{ width: "100%", objectFit: "contain" }} />
                    </Box>
                  ))}
                </Box>
              </>
            )
          },
          {
            value: "netbanking",
            label: (
              <FormControl fullWidth size="small" sx={{ mt: 1, width: 130 }}>
                <InputLabel>Net Banking</InputLabel>
                <Select
                  value={netBankingOption}
                  label="Net Banking"
                  onChange={(e) => setNetBankingOption(e.target.value)}
                >
                  <MenuItem value="sbi">SBI</MenuItem>
                  <MenuItem value="hdfc">HDFC</MenuItem>
                  <MenuItem value="icici">ICICI</MenuItem>
                </Select>
              </FormControl>
            )
          },
          {
            value: "otherupi",
            label: "Other UPI Apps"
          },
          {
            value: "emi",
            label: (
              <Typography color="textSecondary">
                EMI Unavailable <span style={{ textDecoration: "underline", marginLeft: 8 }}>Why?</span>
              </Typography>
            ),
            disabled: true
          },
          {
            value: "cod",
            label: (
              <Box>
                <Typography fontWeight={600}>Cash on Delivery / Pay on Delivery</Typography>
                <Typography fontSize={14} color="text.secondary">
                  Cash, UPI and Cards accepted. <span style={{ textDecoration: "underline" }}>Know more.</span>
                </Typography>
                <Alert severity="info" sx={{ mt: 1, fontSize: 13 }}>
                  Convenience fee of ₹7 will apply. To avoid this fee, use any other payment method.
                </Alert>
              </Box>
            )
          }
        ].map((method, index) => (
          <Box key={index} sx={{
            p: 2,
            mb: 2,
            bgcolor: selectedMethod === method.value ? "#FFF3E0" : "transparent",
            borderRadius: 2,width:{lg:"97%",xs:"75%",sm:"91%"}
          }}>
            <FormControlLabel
              value={method.value}
              control={<Radio />}
              label={method.label}
              disabled={method.disabled}
            />
          </Box>
        ))}
      </RadioGroup>

      <Button
      variant="contained"
      fullWidth
      sx={{
        mt: 3,
        bgcolor: "#f0c14b",
        color: "black",
        textTransform: "none"
      }}
      onClick={handlePayment}
    >
      Use this payment method
    </Button>
    </Box>
  </Box>
</Box>

  );
}

// export default PaymentMethodSelector;