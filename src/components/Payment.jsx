import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
} from "@mui/material";

export const Payment = () => {
  const navigate=useNavigate()
  const location = useLocation();
const { category, id,slogan, } = location.state || {};
  console.log(category)

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 3,
        backgroundColor: "#fff",
        marginTop:"130px"
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
        Payment Summary
      </Typography>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Order Total
          </Typography>
          <Divider />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Typography>Subtotal</Typography>
            <Typography>₹{category}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography>Delivery Fee</Typography>
            <Typography>₹49</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight="bold">Total</Typography>
            <Typography fontWeight="bold" color="primary">
              ₹{Number(category)+49}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      

      <Button
        variant="contained"
        color="success"
        fullWidth
        sx={{ mt: 3, py: 1.5 }}
        onClick={()=>navigate("/PaymentDetails")}
      >
        Pay ₹{category}
      </Button>
    </Box>
  );
};

// export default Payment;
