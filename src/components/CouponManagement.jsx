import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar,
  Tabs,
  Tab,
  Badge,
  Tooltip,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  TrendingUp as TrendingUpIcon,
  Settings as SettingsIcon,
  ExpandMore as ExpandMoreIcon,
  Campaign as CampaignIcon,
  Timeline as WorkflowIcon,
  Analytics as AnalyticsIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useCoupon, useCouponManagement, useWorkflowAutomation, useCouponAnalytics } from '../context/CouponContext';
import { useWorkflow } from '../context/WorkflowContext';

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`coupon-tabpanel-${index}`}
    aria-labelledby={`coupon-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

export const CouponManagement = () => {
  const { user, token } = useAuth();
  const { 
    coupons, 
    workflowRules, 
    setCoupons, 
    addCoupon, 
    updateCoupon, 
    deleteCoupon,
    setWorkflowRules,
    validateCoupon,
    formatPrice,
    formatDate
  } = useCoupon();
  
  const { createCoupon, updateCoupon: updateCouponAPI, deleteCoupon: deleteCouponAPI, fetchCoupons } = useCouponManagement();
  const { triggerPurchaseFollowUp, triggerReEngagement, processLoyaltyRewards } = useWorkflowAutomation();
  const { fetchCouponAnalytics, fetchUserEngagementMetrics } = useCouponAnalytics();

  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('create');
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [analytics, setAnalytics] = useState({
    totalCoupons: 0,
    activeCoupons: 0,
    totalUsage: 0,
    conversionRate: 0,
    revenueImpact: 0
  });

  // Form state
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    discountType: 'percentage',
    discountValue: '',
    minOrderAmount: '',
    maxDiscount: '',
    usageLimit: '',
    validFrom: '',
    validTo: '',
    isActive: true,
    targetAudience: 'all',
    conditions: []
  });

  useEffect(() => {
    fetchCouponsData();
    fetchAnalyticsData();
  }, []);

  const fetchCouponsData = async () => {
    setLoading(true);
    try {
      const couponsData = await fetchCoupons();
      setCoupons(couponsData);
    } catch (error) {
      showSnackbar('Failed to fetch coupons', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalyticsData = async () => {
    try {
      const analyticsData = await fetchCouponAnalytics();
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const handleCreateCoupon = () => {
    setDialogType('create');
    setSelectedCoupon(null);
    setFormData({
      code: '',
      name: '',
      description: '',
      discountType: 'percentage',
      discountValue: '',
      minOrderAmount: '',
      maxDiscount: '',
      usageLimit: '',
      validFrom: '',
      validTo: '',
      isActive: true,
      targetAudience: 'all',
      conditions: []
    });
    setDialogOpen(true);
  };

  const handleEditCoupon = (coupon) => {
    setDialogType('edit');
    setSelectedCoupon(coupon);
    setFormData({
      code: coupon.code,
      name: coupon.name,
      description: coupon.description,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minOrderAmount: coupon.minOrderAmount,
      maxDiscount: coupon.maxDiscount,
      usageLimit: coupon.usageLimit,
      validFrom: coupon.validFrom,
      validTo: coupon.validTo,
      isActive: coupon.isActive,
      targetAudience: coupon.targetAudience,
      conditions: coupon.conditions || []
    });
    setDialogOpen(true);
  };

  const handleDeleteCoupon = async (couponId) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        await deleteCouponAPI(couponId);
        deleteCoupon(couponId);
        showSnackbar('Coupon deleted successfully', 'success');
      } catch (error) {
        showSnackbar('Failed to delete coupon', 'error');
      }
    }
  };

  const handleSubmit = async () => {
    const errors = validateCoupon(formData);
    if (errors.length > 0) {
      showSnackbar(errors.join(', '), 'error');
      return;
    }

    try {
      if (dialogType === 'create') {
        const newCoupon = await createCoupon(formData);
        addCoupon(newCoupon);
        showSnackbar('Coupon created successfully', 'success');
      } else {
        const updatedCoupon = await updateCouponAPI(selectedCoupon.id, formData);
        updateCoupon(updatedCoupon);
        showSnackbar('Coupon updated successfully', 'success');
      }
      setDialogOpen(false);
    } catch (error) {
      showSnackbar('Failed to save coupon', 'error');
    }
  };

  const handleWorkflowRuleChange = (section, key, value) => {
    setWorkflowRules({
      [section]: {
        ...workflowRules[section],
        [key]: value
      }
    });
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const getStatusColor = (isActive, validFrom, validTo) => {
    const now = new Date();
    const fromDate = new Date(validFrom);
    const toDate = new Date(validTo);
    
    if (!isActive) return 'error';
    if (now < fromDate) return 'warning';
    if (now > toDate) return 'error';
    return 'success';
  };

  const getStatusText = (isActive, validFrom, validTo) => {
    const now = new Date();
    const fromDate = new Date(validFrom);
    const toDate = new Date(validTo);
    
    if (!isActive) return 'Inactive';
    if (now < fromDate) return 'Scheduled';
    if (now > toDate) return 'Expired';
    return 'Active';
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
            Coupon Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create and manage promotional coupons and automated workflows
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateCoupon}
        >
          Create Coupon
        </Button>
      </Box>

      {/* Analytics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Coupons
                  </Typography>
                  <Typography variant="h4">{analytics.totalCoupons}</Typography>
                </Box>
                <CampaignIcon sx={{ fontSize: 40, color: 'primary.main' }} />
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
                    Active Coupons
                  </Typography>
                  <Typography variant="h4">{analytics.activeCoupons}</Typography>
                </Box>
                <TrendingUpIcon sx={{ fontSize: 40, color: 'success.main' }} />
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
                    Total Usage
                  </Typography>
                  <Typography variant="h4">{analytics.totalUsage}</Typography>
                </Box>
                <AnalyticsIcon sx={{ fontSize: 40, color: 'warning.main' }} />
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
                    Conversion Rate
                  </Typography>
                  <Typography variant="h4">{analytics.conversionRate}%</Typography>
                </Box>
                <WorkflowIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ width: '100%' }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Coupons" />
          <Tab label="Workflow Automation" />
          <Tab label="Analytics" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          {loading && <LinearProgress sx={{ mb: 2 }} />}
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Discount</TableCell>
                  <TableCell>Valid Period</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Usage</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {coupon.code}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{coupon.name}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {coupon.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {coupon.discountType === 'percentage' 
                          ? `${coupon.discountValue}%` 
                          : formatPrice(coupon.discountValue)
                        }
                      </Typography>
                      {coupon.minOrderAmount && (
                        <Typography variant="caption" color="textSecondary">
                          Min: {formatPrice(coupon.minOrderAmount)}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(new Date(coupon.validFrom))}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        to {formatDate(new Date(coupon.validTo))}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusText(coupon.isActive, coupon.validFrom, coupon.validTo)}
                        color={getStatusColor(coupon.isActive, coupon.validFrom, coupon.validTo)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {coupon.usageCount || 0}/{coupon.usageLimit || '∞'}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="View Details">
                        <IconButton size="small">
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Coupon">
                        <IconButton size="small" onClick={() => handleEditCoupon(coupon)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Coupon">
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleDeleteCoupon(coupon.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Purchase Follow-up Workflow
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={workflowRules.purchaseFollowUp.enabled}
                        onChange={(e) => handleWorkflowRuleChange('purchaseFollowUp', 'enabled', e.target.checked)}
                      />
                    }
                    label="Enable Purchase Follow-up"
                  />
                  <TextField
                    fullWidth
                    label="Delay (days)"
                    type="number"
                    value={workflowRules.purchaseFollowUp.delay}
                    onChange={(e) => handleWorkflowRuleChange('purchaseFollowUp', 'delay', parseInt(e.target.value))}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Max Follow-ups"
                    type="number"
                    value={workflowRules.purchaseFollowUp.maxFollowUps}
                    onChange={(e) => handleWorkflowRuleChange('purchaseFollowUp', 'maxFollowUps', parseInt(e.target.value))}
                    sx={{ mt: 2 }}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Re-engagement Workflow
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={workflowRules.reEngagement.enabled}
                        onChange={(e) => handleWorkflowRuleChange('reEngagement', 'enabled', e.target.checked)}
                      />
                    }
                    label="Enable Re-engagement"
                  />
                  <TextField
                    fullWidth
                    label="Inactive Days Threshold"
                    type="number"
                    value={workflowRules.reEngagement.inactiveDays}
                    onChange={(e) => handleWorkflowRuleChange('reEngagement', 'inactiveDays', parseInt(e.target.value))}
                    sx={{ mt: 2 }}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Loyalty Rewards Workflow
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={workflowRules.loyaltyRewards.enabled}
                        onChange={(e) => handleWorkflowRuleChange('loyaltyRewards', 'enabled', e.target.checked)}
                      />
                    }
                    label="Enable Loyalty Rewards"
                  />
                  <TextField
                    fullWidth
                    label="Points Threshold"
                    type="number"
                    value={workflowRules.loyaltyRewards.pointsThreshold}
                    onChange={(e) => handleWorkflowRuleChange('loyaltyRewards', 'pointsThreshold', parseInt(e.target.value))}
                    sx={{ mt: 2 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Coupon Performance
                  </Typography>
                  <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography color="textSecondary">Chart placeholder - Coupon performance metrics</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    User Engagement
                  </Typography>
                  <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography color="textSecondary">Chart placeholder - User engagement metrics</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      {/* Create/Edit Coupon Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {dialogType === 'create' ? 'Create New Coupon' : 'Edit Coupon'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Coupon Code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Coupon Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Discount Type</InputLabel>
                <Select
                  value={formData.discountType}
                  label="Discount Type"
                  onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                >
                  <MenuItem value="percentage">Percentage</MenuItem>
                  <MenuItem value="fixed">Fixed Amount</MenuItem>
                  <MenuItem value="free_delivery">Free Delivery</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Discount Value"
                type="number"
                value={formData.discountValue}
                onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Minimum Order Amount"
                type="number"
                value={formData.minOrderAmount}
                onChange={(e) => setFormData({ ...formData, minOrderAmount: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Usage Limit"
                type="number"
                value={formData.usageLimit}
                onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Valid From"
                type="datetime-local"
                value={formData.validFrom}
                onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Valid To"
                type="datetime-local"
                value={formData.validTo}
                onChange={(e) => setFormData({ ...formData, validTo: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                }
                label="Active"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {dialogType === 'create' ? 'Create' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>

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