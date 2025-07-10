import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  IconButton,
  Button,
  Modal,
  TextField,
  MenuItem,
  Select,
  FormLabel,
  FormControl,
  Radio,
  FormControlLabel,
  RadioGroup,
  Avatar,
  Card,
  CardContent,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Alert,
  Snackbar,
  Tabs,
  Tab,
  Badge,
  Tooltip,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Payment as PaymentIcon,
  ShoppingBag as OrderIcon,
  Security as SecurityIcon,
  Notifications as NotificationIcon,
  Settings as SettingsIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CheckCircle as CheckCircleIcon,
  CreditCard as CreditCardIcon,
  AccountBalanceWallet as WalletIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  History as HistoryIcon,
  LocalShipping as ShippingIcon,
  Receipt as ReceiptIcon,
  ExpandMore as ExpandMoreIcon,
  AddCircleOutline as AddCircleIcon,
  QrCode as QrCodeIcon,
  Lock as LockIcon,
  VpnKey as KeyIcon,
  NotificationsActive as NotificationActiveIcon,
  NotificationsOff as NotificationOffIcon,
  Language as LanguageIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`profile-tabpanel-${index}`}
    aria-labelledby={`profile-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

export const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Tab state
  const [tabValue, setTabValue] = useState(0);
  
  // User profile state
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || '',
    avatar: user?.avatar || ''
  });
  
  // Address state
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      pincode: '10001',
      isDefault: true
    }
  ]);
  
  // Payment methods state
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'card',
      name: 'Visa ending in 1234',
      last4: '1234',
      expiry: '12/25',
      isDefault: true
    }
  ]);
  
  // Orders state
  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 45.99,
      items: 3,
      restaurant: 'Pizza Palace'
    },
    {
      id: 'ORD002',
      date: '2024-01-10',
      status: 'In Transit',
      total: 32.50,
      items: 2,
      restaurant: 'Burger House'
    }
  ]);
  
  // Settings state
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    privacy: {
      profileVisibility: 'public',
      orderHistory: 'private'
    },
    preferences: {
      language: 'English',
      currency: 'USD',
      theme: 'light'
    }
  });
  
  // Modal states
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [securityModalOpen, setSecurityModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  
  // Form states
  const [newAddress, setNewAddress] = useState({
    type: 'Home',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  
  const [newPayment, setNewPayment] = useState({
    type: 'card',
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  
  // Security state
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    showPasswords: false
  });
  
  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleProfileEdit = () => {
    setProfileModalOpen(true);
  };

  const handleProfileSave = () => {
    // Here you would typically save to backend
    setSnackbar({
      open: true,
      message: 'Profile updated successfully!',
      severity: 'success'
    });
    setProfileModalOpen(false);
  };

  const handleAddressAdd = () => {
    setSelectedAddress(null);
    setNewAddress({
      type: 'Home',
      address: '',
      city: '',
      state: '',
      pincode: ''
    });
    setAddressModalOpen(true);
  };

  const handleAddressEdit = (address) => {
    setSelectedAddress(address);
    setNewAddress({ ...address });
    setAddressModalOpen(true);
  };

  const handleAddressSave = () => {
    if (selectedAddress) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === selectedAddress.id ? { ...newAddress, id: addr.id } : addr
      ));
    } else {
      // Add new address
      setAddresses([...addresses, { ...newAddress, id: Date.now() }]);
    }
    setSnackbar({
      open: true,
      message: selectedAddress ? 'Address updated successfully!' : 'Address added successfully!',
      severity: 'success'
    });
    setAddressModalOpen(false);
  };

  const handlePaymentAdd = () => {
    setSelectedPayment(null);
    setNewPayment({
      type: 'card',
      cardNumber: '',
      expiry: '',
      cvv: '',
      name: ''
    });
    setPaymentModalOpen(true);
  };

  const handlePaymentEdit = (payment) => {
    setSelectedPayment(payment);
    setNewPayment({ ...payment });
    setPaymentModalOpen(true);
  };

  const handlePaymentSave = () => {
    if (selectedPayment) {
      // Update existing payment method
      setPaymentMethods(paymentMethods.map(pay => 
        pay.id === selectedPayment.id ? { ...newPayment, id: pay.id } : pay
      ));
    } else {
      // Add new payment method
      setPaymentMethods([...paymentMethods, { ...newPayment, id: Date.now() }]);
    }
    setSnackbar({
      open: true,
      message: selectedPayment ? 'Payment method updated successfully!' : 'Payment method added successfully!',
      severity: 'success'
    });
    setPaymentModalOpen(false);
  };

  const handleSecuritySave = () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      setSnackbar({
        open: true,
        message: 'Passwords do not match!',
        severity: 'error'
      });
      return;
    }
    setSnackbar({
      open: true,
      message: 'Password updated successfully!',
      severity: 'success'
    });
    setSecurityModalOpen(false);
  };

  const handleSettingChange = (category, setting, value) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [setting]: value
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'success';
      case 'In Transit': return 'warning';
      case 'Processing': return 'info';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', pt: 10, marginTop: "100px" }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#FF8C00', mb: 1 }}>
            My Profile
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your account settings, preferences, and personal information
                        </Typography>
                    </Box>

        {/* Profile Overview Card */}
        <Card sx={{ mb: 4, bgcolor: 'white', borderRadius: 3, boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <IconButton
                      size="small"
                      sx={{ bgcolor: '#FF8C00', color: 'white', '&:hover': { bgcolor: '#e67e00' } }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  }
                >
                  <Avatar
                    sx={{ width: 80, height: 80, bgcolor: '#FF8C00', fontSize: '2rem' }}
                  >
                    {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                  </Avatar>
                </Badge>
              </Grid>
              <Grid item xs>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  {user?.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Member since {formatDate(user?.createdAt || new Date())}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={handleProfileEdit}
                  sx={{ borderRadius: 2 }}
                >
                  Edit Profile
                </Button>
                </Grid>
                </Grid>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Left Sidebar */}
          <Grid item xs={12} md={3}>
            <Card sx={{ bgcolor: 'white', borderRadius: 3, boxShadow: 3 }}>
              <CardContent sx={{ p: 0 }}>
                <Tabs
                  orientation="vertical"
                  value={tabValue}
                  onChange={handleTabChange}
                        sx={{
                    '& .MuiTab-root': {
                      alignItems: 'flex-start',
                      textAlign: 'left',
                      minHeight: 60,
                      px: 3,
                      py: 2,
                      '&.Mui-selected': {
                        bgcolor: '#fff3e0',
                        color: '#FF8C00',
                        fontWeight: 'bold'
                      }
                    }
                  }}
                >
                  <Tab
                    icon={<PersonIcon />}
                    label="Personal Info"
                    iconPosition="start"
                  />
                  <Tab
                    icon={<LocationIcon />}
                    label="Addresses"
                    iconPosition="start"
                  />
                  <Tab
                    icon={<PaymentIcon />}
                    label="Payment Methods"
                    iconPosition="start"
                  />
                  <Tab
                    icon={<OrderIcon />}
                    label="Order History"
                    iconPosition="start"
                  />
                  <Tab
                    icon={<SecurityIcon />}
                    label="Security"
                    iconPosition="start"
                  />
                  <Tab
                    icon={<SettingsIcon />}
                    label="Settings"
                    iconPosition="start"
                  />
                </Tabs>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Content */}
          <Grid item xs={12} md={9}>
            <Card sx={{ bgcolor: 'white', borderRadius: 3, boxShadow: 3, minHeight: 600 }}>
              {/* Personal Info Tab */}
              <TabPanel value={tabValue} index={0}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Personal Information
                        </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        value={profileData.firstName}
                        disabled
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        value={profileData.lastName}
                        disabled
                        sx={{ mb: 2 }}
                      />
                </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        value={profileData.email}
                        disabled
                        sx={{ mb: 2 }}
                      />
                </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone"
                        value={profileData.phone}
                        disabled
                        sx={{ mb: 2 }}
                      />
                </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Date of Birth"
                        value={profileData.dateOfBirth}
                        disabled
                        sx={{ mb: 2 }}
                      />
                </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Gender"
                        value={profileData.gender}
                        disabled
                        sx={{ mb: 2 }}
                      />
                </Grid>
            </Grid>
        </Box>
              </TabPanel>

              {/* Addresses Tab */}
              <TabPanel value={tabValue} index={1}>
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Delivery Addresses
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddressAdd}
                    sx={{ bgcolor: '#FF8C00', '&:hover': { bgcolor: '#e67e00' } }}
                  >
                    Add Address
                  </Button>
                </Box>
                
                <Grid container spacing={2}>
                  {addresses.map((address) => (
                    <Grid item xs={12} sm={6} key={address.id}>
                      <Card sx={{ border: address.isDefault ? '2px solid #FF8C00' : '1px solid #e0e0e0' }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Chip
                              label={address.type}
                              color={address.isDefault ? 'primary' : 'default'}
                              size="small"
                            />
                            <IconButton size="small" onClick={() => handleAddressEdit(address)}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Box>
                          <Typography variant="body1" sx={{ mb: 1 }}>
                            {address.address}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {address.city}, {address.state} {address.pincode}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

              {/* Payment Methods Tab */}
              <TabPanel value={tabValue} index={2}>
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Payment Methods
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handlePaymentAdd}
                    sx={{ bgcolor: '#FF8C00', '&:hover': { bgcolor: '#e67e00' } }}
                  >
                    Add Payment Method
                  </Button>
                </Box>
                
                <Grid container spacing={2}>
                  {paymentMethods.map((payment) => (
                    <Grid item xs={12} sm={6} key={payment.id}>
                      <Card sx={{ border: payment.isDefault ? '2px solid #FF8C00' : '1px solid #e0e0e0' }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CreditCardIcon color="primary" />
                                <Typography variant="body1" fontWeight="bold">
                                {payment.name}
                                </Typography>
                            </Box>
                            <IconButton size="small" onClick={() => handlePaymentEdit(payment)}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            Expires: {payment.expiry}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

              {/* Order History Tab */}
              <TabPanel value={tabValue} index={3}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Order History
                </Typography>
                
                <Grid container spacing={2}>
                  {orders.map((order) => (
                    <Grid item xs={12} key={order.id}>
                      <Card>
                        <CardContent>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={3}>
                              <Typography variant="h6" fontWeight="bold">
                                {order.id}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {formatDate(order.date)}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                              <Typography variant="body1">
                                {order.restaurant}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {order.items} items
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Typography variant="h6" fontWeight="bold">
                                {formatPrice(order.total)}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Chip
                                label={order.status}
                                color={getStatusColor(order.status)}
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => navigate(`/order/${order.id}`)}
                            >
                                View Details
                            </Button>
                            </Grid>
                        </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

              {/* Security Tab */}
              <TabPanel value={tabValue} index={4}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Security Settings
            </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LockIcon color="primary" />
                          Change Password
                        </Typography>
                        <Button
                          variant="outlined"
                          onClick={() => setSecurityModalOpen(true)}
                          startIcon={<KeyIcon />}
                        >
                          Update Password
                        </Button>
                      </CardContent>
                    </Card>
        </Grid>

                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                          <QrCodeIcon color="primary" />
                          Two-Factor Authentication
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Switch />
                          <Typography variant="body2">
                            Enable 2FA for enhanced security
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
        </Grid>
                </Grid>
              </TabPanel>

              {/* Settings Tab */}
              <TabPanel value={tabValue} index={5}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Account Settings
                </Typography>
                
                <Grid container spacing={3}>
                  {/* Notifications */}
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                          <NotificationIcon color="primary" />
                          Notifications
                        </Typography>
                        
                        <Box sx={{ mb: 2 }}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={settings.notifications.email}
                                onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                              />
                            }
                            label="Email Notifications"
                          />
                        </Box>
                        
                        <Box sx={{ mb: 2 }}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={settings.notifications.sms}
                                onChange={(e) => handleSettingChange('notifications', 'sms', e.target.checked)}
                              />
                            }
                            label="SMS Notifications"
                          />
                        </Box>
                        
                        <Box sx={{ mb: 2 }}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={settings.notifications.push}
                                onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                              />
                            }
                            label="Push Notifications"
                          />
                        </Box>
                      </CardContent>
                    </Card>
      </Grid>

                  {/* Preferences */}
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                          <SettingsIcon color="primary" />
                          Preferences
                        </Typography>
                        
                        <FormControl fullWidth sx={{ mb: 2 }}>
                          <FormLabel>Language</FormLabel>
                          <Select
                            value={settings.preferences.language}
                            onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
                          >
                            <MenuItem value="English">English</MenuItem>
                            <MenuItem value="Spanish">Spanish</MenuItem>
                            <MenuItem value="French">French</MenuItem>
                          </Select>
          </FormControl>

                        <FormControl fullWidth sx={{ mb: 2 }}>
                          <FormLabel>Currency</FormLabel>
                          <Select
                            value={settings.preferences.currency}
                            onChange={(e) => handleSettingChange('preferences', 'currency', e.target.value)}
                          >
                            <MenuItem value="USD">USD ($)</MenuItem>
                            <MenuItem value="EUR">EUR (€)</MenuItem>
                            <MenuItem value="GBP">GBP (£)</MenuItem>
              </Select>
            </FormControl>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Typography variant="body2">Theme</Typography>
                          <IconButton
                            onClick={() => handleSettingChange('preferences', 'theme', 
                              settings.preferences.theme === 'light' ? 'dark' : 'light'
                            )}
                          >
                            {settings.preferences.theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                          </IconButton>
          </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>
            </Card>
          </Grid>
        </Grid>
        </Box>

      {/* Profile Edit Modal */}
      <Dialog open={profileModalOpen} onClose={() => setProfileModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={profileData.firstName}
                onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={profileData.lastName}
                onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                value={profileData.dateOfBirth}
                onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel>Gender</FormLabel>
                <Select
                  value={profileData.gender}
                  onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProfileModalOpen(false)}>Cancel</Button>
          <Button onClick={handleProfileSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Address Modal */}
      <Dialog open={addressModalOpen} onClose={() => setAddressModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedAddress ? 'Edit Address' : 'Add New Address'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel>Address Type</FormLabel>
                <Select
                  value={newAddress.type}
                  onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
                >
                  <MenuItem value="Home">Home</MenuItem>
                  <MenuItem value="Work">Work</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={3}
                value={newAddress.address}
                onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="City"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="State"
                value={newAddress.state}
                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Pincode"
                value={newAddress.pincode}
                onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddressModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAddressSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Payment Method Modal */}
      <Dialog open={paymentModalOpen} onClose={() => setPaymentModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedPayment ? 'Edit Payment Method' : 'Add Payment Method'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel>Payment Type</FormLabel>
                <Select
                  value={newPayment.type}
                  onChange={(e) => setNewPayment({ ...newPayment, type: e.target.value })}
                >
                  <MenuItem value="card">Credit/Debit Card</MenuItem>
                  <MenuItem value="upi">UPI</MenuItem>
                  <MenuItem value="wallet">Digital Wallet</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {newPayment.type === 'card' && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Card Number"
                    value={newPayment.cardNumber}
                    onChange={(e) => setNewPayment({ ...newPayment, cardNumber: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Expiry Date"
                    placeholder="MM/YY"
                    value={newPayment.expiry}
                    onChange={(e) => setNewPayment({ ...newPayment, expiry: e.target.value })}
                  />
                    </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="CVV"
                    value={newPayment.cvv}
                    onChange={(e) => setNewPayment({ ...newPayment, cvv: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Cardholder Name"
                    value={newPayment.name}
                    onChange={(e) => setNewPayment({ ...newPayment, name: e.target.value })}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentModalOpen(false)}>Cancel</Button>
          <Button onClick={handlePaymentSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Security Modal */}
      <Dialog open={securityModalOpen} onClose={() => setSecurityModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Password"
                type={securityData.showPasswords ? 'text' : 'password'}
                value={securityData.currentPassword}
                onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setSecurityData({ ...securityData, showPasswords: !securityData.showPasswords })}
                    >
                      {securityData.showPasswords ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New Password"
                type={securityData.showPasswords ? 'text' : 'password'}
                value={securityData.newPassword}
                onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm New Password"
                type={securityData.showPasswords ? 'text' : 'password'}
                value={securityData.confirmPassword}
                onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSecurityModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSecuritySave} variant="contained">Update Password</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
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


