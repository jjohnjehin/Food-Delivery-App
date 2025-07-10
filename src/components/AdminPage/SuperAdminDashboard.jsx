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
  Tabs,
  Tab,
  Badge,
  Avatar,
  Tooltip,
  Alert,
  Snackbar
} from '@mui/material';
import {
  People as PeopleIcon,
  Business as BusinessIcon,
  Store as StoreIcon,
  Analytics as AnalyticsIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

export const SuperAdminDashboard = () => {
  const { user, token } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBusinesses: 0,
    pendingApprovals: 0,
    activeUsers: 0
  });

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (result.success) {
        setUsers(result.data.users);
        setBusinesses(result.data.users.filter(u => u.role === 'business'));
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      showSnackbar('Failed to fetch users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (result.success) {
        const allUsers = result.data.users;
        setStats({
          totalUsers: allUsers.length,
          totalBusinesses: allUsers.filter(u => u.role === 'business').length,
          pendingApprovals: allUsers.filter(u => u.role === 'business' && !u.businessDetails?.isApproved).length,
          activeUsers: allUsers.filter(u => u.isActive).length
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleApproveBusiness = async (userId, isApproved) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/business/${userId}/approve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isApproved })
      });
      const result = await response.json();
      if (result.success) {
        showSnackbar(`Business ${isApproved ? 'approved' : 'rejected'} successfully`, 'success');
        fetchUsers();
        fetchStats();
      } else {
        showSnackbar(result.message || 'Operation failed', 'error');
      }
    } catch (error) {
      console.error('Error approving business:', error);
      showSnackbar('Failed to update business status', 'error');
    }
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: newRole })
      });
      const result = await response.json();
      if (result.success) {
        showSnackbar('User role updated successfully', 'success');
        fetchUsers();
        fetchStats();
      } else {
        showSnackbar(result.message || 'Failed to update role', 'error');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      showSnackbar('Failed to update user role', 'error');
    }
  };

  const handleUpdateUserStatus = async (userId, isActive) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive })
      });
      const result = await response.json();
      if (result.success) {
        showSnackbar(`User ${isActive ? 'activated' : 'deactivated'} successfully`, 'success');
        fetchUsers();
        fetchStats();
      } else {
        showSnackbar(result.message || 'Failed to update status', 'error');
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      showSnackbar('Failed to update user status', 'error');
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'superadmin': return 'error';
      case 'business': return 'warning';
      case 'user': return 'primary';
      default: return 'default';
    }
  };

  const getStatusColor = (isActive) => {
    return isActive ? 'success' : 'error';
  };

  return (
    <Box sx={{ p: 3, mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Super Admin Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Welcome back, {user?.firstName || user?.username}! Manage your platform from here.
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Users
                  </Typography>
                  <Typography variant="h4">{stats.totalUsers}</Typography>
                </Box>
                <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />
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
                    Business Partners
                  </Typography>
                  <Typography variant="h4">{stats.totalBusinesses}</Typography>
                </Box>
                <BusinessIcon sx={{ fontSize: 40, color: 'warning.main' }} />
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
                    Pending Approvals
                  </Typography>
                  <Typography variant="h4">{stats.pendingApprovals}</Typography>
                </Box>
                <Badge badgeContent={stats.pendingApprovals} color="error">
                  <StoreIcon sx={{ fontSize: 40, color: 'error.main' }} />
                </Badge>
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
                    Active Users
                  </Typography>
                  <Typography variant="h4">{stats.activeUsers}</Typography>
                </Box>
                <AnalyticsIcon sx={{ fontSize: 40, color: 'success.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ width: '100%' }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="All Users" />
          <Tab label="Business Partners" />
          <Tab label="Pending Approvals" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Joined</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {user.firstName ? user.firstName.charAt(0).toUpperCase() : user.username.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="bold">
                            {user.firstName} {user.lastName}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            @{user.username}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.role} 
                        color={getRoleColor(user.role)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={user.isActive ? 'Active' : 'Inactive'} 
                        color={getStatusColor(user.isActive)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="View Details">
                          <IconButton size="small">
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Role">
                          <IconButton 
                            size="small"
                            onClick={() => {
                              setSelectedUser(user);
                              setDialogType('role');
                              setDialogOpen(true);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={user.isActive ? 'Deactivate' : 'Activate'}>
                          <IconButton 
                            size="small"
                            onClick={() => handleUpdateUserStatus(user._id, !user.isActive)}
                          >
                            {user.isActive ? <CancelIcon /> : <CheckCircleIcon />}
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Business</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Approval Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {businesses.map((business) => (
                  <TableRow key={business._id}>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {business.businessDetails?.businessName || 'N/A'}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {business.businessDetails?.businessType || 'N/A'}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {business.firstName} {business.lastName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{business.businessDetails?.businessPhone || 'N/A'}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {business.businessDetails?.businessEmail || 'N/A'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={business.businessDetails?.isApproved ? 'Approved' : 'Pending'} 
                        color={business.businessDetails?.isApproved ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {!business.businessDetails?.isApproved ? (
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            startIcon={<CheckCircleIcon />}
                            onClick={() => handleApproveBusiness(business._id, true)}
                          >
                            Approve
                          </Button>
                        ) : (
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            startIcon={<CancelIcon />}
                            onClick={() => handleApproveBusiness(business._id, false)}
                          >
                            Reject
                          </Button>
                        )}
                      </Box>
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
                  <TableCell>Business</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Documents</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {businesses.filter(b => !b.businessDetails?.isApproved).map((business) => (
                  <TableRow key={business._id}>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {business.businessDetails?.businessName || 'N/A'}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {business.businessDetails?.businessType || 'N/A'}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {business.firstName} {business.lastName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{business.businessDetails?.businessPhone || 'N/A'}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {business.businessDetails?.businessEmail || 'N/A'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="caption" display="block">
                          GST: {business.businessDetails?.gstNumber || 'N/A'}
                        </Typography>
                        <Typography variant="caption" display="block">
                          FSSAI: {business.businessDetails?.fssaiNumber || 'N/A'}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          startIcon={<CheckCircleIcon />}
                          onClick={() => handleApproveBusiness(business._id, true)}
                        >
                          Approve
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          startIcon={<CancelIcon />}
                          onClick={() => handleApproveBusiness(business._id, false)}
                        >
                          Reject
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>

      {/* Role Update Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Update User Role</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Update role for {selectedUser?.firstName} {selectedUser?.lastName}
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={selectedUser?.role || ''}
              label="Role"
              onChange={(e) => {
                if (selectedUser) {
                  handleUpdateUserRole(selectedUser._id, e.target.value);
                  setDialogOpen(false);
                }
              }}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="superadmin">Super Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}; 