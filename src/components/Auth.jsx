// Auth.jsx
import React, { useState, useEffect } from "react";
import { 
  Snackbar, 
  Alert, 
  TextField, 
  Button, 
  Drawer, 
  Box, 
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Chip
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { useForm } from '../context/FormContext';

export const Auth = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const { 
    updateFormData, 
    validateField, 
    validateForm, 
    setFormSubmitting,
    getFormState,
    isFormValid,
    isFormSubmitting,
    getFieldError,
    isFieldTouched,
    resetForm,
    setFormErrors,
    getFormErrors
  } = useForm();

  // Form states
  const [isLogin, setIsLogin] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState('user');

  // UI states
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Get form states
  const loginForm = getFormState('login');
  const signupForm = getFormState('signup');
  const businessForm = getFormState('businessApplication');

  const showMessage = (msg, severity = "success") => {
    setSnackbarMsg(msg);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Handle form field changes
  const handleLoginChange = (field, value) => {
    updateFormData('login', field, value);
    // Validate field on change
    if (field === 'username') {
      validateField('login', field, value, 'username');
    } else if (field === 'password') {
      validateField('login', field, value, 'password');
    }
  };

  const handleSignupChange = (field, value) => {
    updateFormData('signup', field, value);
    // Validate field on change
    if (field === 'email') {
      validateField('signup', field, value, 'email');
    } else if (field === 'phone') {
      validateField('signup', field, value, 'phone');
    } else if (field === 'password') {
      validateField('signup', field, value, 'password');
    } else if (field === 'confirmPassword') {
      validateField('signup', field, value, 'confirmPassword', signupForm.data.password);
    } else if (field === 'username') {
      validateField('signup', field, value, 'username');
    } else if (field === 'firstName' || field === 'lastName') {
      validateField('signup', field, value, 'required', field);
    }
  };

  const handleBusinessChange = (field, value) => {
    updateFormData('businessApplication', field, value);
    // Validate business fields
    if (field === 'businessEmail') {
      validateField('businessApplication', field, value, 'email');
    } else if (field === 'businessPhone') {
      validateField('businessApplication', field, value, 'phone');
    } else if (field === 'gstNumber') {
      // Only validate GST if a value is provided
      if (value) {
        validateField('businessApplication', field, value, 'gstNumber');
      } else {
        // Clear error if field is empty (optional field)
        setFormErrors('businessApplication', { ...getFormErrors('businessApplication'), [field]: null });
      }
    } else if (field === 'fssaiNumber') {
      // Only validate FSSAI if a value is provided
      if (value) {
        validateField('businessApplication', field, value, 'fssaiNumber');
      } else {
        // Clear error if field is empty (optional field)
        setFormErrors('businessApplication', { ...getFormErrors('businessApplication'), [field]: null });
      }
    } else {
      validateField('businessApplication', field, value, 'required', field);
    }
  };

  // Login handler
  const handleLogin = async () => {
    const loginValidationSchema = {
      username: { rule: 'username' },
      password: { rule: 'password' }
    };

    const isValid = validateForm('login', loginValidationSchema);
    
    if (!isValid) {
      showMessage("Please fix the errors in the form", "error");
      return;
    }

    setFormSubmitting('login', true);
    try {
      const result = await login(loginForm.data.username, loginForm.data.password);
      
      if (result.success) {
        showMessage("Login successful ✅", "success");
        resetForm('login');
        setTimeout(() => navigate("/"), 1500);
      } else {
        showMessage(result.message || "Login failed", "error");
      }
    } catch (error) {
      showMessage("Login failed. Try again later.", "error");
    } finally {
      setFormSubmitting('login', false);
    }
  };

  // Signup handler
  const handleSignup = async () => {
    const signupValidationSchema = {
      username: { rule: 'username' },
      email: { rule: 'email' },
      phone: { rule: 'phone' },
      password: { rule: 'password' },
      confirmPassword: { rule: 'confirmPassword', additionalData: signupForm.data.password },
      firstName: { rule: 'required', additionalData: 'First Name' },
      lastName: { rule: 'required', additionalData: 'Last Name' }
    };

    const isValid = validateForm('signup', signupValidationSchema);
    
    if (!isValid) {
      showMessage("Please fix the errors in the form", "error");
      return;
    }

    setFormSubmitting('signup', true);
    try {
      // Create signup payload without confirmPassword
      const { confirmPassword, ...signupData } = signupForm.data;
      const signupPayload = {
        ...signupData,
        role: selectedRole
      };

              // Add business details if role is business
        if (selectedRole === 'business') {
          // Only validate business fields if we're on the business step
          if (activeStep === 2) {
            const businessValidationSchema = {
              businessName: { rule: 'required', additionalData: 'Business Name' },
              businessType: { rule: 'required', additionalData: 'Business Type' },
              businessAddress: { rule: 'required', additionalData: 'Business Address' },
              businessPhone: { rule: 'phone' },
              businessEmail: { rule: 'email' }
            };

            const isBusinessValid = validateForm('businessApplication', businessValidationSchema);
            if (!isBusinessValid) {
              showMessage("Please fix the business information errors", "error");
              return;
            }
            signupPayload.businessDetails = businessForm.data;
          } else {
            // If business role is selected but not on business step, just proceed without business details
            signupPayload.businessDetails = {};
          }
        }

      console.log("Sending signup payload:", signupPayload);
      const result = await signup(signupPayload);

      if (result.success) {
        showMessage("Signup successful ✅", "success");
        resetForm('signup');
        resetForm('businessApplication');
        setTimeout(() => navigate("/"), 1500);
      } else {
        showMessage(result.message || "Signup failed", "error");
      }
    } catch (error) {
      showMessage("Signup failed. Try again later.", "error");
    } finally {
      setFormSubmitting('signup', false);
    }
  };

  // Handle role selection
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    updateFormData('signup', 'role', event.target.value);
  };

  // Handle next step in signup process
  const handleNext = () => {
    if (activeStep === 0) {
      // Validate basic info
      const signupValidationSchema = {
        username: { rule: 'username' },
        email: { rule: 'email' },
        phone: { rule: 'phone' },
        password: { rule: 'password' },
        confirmPassword: { rule: 'confirmPassword', additionalData: signupForm.data.password },
        firstName: { rule: 'required', additionalData: 'First Name' },
        lastName: { rule: 'required', additionalData: 'Last Name' }
      };

      const isValid = validateForm('signup', signupValidationSchema);
      if (!isValid) {
        showMessage("Please fix the errors in the form", "error");
        return;
      }
    } else if (activeStep === 1) {
      // On role selection step, just check if a role is selected
      if (!selectedRole) {
        showMessage("Please select a role", "error");
        return;
      }
      
      // Only validate business fields if business role is selected AND we're moving to business step
      if (selectedRole === 'business') {
        // Don't validate business fields yet - just move to next step
        // Business validation will happen on the business step itself
      }
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const steps = ['Basic Information', 'Role Selection', 'Business Details'];

  // Reset forms when switching between login and signup
  useEffect(() => {
    if (isLogin) {
      resetForm('signup');
      resetForm('businessApplication');
      setActiveStep(0);
    } else {
      resetForm('login');
    }
  }, [isLogin, resetForm]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 3,
        bgcolor: "#f5f5f5"
      }}
    >
      {/* LOGIN FORM */}
      {isLogin ? (
        <Card sx={{ width: 400, p: 4, boxShadow: 3 }}>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Login
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Username or Email"
              value={loginForm.data.username}
              onChange={(e) => handleLoginChange('username', e.target.value)}
              fullWidth
              variant="outlined"
              error={isFieldTouched('login', 'username') && !!getFieldError('login', 'username')}
              helperText={isFieldTouched('login', 'username') && getFieldError('login', 'username')}
            />
            <TextField
              label="Password"
              type="password"
              value={loginForm.data.password}
              onChange={(e) => handleLoginChange('password', e.target.value)}
              fullWidth
              variant="outlined"
              error={isFieldTouched('login', 'password') && !!getFieldError('login', 'password')}
              helperText={isFieldTouched('login', 'password') && getFieldError('login', 'password')}
            />
            <Button 
              variant="contained" 
              onClick={handleLogin}
              disabled={isFormSubmitting('login')}
              sx={{ mt: 2 }}
            >
              {isFormSubmitting('login') ? "Logging in..." : "Login"}
            </Button>

            <Button 
              variant="text" 
              onClick={() => setIsLogin(false)} 
              sx={{ textTransform: "none" }}
            >
              Don't have an account? Sign up
            </Button>
          </Box>
        </Card>
      ) : (
        /* SIGNUP FORM */
        <Card sx={{ width: 600, p: 4, boxShadow: 3 }}>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Sign Up
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="First Name"
                    value={signupForm.data.firstName}
                    onChange={(e) => handleSignupChange('firstName', e.target.value)}
                    fullWidth
                    variant="outlined"
                    error={isFieldTouched('signup', 'firstName') && !!getFieldError('signup', 'firstName')}
                    helperText={isFieldTouched('signup', 'firstName') && getFieldError('signup', 'firstName')}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Last Name"
                    value={signupForm.data.lastName}
                    onChange={(e) => handleSignupChange('lastName', e.target.value)}
                    fullWidth
                    variant="outlined"
                    error={isFieldTouched('signup', 'lastName') && !!getFieldError('signup', 'lastName')}
                    helperText={isFieldTouched('signup', 'lastName') && getFieldError('signup', 'lastName')}
                  />
                </Grid>
              </Grid>
              <TextField
                label="Username"
                value={signupForm.data.username}
                onChange={(e) => handleSignupChange('username', e.target.value)}
                fullWidth
                variant="outlined"
                error={isFieldTouched('signup', 'username') && !!getFieldError('signup', 'username')}
                helperText={isFieldTouched('signup', 'username') && getFieldError('signup', 'username')}
              />
              <TextField
                label="Email"
                type="email"
                value={signupForm.data.email}
                onChange={(e) => handleSignupChange('email', e.target.value)}
                fullWidth
                variant="outlined"
                error={isFieldTouched('signup', 'email') && !!getFieldError('signup', 'email')}
                helperText={isFieldTouched('signup', 'email') && getFieldError('signup', 'email')}
              />
              <TextField
                label="Phone"
                value={signupForm.data.phone}
                onChange={(e) => handleSignupChange('phone', e.target.value)}
                fullWidth
                variant="outlined"
                error={isFieldTouched('signup', 'phone') && !!getFieldError('signup', 'phone')}
                helperText={isFieldTouched('signup', 'phone') && getFieldError('signup', 'phone')}
              />
              <TextField
                label="Password"
                type="password"
                value={signupForm.data.password}
                onChange={(e) => handleSignupChange('password', e.target.value)}
                fullWidth
                variant="outlined"
                error={isFieldTouched('signup', 'password') && !!getFieldError('signup', 'password')}
                helperText={isFieldTouched('signup', 'password') && getFieldError('signup', 'password')}
              />
              <TextField
                label="Confirm Password"
                type="password"
                value={signupForm.data.confirmPassword}
                onChange={(e) => handleSignupChange('confirmPassword', e.target.value)}
                fullWidth
                variant="outlined"
                error={isFieldTouched('signup', 'confirmPassword') && !!getFieldError('signup', 'confirmPassword')}
                helperText={isFieldTouched('signup', 'confirmPassword') && getFieldError('signup', 'confirmPassword')}
              />
            </Box>
          )}

          {activeStep === 1 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Typography variant="h6" gutterBottom>
                Select Your Role
              </Typography>
              
              <FormControl component="fieldset">
                <FormLabel component="legend">Account Type</FormLabel>
                <RadioGroup value={selectedRole} onChange={handleRoleChange}>
                  <FormControlLabel 
                    value="user" 
                    control={<Radio />} 
                    label={
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">Customer</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Order food, track deliveries, manage favorites
                        </Typography>
                      </Box>
                    } 
                  />
                  <FormControlLabel 
                    value="business" 
                    control={<Radio />} 
                    label={
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">Business Partner</Typography>
                        <Typography variant="body2" color="text.secondary">
                          List your restaurant, manage orders, grow your business
                        </Typography>
                      </Box>
                    } 
                  />
                </RadioGroup>
              </FormControl>

              {selectedRole === 'business' && (
                <Card sx={{ p: 2, bgcolor: '#f0f8ff' }}>
                  <Typography variant="body2" color="primary">
                    💡 Business accounts require approval from our team. 
                    You'll be able to start listing your restaurant once approved.
                  </Typography>
                </Card>
              )}
            </Box>
          )}

          {activeStep === 2 && selectedRole === 'business' && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h6" gutterBottom>
                Business Information
              </Typography>
              
              <TextField
                label="Business Name"
                value={businessForm.data.businessName}
                onChange={(e) => handleBusinessChange('businessName', e.target.value)}
                fullWidth
                variant="outlined"
                error={isFieldTouched('businessApplication', 'businessName') && !!getFieldError('businessApplication', 'businessName')}
                helperText={isFieldTouched('businessApplication', 'businessName') && getFieldError('businessApplication', 'businessName')}
              />
              <TextField
                label="Business Type"
                value={businessForm.data.businessType}
                onChange={(e) => handleBusinessChange('businessType', e.target.value)}
                fullWidth
                variant="outlined"
                error={isFieldTouched('businessApplication', 'businessType') && !!getFieldError('businessApplication', 'businessType')}
                helperText={isFieldTouched('businessApplication', 'businessType') && getFieldError('businessApplication', 'businessType')}
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="GST Number (Optional)"
                    value={businessForm.data.gstNumber}
                    onChange={(e) => handleBusinessChange('gstNumber', e.target.value)}
                    fullWidth
                    variant="outlined"
                    error={isFieldTouched('businessApplication', 'gstNumber') && !!getFieldError('businessApplication', 'gstNumber')}
                    helperText={
                      isFieldTouched('businessApplication', 'gstNumber') && getFieldError('businessApplication', 'gstNumber')
                        ? getFieldError('businessApplication', 'gstNumber')
                        : "Optional - Enter your GST number if available"
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="FSSAI Number (Optional)"
                    value={businessForm.data.fssaiNumber}
                    onChange={(e) => handleBusinessChange('fssaiNumber', e.target.value)}
                    fullWidth
                    variant="outlined"
                    error={isFieldTouched('businessApplication', 'fssaiNumber') && !!getFieldError('businessApplication', 'fssaiNumber')}
                    helperText={
                      isFieldTouched('businessApplication', 'fssaiNumber') && getFieldError('businessApplication', 'fssaiNumber')
                        ? getFieldError('businessApplication', 'fssaiNumber')
                        : "Optional - Enter your FSSAI license number if available"
                    }
                  />
                </Grid>
              </Grid>
              <TextField
                label="Business Address"
                value={businessForm.data.businessAddress}
                onChange={(e) => handleBusinessChange('businessAddress', e.target.value)}
                fullWidth
                variant="outlined"
                multiline
                rows={3}
                error={isFieldTouched('businessApplication', 'businessAddress') && !!getFieldError('businessApplication', 'businessAddress')}
                helperText={isFieldTouched('businessApplication', 'businessAddress') && getFieldError('businessApplication', 'businessAddress')}
              />
              <TextField
                label="Business Phone"
                value={businessForm.data.businessPhone}
                onChange={(e) => handleBusinessChange('businessPhone', e.target.value)}
                fullWidth
                variant="outlined"
                error={isFieldTouched('businessApplication', 'businessPhone') && !!getFieldError('businessApplication', 'businessPhone')}
                helperText={isFieldTouched('businessApplication', 'businessPhone') && getFieldError('businessApplication', 'businessPhone')}
              />
              <TextField
                label="Business Email"
                type="email"
                value={businessForm.data.businessEmail}
                onChange={(e) => handleBusinessChange('businessEmail', e.target.value)}
                fullWidth
                variant="outlined"
                error={isFieldTouched('businessApplication', 'businessEmail') && !!getFieldError('businessApplication', 'businessEmail')}
                helperText={isFieldTouched('businessApplication', 'businessEmail') && getFieldError('businessApplication', 'businessEmail')}
              />
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Box>
              {activeStep === steps.length - 1 ? (
                <Button 
                  variant="contained" 
                  onClick={handleSignup}
                  disabled={isFormSubmitting('signup')}
                >
                  {isFormSubmitting('signup') ? "Creating Account..." : "Sign Up"}
                </Button>
              ) : (
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              )}
            </Box>
          </Box>

          <Button 
            variant="text" 
            onClick={() => setIsLogin(true)} 
            sx={{ textTransform: "none", mt: 2 }}
          >
            Already have an account? Login
          </Button>
        </Card>
      )}

      {/* Snackbar for popup messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

// export default Auth;
