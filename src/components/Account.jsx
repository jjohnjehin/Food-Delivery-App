import React from 'react';
import { Box, Paper, Typography,Grid , IconButton, Button, Modal, TextField,MenuItem,Select,FormLabel,FormControl,Radio,FormControlLabel,
    RadioGroup
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};



export const Account = () => {
    const [open, setOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [saved, setSaved] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (address.trim() && pincode.trim()) {
      setSaved(true);
      setOpen(false);
    } else {
      alert('Please fill both Address and Pincode');
    }
  };
//   Payment options
const upiAppIcons = {
  'Google Pay': 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Google_Pay_Logo.svg',
  PhonePe: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/PhonePe_Logo.svg',
  Paytm: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Paytm_logo.png',
};
 const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentSaved, setPaymentSaved] = useState(false);
  const [method, setMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiApp, setUpiApp] = useState('');

  const handlePaymentOpen = () => setPaymentOpen(true);
  const handlePaymentClose = () => setPaymentOpen(false);

  const handlePaymentSave = () => {
    if ((method === 'debit' || method === 'credit') && (!cardNumber || !cvv)) return;
    if (method === 'upi' && !upiApp) return;

    setPaymentSaved(true);
    setPaymentOpen(false);
  };

  const renderSavedPayment = () => {
    if (!paymentSaved) return null;

    if (method === 'debit' || method === 'credit') {
      return (
        <Box display="flex" alignItems="center" gap={1}>
          <CreditCardIcon color="primary" />
          <Typography>{method === 'debit' ? 'Debit Card' : 'Credit Card'} •••• {cardNumber.slice(-4)}</Typography>
        </Box>
      );
    }

    if (method === 'upi') {
      return (
        <Box display="flex" alignItems="center" gap={1}>
          <img src={upiAppIcons[upiApp]} alt={upiApp} style={{ width: 24, height: 24 }} />
          <Typography>{upiApp}</Typography>
        </Box>
      );
    }

    if (method === 'cod') {
      return (
        <Box display="flex" alignItems="center" gap={1}>
          <AccountBalanceWalletIcon color="secondary" />
          <Typography>Pay on Delivery</Typography>
        </Box>
      );
    }
  };
    const navigate=useNavigate()
  return (
    <Box sx={{width:"100%",height:"100%"}}>
        <Box sx={{width:"100%",height:"60px",marginTop:"130px",display:"flex",justifyContent:'center'}}>
            <Grid container sx={{width:"70%",height:"100%",display:'flex',justifyContent:"space-between"}}>
                <Grid item size={{lg:2.2}} sx={{width:"100%",height:"100%",borderRadius:"5px",display:"flex",justifyContent:'center',alignItems:"center"}} >
                    <Box sx={{ position: 'relative', mb: 2 }}>
                        <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 600,
                            color: saved ? 'green' : 'red',
                        }}
                        >
                        Personal Details
                        </Typography>
                        {saved && (
                        <CheckCircleIcon
                            color="success"
                            sx={{
                            position: 'absolute',
                            //   top: 0,
                            bottom:25,
                            //   right: 20
                            left:80,
                            fontSize: 30,
                            }}
                        />
                        )}
                    </Box>

                </Grid>
                <Grid item size={{lg:1}} sx={{width:"100%",height:"100%",display:'flex',alignItems:'center'}}>
                    <Grid sx={{width:"100%",height:"2px",bgcolor:"grey"}}></Grid>
                </Grid>
                <Grid item size={{lg:2.2}} sx={{width:"100%",height:"100%",borderRadius:"5px",display:"flex",justifyContent:'center',alignItems:"center"}}>
                    <Box sx={{ position: 'relative', mb: 2 }}>
                        <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 600,
                            color: paymentSaved ? 'green' : 'red',
                        }}
                        >
                        Payment Options
                        </Typography>
                        {paymentSaved && (
                        <CheckCircleIcon
                            color="success"
                            sx={{
                            position: 'absolute',
                            //   top: 0,
                            bottom:25,
                            //   right: 20
                            left:80,
                            fontSize: 30,
                            }}
                        />
                        )}
                    </Box>
                </Grid>
                <Grid item size={{lg:1}} sx={{width:"100%",height:"100%",display:'flex',alignItems:'center'}}>
                    <Grid sx={{width:"100%",height:"2px",bgcolor:"grey"}}></Grid>
                </Grid>
                <Grid item size={{lg:2.2}} sx={{width:"100%",height:"100%",borderRadius:"5px",display:"flex",justifyContent:'center',alignItems:"center"}}>
                    <Typography variant='h5' sx={{fontWeight:"600",color:"green"}}>My Orders</Typography>
                </Grid>
                <Grid item size={{lg:1}} sx={{width:"100%",height:"100%",display:'flex',alignItems:'center'}}>
                    <Grid sx={{width:"100%",height:"2px",bgcolor:"grey"}}></Grid>
                </Grid>
                <Grid item size={{lg:2.2}} sx={{width:"100%",height:"100%",borderRadius:"5px",display:"flex",justifyContent:'center',alignItems:"center"}}>
                    <Typography variant='h5' sx={{fontWeight:"600",color:"green"}}>Track Orders</Typography>
                </Grid>
            </Grid>
        </Box>
        <Box sx={{width:"100%",height:"900px",marginTop:"20px",display:'flex',justifyContent:'center'}}>
            <Box sx={{width:"70%",height:"100%",border:"1px solid",borderRadius:"5px"}}>
                <Grid sx={{width:"100%",height:"25%",borderBottom:"1px solid"}}>
                    <Grid sx={{width:"100%",height:"20%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <Typography variant='h5' sx={{textDecoration:"underline"}}>Personal Details</Typography>
                    </Grid>
                    <Grid sx={{width:"100%",height:"76%"}}>
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ width: '100%', height: '76%', px: 2 }}
                        >
                            <Grid item display="flex" alignItems="center" gap={1} flexDirection="column" flex={1}>
                            <Box display="flex" alignItems="center" gap={1}>
                                {saved ? (
                                <CheckCircleIcon color="success" />
                                ) : (
                                <IconButton onClick={handleOpen} color="primary">
                                    <AddCircleOutlineIcon />
                                </IconButton>
                                )}
                                <Typography variant="body1" fontWeight="bold">
                                {saved ? 'Delivery Address:' : 'Add delivery address'}
                                </Typography>
                            </Box>
                            {saved && (
                                <>
                                <Typography variant="body2" sx={{ ml: 4 }}>
                                    {address}
                                </Typography>
                                <Typography variant="body2" sx={{ ml: 4 }}>
                                    Pincode: {pincode}
                                </Typography>
                                </>
                            )}
                            </Grid>

                            <Grid item>
                            <Button
                                variant="outlined"
                                startIcon={<EditIcon />}
                                onClick={handleOpen}
                                disabled={!saved}
                            >
                                Edit
                            </Button>
                            </Grid>
                        </Grid>

                        <Modal open={open} onClose={handleClose}>
                            <Box sx={style}>
                            <Typography variant="h6" mb={2}>
                                {saved ? 'Edit Delivery Address' : 'Add Delivery Address'}
                            </Typography>
                            <TextField
                                fullWidth
                                label="Delivery Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                multiline
                                rows={3}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Pincode"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                margin="normal"
                                inputProps={{ maxLength: 10 }} // limit length if needed
                            />
                            <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button variant="contained" onClick={handleSave}>
                                Save
                                </Button>
                            </Box>
                            </Box>
                        </Modal>
                    </Grid>
                </Grid>
                <Grid sx={{width:"100%",height:"25%",borderBottom:"1px solid"}}>
                    <Grid sx={{width:"100%",height:"20%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <Typography variant='h5' sx={{textDecoration:"underline"}}>Payment Options</Typography>
                    </Grid>
                    <Grid container justifyContent="center" alignItems="center" sx={{ width: '100%', height: '76%', px: 2 }}>
        <Grid item display="flex" flexDirection="column">
          <Box display="flex" alignItems="center" gap={1}>
            {paymentSaved ? (
              <CheckCircleIcon color="success" />
            ) : (
              <IconButton onClick={handlePaymentOpen}><AddCircleOutlineIcon /></IconButton>
            )}
            <Typography fontWeight="bold">
              {paymentSaved ? 'Payment option saved' : 'Add Payment Option'}
            </Typography>
          </Box>

          {renderSavedPayment()}
        </Grid>

        <Grid item sx={{position:"absolute",left:"1184px"}}>
          <Button variant="outlined" startIcon={<EditIcon />} onClick={handlePaymentOpen}>Edit</Button>
        </Grid>
      </Grid>

      {/* Modal for Payment Selection */}
      <Modal open={paymentOpen} onClose={handlePaymentClose}>
        <Box sx={style}>
          <Typography variant="h6" mb={2}>Select Payment Method</Typography>

          <FormControl fullWidth>
            <FormLabel>Method</FormLabel>
            <RadioGroup value={method} onChange={(e) => setMethod(e.target.value)}>
              <FormControlLabel value="debit" control={<Radio />} label="Debit Card" />
              <FormControlLabel value="credit" control={<Radio />} label="Credit Card" />
              <FormControlLabel value="upi" control={<Radio />} label="UPI" />
              <FormControlLabel value="cod" control={<Radio />} label="Pay on Delivery" />
            </RadioGroup>
          </FormControl>

          {(method === 'debit' || method === 'credit') && (
            <>
              <TextField fullWidth label="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} margin="normal" />
              <TextField fullWidth label="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} margin="normal" />
            </>
          )}

          {method === 'upi' && (
            <FormControl fullWidth margin="normal">
              <FormLabel>UPI App</FormLabel>
              <Select value={upiApp} onChange={(e) => setUpiApp(e.target.value)}>
                {Object.keys(upiAppIcons).map((app) => (
                  <MenuItem key={app} value={app}>{app}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
            <Button onClick={handlePaymentClose}>Cancel</Button>
            <Button variant="contained" onClick={handlePaymentSave}>Save</Button>
          </Box>
        </Box>
      </Modal>
                </Grid>
                <Grid sx={{width:"100%",height:"25%",borderBottom:"1px solid"}}>
                    <Grid sx={{width:"100%",height:"50px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <Typography variant='h5' sx={{textDecoration:"underline"}}>My Orders</Typography>
                    </Grid>
                </Grid>
                <Grid sx={{width:"100%",height:"25%",borderBottom:"1px solid"}}>
                    <Grid sx={{width:"100%",height:"50px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <Typography variant='h5' sx={{textDecoration:"underline"}}>Track Orders</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Box>
  );
};


