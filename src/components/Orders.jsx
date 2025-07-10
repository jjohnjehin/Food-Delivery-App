import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
  Avatar,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  Tooltip,
  Alert,
  Snackbar,
  Tabs,
  Tab,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';
import {
  ShoppingBag as OrderIcon,
  LocalShipping as ShippingIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
  Cancel as CancelIcon,
  Visibility as ViewIcon,
  Receipt as ReceiptIcon,
  Restaurant as RestaurantIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  AccessTime as TimeIcon,
  Payment as PaymentIcon,
  Star as StarIcon,
  RateReview as ReviewIcon,
  Replay as ReorderIcon,
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Directions as DirectionsIcon,
  Call as CallIcon,
  Message as MessageIcon,
  Timeline as TimelineIcon,
  LocalOffer as OfferIcon,
  LocalOffer as DiscountIcon,
  Security as SecurityIcon,
  Verified as VerifiedIcon,
  Warning as WarningIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`orders-tabpanel-${index}`}
    aria-labelledby={`orders-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

export const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Tab state
  const [tabValue, setTabValue] = useState(0);
  
  // Order states
  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      orderNumber: '#ORD-2024-001',
      date: '2024-01-15T14:30:00',
      status: 'Delivered',
      statusCode: 'delivered',
      total: 45.99,
      subtotal: 42.99,
      deliveryFee: 3.00,
      tax: 0.00,
      items: [
        {
          id: 1,
          name: 'Margherita Pizza',
          quantity: 2,
          price: 18.99,
          specialInstructions: 'Extra cheese, no onions',
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop'
        },
        {
          id: 2,
          name: 'Garlic Bread',
          quantity: 1,
          price: 4.99,
          specialInstructions: '',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop'
        }
      ],
      restaurant: {
        name: 'Pizza Palace',
        address: '123 Main Street, New York, NY 10001',
        phone: '+1 (555) 123-4567',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop'
      },
      delivery: {
        address: '456 Oak Avenue, New York, NY 10002',
        estimatedTime: '30-45 minutes',
        actualTime: '35 minutes',
        driver: {
          name: 'John Smith',
          phone: '+1 (555) 987-6543',
          vehicle: 'Honda Civic - ABC123'
        }
      },
      payment: {
        method: 'Credit Card',
        last4: '1234',
        status: 'Paid'
      },
      timeline: [
        {
          step: 'Order Placed',
          time: '2024-01-15T14:30:00',
          completed: true,
          icon: <OrderIcon />
        },
        {
          step: 'Confirmed',
          time: '2024-01-15T14:32:00',
          completed: true,
          icon: <CheckIcon />
        },
        {
          step: 'Preparing',
          time: '2024-01-15T14:35:00',
          completed: true,
          icon: <RestaurantIcon />
        },
        {
          step: 'On the Way',
          time: '2024-01-15T14:50:00',
          completed: true,
          icon: <ShippingIcon />
        },
        {
          step: 'Delivered',
          time: '2024-01-15T15:05:00',
          completed: true,
          icon: <CheckIcon />
        }
      ],
      rating: 5,
      review: 'Great food and fast delivery! Will order again.',
      reorder: true
    },
    {
      id: 'ORD002',
      orderNumber: '#ORD-2024-002',
      date: '2024-01-10T18:15:00',
      status: 'In Transit',
      statusCode: 'in_transit',
      total: 32.50,
      subtotal: 29.50,
      deliveryFee: 3.00,
      tax: 0.00,
      items: [
        {
          id: 3,
          name: 'Classic Burger',
          quantity: 1,
          price: 12.99,
          specialInstructions: 'Medium rare, extra pickles',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop'
        },
        {
          id: 4,
          name: 'French Fries',
          quantity: 1,
          price: 4.99,
          specialInstructions: 'Extra crispy',
          image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=100&h=100&fit=crop'
        },
        {
          id: 5,
          name: 'Chocolate Shake',
          quantity: 1,
          price: 6.99,
          specialInstructions: '',
          image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=100&h=100&fit=crop'
        }
      ],
      restaurant: {
        name: 'Burger House',
        address: '789 Burger Lane, New York, NY 10003',
        phone: '+1 (555) 456-7890',
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop'
      },
      delivery: {
        address: '456 Oak Avenue, New York, NY 10002',
        estimatedTime: '25-35 minutes',
        actualTime: null,
        driver: {
          name: 'Sarah Johnson',
          phone: '+1 (555) 321-0987',
          vehicle: 'Toyota Camry - XYZ789'
        }
      },
      payment: {
        method: 'UPI',
        last4: null,
        status: 'Paid'
      },
      timeline: [
        {
          step: 'Order Placed',
          time: '2024-01-10T18:15:00',
          completed: true,
          icon: <OrderIcon />
        },
        {
          step: 'Confirmed',
          time: '2024-01-10T18:17:00',
          completed: true,
          icon: <CheckIcon />
        },
        {
          step: 'Preparing',
          time: '2024-01-10T18:20:00',
          completed: true,
          icon: <RestaurantIcon />
        },
        {
          step: 'On the Way',
          time: '2024-01-10T18:35:00',
          completed: true,
          icon: <ShippingIcon />
        },
        {
          step: 'Delivered',
          time: null,
          completed: false,
          icon: <CheckIcon />
        }
      ],
      rating: null,
      review: null,
      reorder: true
    },
    {
      id: 'ORD003',
      orderNumber: '#ORD-2024-003',
      date: '2024-01-08T12:00:00',
      status: 'Cancelled',
      statusCode: 'cancelled',
      total: 28.99,
      subtotal: 25.99,
      deliveryFee: 3.00,
      tax: 0.00,
      items: [
        {
          id: 6,
          name: 'Chicken Pasta',
          quantity: 1,
          price: 16.99,
          specialInstructions: 'Alfredo sauce, extra chicken',
          image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=100&h=100&fit=crop'
        },
        {
          id: 7,
          name: 'Caesar Salad',
          quantity: 1,
          price: 8.99,
          specialInstructions: 'No croutons',
          image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop'
        }
      ],
      restaurant: {
        name: 'Pasta Paradise',
        address: '321 Pasta Street, New York, NY 10004',
        phone: '+1 (555) 789-0123',
        rating: 4.0,
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop'
      },
      delivery: {
        address: '456 Oak Avenue, New York, NY 10002',
        estimatedTime: '35-45 minutes',
        actualTime: null,
        driver: null
      },
      payment: {
        method: 'Credit Card',
        last4: '5678',
        status: 'Refunded'
      },
      timeline: [
        {
          step: 'Order Placed',
          time: '2024-01-08T12:00:00',
          completed: true,
          icon: <OrderIcon />
        },
        {
          step: 'Confirmed',
          time: '2024-01-08T12:02:00',
          completed: true,
          icon: <CheckIcon />
        },
        {
          step: 'Cancelled',
          time: '2024-01-08T12:10:00',
          completed: true,
          icon: <CancelIcon />
        }
      ],
      rating: null,
      review: null,
      reorder: true
    }
  ]);
  
  // Modal states
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetailOpen, setOrderDetailOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    review: ''
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

  const handleOrderDetail = (order) => {
    setSelectedOrder(order);
    setOrderDetailOpen(true);
  };

  const handleReorder = (order) => {
    // Here you would typically add items to cart
    setSnackbar({
      open: true,
      message: 'Items added to cart for reorder!',
      severity: 'success'
    });
    navigate('/Cart');
  };

  const handleReview = (order) => {
    setSelectedOrder(order);
    setReviewData({
      rating: order.rating || 5,
      review: order.review || ''
    });
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = () => {
    // Here you would typically save the review to backend
    setSnackbar({
      open: true,
      message: 'Review submitted successfully!',
      severity: 'success'
    });
    setReviewModalOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'success';
      case 'In Transit': return 'warning';
      case 'Preparing': return 'info';
      case 'Confirmed': return 'primary';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckIcon />;
      case 'In Transit': return <ShippingIcon />;
      case 'Preparing': return <RestaurantIcon />;
      case 'Confirmed': return <CheckIcon />;
      case 'Cancelled': return <CancelIcon />;
      default: return <ScheduleIcon />;
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActiveStep = (timeline) => {
    const activeSteps = timeline.filter(step => step.completed);
    return activeSteps.length - 1;
  };

  const filteredOrders = () => {
    switch (tabValue) {
      case 0: return orders; // All orders
      case 1: return orders.filter(order => order.status === 'Delivered'); // Completed
      case 2: return orders.filter(order => ['In Transit', 'Preparing', 'Confirmed'].includes(order.status)); // Active
      case 3: return orders.filter(order => order.status === 'Cancelled'); // Cancelled
      default: return orders;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', pt: 10, marginTop: "100px" }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#FF8C00', mb: 1 }}>
            My Orders
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track your orders and view order history
          </Typography>
        </Box>

        {/* Order Statistics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'white', borderRadius: 3, boxShadow: 3 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FF8C00' }}>
                  {orders.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Orders
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'white', borderRadius: 3, boxShadow: 3 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                  {orders.filter(o => o.status === 'Delivered').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'white', borderRadius: 3, boxShadow: 3 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                  {orders.filter(o => ['In Transit', 'Preparing', 'Confirmed'].includes(o.status)).length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'white', borderRadius: 3, boxShadow: 3 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                  {orders.filter(o => o.status === 'Cancelled').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cancelled
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Main Content */}
        <Card sx={{ bgcolor: 'white', borderRadius: 3, boxShadow: 3 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                '& .MuiTab-root': {
                  minHeight: 60,
                  fontSize: '1rem',
                  fontWeight: 500,
                  '&.Mui-selected': {
                    color: '#FF8C00',
                    fontWeight: 'bold'
                  }
                }
              }}
            >
              <Tab label={`All Orders (${orders.length})`} />
              <Tab label={`Completed (${orders.filter(o => o.status === 'Delivered').length})`} />
              <Tab label={`Active (${orders.filter(o => ['In Transit', 'Preparing', 'Confirmed'].includes(o.status)).length})`} />
              <Tab label={`Cancelled (${orders.filter(o => o.status === 'Cancelled').length})`} />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <OrdersList orders={filteredOrders()} onOrderDetail={handleOrderDetail} onReorder={handleReorder} onReview={handleReview} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <OrdersList orders={filteredOrders()} onOrderDetail={handleOrderDetail} onReorder={handleReorder} onReview={handleReview} />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <OrdersList orders={filteredOrders()} onOrderDetail={handleOrderDetail} onReorder={handleReorder} onReview={handleReview} />
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <OrdersList orders={filteredOrders()} onOrderDetail={handleOrderDetail} onReorder={handleReorder} onReview={handleReview} />
          </TabPanel>
        </Card>
      </Box>

      {/* Order Detail Modal */}
      <Dialog 
        open={orderDetailOpen} 
        onClose={() => setOrderDetailOpen(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        {selectedOrder && (
          <>
            <DialogTitle sx={{ bgcolor: '#FF8C00', color: 'white' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">
                  Order Details - {selectedOrder.orderNumber}
                </Typography>
                <IconButton onClick={() => setOrderDetailOpen(false)} sx={{ color: 'white' }}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent sx={{ p: 3 }}>
              <OrderDetailContent order={selectedOrder} />
            </DialogContent>
            <DialogActions sx={{ p: 3, gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<PrintIcon />}
                onClick={() => window.print()}
              >
                Print Receipt
              </Button>
              <Button
                variant="outlined"
                startIcon={<ShareIcon />}
              >
                Share Order
              </Button>
              {selectedOrder.reorder && (
                <Button
                  variant="contained"
                  startIcon={<ReorderIcon />}
                  onClick={() => handleReorder(selectedOrder)}
                  sx={{ bgcolor: '#FF8C00', '&:hover': { bgcolor: '#e67e00' } }}
                >
                  Reorder
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Review Modal */}
      <Dialog 
        open={reviewModalOpen} 
        onClose={() => setReviewModalOpen(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle>Rate Your Order</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              How was your experience with {selectedOrder?.restaurant.name}?
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <IconButton
                  key={star}
                  onClick={() => setReviewData({ ...reviewData, rating: star })}
                  sx={{ color: star <= reviewData.rating ? '#FF8C00' : 'grey.400' }}
                >
                  <StarIcon />
                </IconButton>
              ))}
            </Box>
            
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Write your review (optional)"
              value={reviewData.review}
              onChange={(e) => setReviewData({ ...reviewData, review: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReviewModalOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleReviewSubmit} 
            variant="contained"
            sx={{ bgcolor: '#FF8C00', '&:hover': { bgcolor: '#e67e00' } }}
          >
            Submit Review
          </Button>
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

// Orders List Component
const OrdersList = ({ orders, onOrderDetail, onReorder, onReview }) => {
  if (orders.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <OrderIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          No orders found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Start ordering delicious food to see your order history here
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {orders.map((order) => (
        <Grid item xs={12} key={order.id}>
          <OrderCard 
            order={order} 
            onOrderDetail={onOrderDetail}
            onReorder={onReorder}
            onReview={onReview}
          />
        </Grid>
      ))}
    </Grid>
  );
};

// Order Card Component
const OrderCard = ({ order, onOrderDetail, onReorder, onReview }) => {
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'success';
      case 'In Transit': return 'warning';
      case 'Preparing': return 'info';
      case 'Confirmed': return 'primary';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckIcon />;
      case 'In Transit': return <ShippingIcon />;
      case 'Preparing': return <RestaurantIcon />;
      case 'Confirmed': return <CheckIcon />;
      case 'Cancelled': return <CancelIcon />;
      default: return <ScheduleIcon />;
    }
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, overflow: 'hidden' }}>
      <CardContent sx={{ p: 0 }}>
        {/* Order Header */}
        <Box sx={{ 
          bgcolor: 'grey.50', 
          p: 3, 
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" fontWeight="bold">
                {order.orderNumber}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(order.date)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Chip
                icon={getStatusIcon(order.status)}
                label={order.status}
                color={getStatusColor(order.status)}
                sx={{ fontWeight: 'bold' }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" fontWeight="bold" color="#FF8C00">
                {formatPrice(order.total)}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Order Content */}
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {/* Restaurant Info */}
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar
                  src={order.restaurant.image}
                  sx={{ width: 50, height: 50 }}
                >
                  <RestaurantIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {order.restaurant.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <StarIcon sx={{ fontSize: 16, color: '#FF8C00' }} />
                    <Typography variant="body2">
                      {order.restaurant.rating} ({order.restaurant.rating * 20}%)
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <LocationIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {order.delivery.address}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {order.restaurant.phone}
                </Typography>
              </Box>
            </Grid>

            {/* Order Items */}
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Order Items ({order.items.length})
              </Typography>
              {order.items.slice(0, 2).map((item) => (
                <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Avatar
                    src={item.image}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight="medium">
                      {item.quantity}x {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatPrice(item.price)}
                    </Typography>
                  </Box>
                </Box>
              ))}
              {order.items.length > 2 && (
                <Typography variant="body2" color="text.secondary">
                  +{order.items.length - 2} more items
                </Typography>
              )}
            </Grid>

            {/* Order Actions */}
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<ViewIcon />}
                  onClick={() => onOrderDetail(order)}
                  fullWidth
                >
                  View Details
                </Button>
                
                {order.status === 'Delivered' && !order.rating && (
                  <Button
                    variant="outlined"
                    startIcon={<ReviewIcon />}
                    onClick={() => onReview(order)}
                    fullWidth
                  >
                    Rate Order
                  </Button>
                )}
                
                {order.reorder && (
                  <Button
                    variant="contained"
                    startIcon={<ReorderIcon />}
                    onClick={() => onReorder(order)}
                    sx={{ bgcolor: '#FF8C00', '&:hover': { bgcolor: '#e67e00' } }}
                    fullWidth
                  >
                    Reorder
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

// Order Detail Content Component
const OrderDetailContent = ({ order }) => {
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActiveStep = (timeline) => {
    const activeSteps = timeline.filter(step => step.completed);
    return activeSteps.length - 1;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'success';
      case 'In Transit': return 'warning';
      case 'Preparing': return 'info';
      case 'Confirmed': return 'primary';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Order Timeline */}
      <Grid item xs={12} md={6}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Order Progress
        </Typography>
        <Stepper activeStep={getActiveStep(order.timeline)} orientation="vertical">
          {order.timeline.map((step, index) => (
            <Step key={index}>
              <StepLabel
                icon={step.icon}
                sx={{
                  '& .MuiStepLabel-iconContainer': {
                    color: step.completed ? '#FF8C00' : 'grey.400'
                  }
                }}
              >
                <Box>
                  <Typography variant="body1" fontWeight="medium">
                    {step.step}
                  </Typography>
                  {step.time && (
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(step.time)}
                    </Typography>
                  )}
                </Box>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>

      {/* Order Details */}
      <Grid item xs={12} md={6}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Order Details
        </Typography>
        
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Order Number</TableCell>
                <TableCell>{order.orderNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Order Date</TableCell>
                <TableCell>{formatDate(order.date)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Payment Method</TableCell>
                <TableCell>{order.payment.method}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Payment Status</TableCell>
                <TableCell>
                  <Chip
                    label={order.payment.status}
                    color={order.payment.status === 'Paid' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Price Breakdown */}
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Price Breakdown
        </Typography>
        
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Subtotal</TableCell>
                <TableCell align="right">{formatPrice(order.subtotal)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Delivery Fee</TableCell>
                <TableCell align="right">{formatPrice(order.deliveryFee)}</TableCell>
              </TableRow>
              {order.tax > 0 && (
                <TableRow>
                  <TableCell>Tax</TableCell>
                  <TableCell align="right">{formatPrice(order.tax)}</TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  {formatPrice(order.total)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      {/* Order Items */}
      <Grid item xs={12}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Order Items
        </Typography>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={item.image}
                        sx={{ width: 40, height: 40 }}
                      />
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          {item.name}
                        </Typography>
                        {item.specialInstructions && (
                          <Typography variant="body2" color="text.secondary">
                            {item.specialInstructions}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{formatPrice(item.price)}</TableCell>
                  <TableCell>{formatPrice(item.price * item.quantity)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      {/* Delivery Information */}
      {order.delivery.driver && (
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Delivery Information
          </Typography>
          
          <Card sx={{ bgcolor: 'grey.50' }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Driver Details
                  </Typography>
                  <Typography variant="body2">
                    {order.delivery.driver.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {order.delivery.driver.vehicle}
                  </Typography>
                  <Button
                    startIcon={<CallIcon />}
                    size="small"
                    sx={{ mt: 1 }}
                  >
                    Call Driver
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Delivery Address
                  </Typography>
                  <Typography variant="body2">
                    {order.delivery.address}
                  </Typography>
                  <Button
                    startIcon={<DirectionsIcon />}
                    size="small"
                    sx={{ mt: 1 }}
                  >
                    Get Directions
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}

      {/* Review Section */}
      {order.status === 'Delivered' && (
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Your Review
          </Typography>
          
          {order.rating ? (
            <Card sx={{ bgcolor: 'success.50' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  {[...Array(5)].map((_, index) => (
                    <StarIcon
                      key={index}
                      sx={{
                        color: index < order.rating ? '#FF8C00' : 'grey.400',
                        fontSize: 20
                      }}
                    />
                  ))}
                </Box>
                <Typography variant="body1">
                  {order.review}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Card sx={{ bgcolor: 'warning.50' }}>
              <CardContent>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  How was your experience? Share your feedback!
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<ReviewIcon />}
                  sx={{ bgcolor: '#FF8C00', '&:hover': { bgcolor: '#e67e00' } }}
                >
                  Rate Order
                </Button>
              </CardContent>
            </Card>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default Orders; 