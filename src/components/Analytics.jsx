import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Avatar,
  IconButton,
  Tooltip,
  Alert,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Visibility as VisibilityIcon,
  ShoppingCart as ShoppingCartIcon,
  Star as StarIcon,
  AttachMoney as MoneyIcon,
  People as PeopleIcon,
  LocalShipping as DeliveryIcon,
  Restaurant as RestaurantIcon,
  CalendarToday as CalendarIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useWorkflow } from '../context/WorkflowContext';

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`analytics-tabpanel-${index}`}
    aria-labelledby={`analytics-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

export const Analytics = () => {
  const { user, token } = useAuth();
  const { formatPrice, formatDate } = useWorkflow();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('30');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Analytics data
  const [analytics, setAnalytics] = useState({
    overview: {
      totalOrders: 0,
      totalRevenue: 0,
      averageOrderValue: 0,
      customerCount: 0,
      rating: 0,
      completionRate: 0
    },
    trends: {
      orders: [],
      revenue: [],
      customers: []
    },
    topProducts: [],
    recentOrders: [],
    customerInsights: {
      newCustomers: 0,
      returningCustomers: 0,
      averageRating: 0,
      topCategories: []
    }
  });

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual endpoint
      const response = await fetch(`http://localhost:5000/api/business/analytics?timeRange=${timeRange}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      } else {
        // Mock data for demonstration
        setAnalytics({
          overview: {
            totalOrders: 156,
            totalRevenue: 45230,
            averageOrderValue: 290,
            customerCount: 89,
            rating: 4.2,
            completionRate: 94.5
          },
          trends: {
            orders: [
              { date: '2023-12-01', value: 12 },
              { date: '2023-12-02', value: 15 },
              { date: '2023-12-03', value: 18 },
              { date: '2023-12-04', value: 14 },
              { date: '2023-12-05', value: 20 },
              { date: '2023-12-06', value: 22 },
              { date: '2023-12-07', value: 19 }
            ],
            revenue: [
              { date: '2023-12-01', value: 3200 },
              { date: '2023-12-02', value: 4100 },
              { date: '2023-12-03', value: 5200 },
              { date: '2023-12-04', value: 3800 },
              { date: '2023-12-05', value: 6100 },
              { date: '2023-12-06', value: 6800 },
              { date: '2023-12-07', value: 5400 }
            ],
            customers: [
              { date: '2023-12-01', value: 8 },
              { date: '2023-12-02', value: 12 },
              { date: '2023-12-03', value: 15 },
              { date: '2023-12-04', value: 10 },
              { date: '2023-12-05', value: 18 },
              { date: '2023-12-06', value: 20 },
              { date: '2023-12-07', value: 16 }
            ]
          },
          topProducts: [
            { name: 'Margherita Pizza', orders: 45, revenue: 13500, rating: 4.5 },
            { name: 'Pepperoni Pizza', orders: 38, revenue: 11400, rating: 4.3 },
            { name: 'Chicken Wings', orders: 32, revenue: 9600, rating: 4.4 },
            { name: 'Pasta Carbonara', orders: 28, revenue: 8400, rating: 4.2 },
            { name: 'Caesar Salad', orders: 25, revenue: 7500, rating: 4.1 }
          ],
          recentOrders: [
            { id: '#ORD001', customer: 'John Doe', amount: 450, status: 'completed', date: '2023-12-07' },
            { id: '#ORD002', customer: 'Jane Smith', amount: 320, status: 'preparing', date: '2023-12-07' },
            { id: '#ORD003', customer: 'Mike Johnson', amount: 580, status: 'delivered', date: '2023-12-06' },
            { id: '#ORD004', customer: 'Sarah Wilson', amount: 290, status: 'completed', date: '2023-12-06' },
            { id: '#ORD005', customer: 'David Brown', amount: 410, status: 'cancelled', date: '2023-12-05' }
          ],
          customerInsights: {
            newCustomers: 23,
            returningCustomers: 66,
            averageRating: 4.2,
            topCategories: [
              { name: 'Pizza', orders: 83, percentage: 53.2 },
              { name: 'Wings', orders: 32, percentage: 20.5 },
              { name: 'Pasta', orders: 28, percentage: 17.9 },
              { name: 'Salads', orders: 13, percentage: 8.4 }
            ]
          }
        });
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      showSnackbar('Failed to load analytics data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'preparing': return 'warning';
      case 'delivered': return 'info';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getTrendIcon = (current, previous) => {
    return current > previous ? <TrendingUpIcon color="success" /> : <TrendingDownIcon color="error" />;
  };

  const calculateGrowth = (current, previous) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#f5f5f5', 
      pt: 12,
      marginTop: "100px"
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Business Analytics
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track your business performance and customer insights
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="7">Last 7 days</MenuItem>
              <MenuItem value="30">Last 30 days</MenuItem>
              <MenuItem value="90">Last 90 days</MenuItem>
              <MenuItem value="365">Last year</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchAnalytics}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
          >
            Export
          </Button>
        </Box>
      </Box>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Orders
                  </Typography>
                  <Typography variant="h4">{analytics.overview.totalOrders}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    +12% from last period
                  </Typography>
                </Box>
                <ShoppingCartIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Revenue
                  </Typography>
                  <Typography variant="h4">{formatPrice(analytics.overview.totalRevenue)}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    +8% from last period
                  </Typography>
                </Box>
                <MoneyIcon sx={{ fontSize: 40, color: 'success.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Average Order
                  </Typography>
                  <Typography variant="h4">{formatPrice(analytics.overview.averageOrderValue)}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    +5% from last period
                  </Typography>
                </Box>
                <RestaurantIcon sx={{ fontSize: 40, color: 'warning.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Customer Rating
                  </Typography>
                  <Typography variant="h4">{analytics.overview.rating}/5</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {analytics.overview.completionRate}% completion rate
                  </Typography>
                </Box>
                <StarIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ width: '100%' }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Overview" />
          <Tab label="Top Products" />
          <Tab label="Recent Orders" />
          <Tab label="Customer Insights" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Order Trends
                  </Typography>
                  <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography color="textSecondary">Chart placeholder - Order trends over time</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Revenue Trends
                  </Typography>
                  <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography color="textSecondary">Chart placeholder - Revenue trends over time</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Orders</TableCell>
                  <TableCell align="right">Revenue</TableCell>
                  <TableCell align="right">Rating</TableCell>
                  <TableCell align="center">Performance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {analytics.topProducts.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {product.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">{product.orders}</TableCell>
                    <TableCell align="right">{formatPrice(product.revenue)}</TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <StarIcon sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
                        {product.rating}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <LinearProgress
                        variant="determinate"
                        value={(product.orders / analytics.topProducts[0].orders) * 100}
                        sx={{ width: 100, mx: 'auto' }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {analytics.recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {order.id}
                      </Typography>
                    </TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell align="right">{formatPrice(order.amount)}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{formatDate(new Date(order.date))}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="View Details">
                        <IconButton size="small">
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Customer Breakdown
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="primary">
                        {analytics.customerInsights.newCustomers}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        New Customers
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="success.main">
                        {analytics.customerInsights.returningCustomers}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Returning Customers
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <StarIcon sx={{ color: 'warning.main', mr: 1 }} />
                    <Typography variant="h6">
                      {analytics.customerInsights.averageRating}/5 Average Rating
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Top Categories
                  </Typography>
                  {analytics.customerInsights.topCategories.map((category, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">{category.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {category.percentage}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={category.percentage}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

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