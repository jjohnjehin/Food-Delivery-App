import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';

// Protected route that requires authentication
export const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (!user) {
    // Redirect to login page with return url
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If specific roles are required, check if user has any of them
  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.includes(user.role);
    if (!hasRequiredRole) {
      // Redirect to unauthorized page or home
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

// Route for users only
export const UserRoute = ({ children }) => {
  return <ProtectedRoute requiredRoles={['user']}>{children}</ProtectedRoute>;
};

// Route for business users only (approved or not)
export const BusinessRoute = ({ children }) => {
  return <ProtectedRoute requiredRoles={['business', 'superadmin']}>{children}</ProtectedRoute>;
};

// Route for approved business users only
export const ApprovedBusinessRoute = ({ children }) => {
  const { user, isBusinessApproved } = useAuth();
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (user.role === 'superadmin') {
    return children;
  }

  if (user.role === 'business' && isBusinessApproved()) {
    return children;
  }

  // Show pending approval message for business users
  if (user.role === 'business' && !isBusinessApproved()) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        p={3}
      >
        <Typography variant="h4" gutterBottom>
          Account Pending Approval
        </Typography>
        <Typography variant="body1" textAlign="center" sx={{ maxWidth: 600 }}>
          Your business account is currently under review. You'll be able to access 
          business features once your account is approved by our team.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          This usually takes 1-2 business days.
        </Typography>
      </Box>
    );
  }

  return <Navigate to="/unauthorized" replace />;
};

// Route for superadmin only
export const SuperAdminRoute = ({ children }) => {
  return <ProtectedRoute requiredRoles={['superadmin']}>{children}</ProtectedRoute>;
};

// Route for admin access (business and superadmin)
export const AdminRoute = ({ children }) => {
  return <ProtectedRoute requiredRoles={['business', 'superadmin']}>{children}</ProtectedRoute>;
};

// Route for authenticated users (any role)
export const AuthenticatedRoute = ({ children }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

// Route for unauthenticated users only (login/signup pages)
export const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (user) {
    // Redirect to the page they were trying to access or home
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return children;
}; 