import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  Snackbar,
  Tabs,
  Tab,
  Badge,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Timeline as TimelineIcon,
  Email as EmailIcon,
  Notifications as NotificationsIcon,
  TrendingUp as TrendingUpIcon,
  Person as PersonIcon,
  ShoppingCart as ShoppingCartIcon,
  Star as StarIcon,
  ExpandMore as ExpandMoreIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
  Campaign as CampaignIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useCoupon, useWorkflowAutomation } from '../context/CouponContext';
import { useWorkflow } from '../context/WorkflowContext';

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`workflow-tabpanel-${index}`}
    aria-labelledby={`workflow-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

export const WorkflowTracker = () => {
  const { user, token } = useAuth();
  const { formatDate } = useWorkflow();
  const { workflowRules, userEngagement } = useCoupon();
  const { triggerPurchaseFollowUp, triggerReEngagement, processLoyaltyRewards } = useWorkflowAutomation();

  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [workflowDialogOpen, setWorkflowDialogOpen] = useState(false);

  // Mock workflow data
  const [workflows, setWorkflows] = useState({
    purchaseFollowUp: {
      active: true,
      totalTriggers: 156,
      successfulFollowUps: 89,
      conversionRate: 57.1,
      lastTriggered: '2023-12-07T10:30:00Z',
      nextScheduled: '2023-12-08T09:00:00Z',
      users: [
        { id: 1, name: 'John Doe', email: 'john@example.com', lastPurchase: '2023-12-05', status: 'pending', followUpCount: 1 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', lastPurchase: '2023-12-04', status: 'sent', followUpCount: 2 },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', lastPurchase: '2023-12-03', status: 'converted', followUpCount: 1 }
      ]
    },
    reEngagement: {
      active: true,
      totalTriggers: 89,
      successfulReEngagements: 34,
      conversionRate: 38.2,
      lastTriggered: '2023-12-06T14:20:00Z',
      nextScheduled: '2023-12-09T10:00:00Z',
      users: [
        { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', inactiveDays: 12, status: 'pending', attempts: 1 },
        { id: 5, name: 'David Brown', email: 'david@example.com', inactiveDays: 8, status: 'sent', attempts: 2 },
        { id: 6, name: 'Lisa Davis', email: 'lisa@example.com', inactiveDays: 15, status: 'converted', attempts: 1 }
      ]
    },
    loyaltyRewards: {
      active: true,
      totalRewards: 45,
      successfulRewards: 42,
      conversionRate: 93.3,
      lastTriggered: '2023-12-07T16:45:00Z',
      nextScheduled: '2023-12-08T12:00:00Z',
      users: [
        { id: 7, name: 'Tom Wilson', email: 'tom@example.com', points: 150, status: 'eligible', rewardType: 'discount' },
        { id: 8, name: 'Emma Taylor', email: 'emma@example.com', points: 200, status: 'claimed', rewardType: 'free_item' },
        { id: 9, name: 'Alex Johnson', email: 'alex@example.com', points: 120, status: 'pending', rewardType: 'upgrade' }
      ]
    }
  });

  const getWorkflowStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'sent': return 'info';
      case 'converted': return 'success';
      case 'failed': return 'error';
      case 'eligible': return 'primary';
      case 'claimed': return 'success';
      default: return 'default';
    }
  };

  const getWorkflowIcon = (workflowType) => {
    switch (workflowType) {
      case 'purchaseFollowUp': return <ShoppingCartIcon />;
      case 'reEngagement': return <PersonIcon />;
      case 'loyaltyRewards': return <StarIcon />;
      default: return <TimelineIcon />;
    }
  };

  const handleWorkflowAction = async (workflowType, action, userId = null) => {
    setLoading(true);
    try {
      switch (action) {
        case 'trigger':
          if (workflowType === 'purchaseFollowUp') {
            await triggerPurchaseFollowUp(userId, { orderAmount: 500, items: ['Pizza', 'Wings'] });
          } else if (workflowType === 'reEngagement') {
            await triggerReEngagement(userId, { inactiveDays: 10 });
          } else if (workflowType === 'loyaltyRewards') {
            await processLoyaltyRewards(userId, { points: 150 });
          }
          showSnackbar(`${workflowType} workflow triggered successfully`, 'success');
          break;
        case 'pause':
          setWorkflows(prev => ({
            ...prev,
            [workflowType]: { ...prev[workflowType], active: false }
          }));
          showSnackbar(`${workflowType} workflow paused`, 'info');
          break;
        case 'resume':
          setWorkflows(prev => ({
            ...prev,
            [workflowType]: { ...prev[workflowType], active: true }
          }));
          showSnackbar(`${workflowType} workflow resumed`, 'success');
          break;
        default:
          break;
      }
    } catch (error) {
      showSnackbar(`Failed to ${action} workflow`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleViewWorkflowDetails = (workflowType) => {
    setSelectedWorkflow({ type: workflowType, data: workflows[workflowType] });
    setWorkflowDialogOpen(true);
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
            Workflow Automation Tracker
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor and manage automated user engagement workflows
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={() => window.location.reload()}
        >
          Refresh
        </Button>
      </Box>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Workflow Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Object.entries(workflows).map(([workflowType, data]) => (
          <Grid item xs={12} md={4} key={workflowType}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {getWorkflowIcon(workflowType)}
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {workflowType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </Typography>
                  </Box>
                  <Chip
                    label={data.active ? 'Active' : 'Paused'}
                    color={data.active ? 'success' : 'warning'}
                    size="small"
                  />
                </Box>
                
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">
                      Total Triggers
                    </Typography>
                    <Typography variant="h6">{data.totalTriggers}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">
                      Conversion Rate
                    </Typography>
                    <Typography variant="h6">{data.conversionRate}%</Typography>
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    Last Triggered
                  </Typography>
                  <Typography variant="body2">
                    {formatDate(new Date(data.lastTriggered))}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleViewWorkflowDetails(workflowType)}
                  >
                    View Details
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleWorkflowAction(workflowType, data.active ? 'pause' : 'resume')}
                  >
                    {data.active ? 'Pause' : 'Resume'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tabs */}
      <Paper sx={{ width: '100%' }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Active Workflows" />
          <Tab label="User Engagement" />
          <Tab label="Performance Analytics" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {Object.entries(workflows).map(([workflowType, data]) => (
              <Grid item xs={12} key={workflowType}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      {getWorkflowIcon(workflowType)}
                      <Typography variant="h6" sx={{ ml: 1 }}>
                        {workflowType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </Typography>
                      <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Chip
                          label={data.active ? 'Active' : 'Paused'}
                          color={data.active ? 'success' : 'warning'}
                          size="small"
                        />
                        <Typography variant="body2" color="textSecondary">
                          {data.users.length} users in queue
                        </Typography>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Last Activity</TableCell>
                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data.users.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>
                                <Typography variant="body2" fontWeight="bold">
                                  {user.name}
                                </Typography>
                              </TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                <Chip
                                  label={user.status}
                                  color={getWorkflowStatusColor(user.status)}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>
                                {workflowType === 'purchaseFollowUp' && user.lastPurchase && (
                                  <Typography variant="body2">
                                    {formatDate(new Date(user.lastPurchase))}
                                  </Typography>
                                )}
                                {workflowType === 'reEngagement' && (
                                  <Typography variant="body2">
                                    {user.inactiveDays} days inactive
                                  </Typography>
                                )}
                                {workflowType === 'loyaltyRewards' && (
                                  <Typography variant="body2">
                                    {user.points} points
                                  </Typography>
                                )}
                              </TableCell>
                              <TableCell>
                                <Tooltip title="Trigger Workflow">
                                  <IconButton
                                    size="small"
                                    onClick={() => handleWorkflowAction(workflowType, 'trigger', user.id)}
                                  >
                                    <PlayIcon />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    User Engagement Timeline
                  </Typography>
                  <List>
                    {Object.entries(workflows).flatMap(([workflowType, data]) =>
                      data.users.slice(0, 3).map((user) => (
                        <React.Fragment key={`${workflowType}-${user.id}`}>
                          <ListItem>
                            <ListItemIcon>
                              {getWorkflowIcon(workflowType)}
                            </ListItemIcon>
                            <ListItemText
                              primary={user.name}
                              secondary={`${workflowType} - ${user.status}`}
                            />
                            <Chip
                              label={user.status}
                              color={getWorkflowStatusColor(user.status)}
                              size="small"
                            />
                          </ListItem>
                          <Divider />
                        </React.Fragment>
                      ))
                    )}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Engagement Metrics
                  </Typography>
                  <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography color="textSecondary">Chart placeholder - Engagement metrics</Typography>
                  </Box>
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
                    Workflow Performance
                  </Typography>
                  <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography color="textSecondary">Chart placeholder - Workflow performance</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Conversion Analytics
                  </Typography>
                  <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography color="textSecondary">Chart placeholder - Conversion analytics</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      {/* Workflow Details Dialog */}
      <Dialog open={workflowDialogOpen} onClose={() => setWorkflowDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedWorkflow && `${selectedWorkflow.type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} Details`}
        </DialogTitle>
        <DialogContent>
          {selectedWorkflow && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Workflow Statistics
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Total Triggers
                  </Typography>
                  <Typography variant="h4">{selectedWorkflow.data.totalTriggers}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Conversion Rate
                  </Typography>
                  <Typography variant="h4">{selectedWorkflow.data.conversionRate}%</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Successful Actions
                  </Typography>
                  <Typography variant="h4">
                    {selectedWorkflow.data.successfulFollowUps || selectedWorkflow.data.successfulReEngagements || selectedWorkflow.data.successfulRewards}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Status
                  </Typography>
                  <Chip
                    label={selectedWorkflow.data.active ? 'Active' : 'Paused'}
                    color={selectedWorkflow.data.active ? 'success' : 'warning'}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Last Activity</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedWorkflow.data.users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">
                            {user.name}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {user.email}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={user.status}
                            color={getWorkflowStatusColor(user.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {formatDate(new Date(selectedWorkflow.data.lastTriggered))}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleWorkflowAction(selectedWorkflow.type, 'trigger', user.id)}
                          >
                            Trigger
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWorkflowDialogOpen(false)}>Close</Button>
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