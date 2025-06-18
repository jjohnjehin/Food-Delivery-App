// Auth.jsx
import React, { useState } from "react";
import { Snackbar, Alert, TextField, Button, Drawer, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Auth = ({ onAuthResult }) => {
  const navigate = useNavigate();

  // Login states
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  // Signup states
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Snackbar states for popup messages
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const showMessage = (msg, severity = "success") => {
    setSnackbarMsg(msg);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Login handler
  const handleLogin = async () => {
    const { username, password } = loginData;

    if (!username || !password) {
      showMessage("Please enter username and password", "error");
      onAuthResult("failure", null);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/users?username=${username}&password=${password}`
      );
      const user = await response.json();

      if (user.length > 0) {
        showMessage("Login successful ✅", "success");
        onAuthResult("success", user[0]);
        setTimeout(() => navigate("/account"), 1500); // Delay for UX to see message
      } else {
        showMessage("Invalid username or password ❌", "error");
        onAuthResult("failure", null);
      }
    } catch (error) {
      showMessage("Login failed. Try again later.", "error");
      onAuthResult("failure", null);
    }
  };

  // Signup handler
  const handleSignup = async () => {
    const { username, email, phone, password } = signupData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^.{6,}$/;

    if (!username || !email || !phone || !password) {
      showMessage("All fields are required.", "error");
      onAuthResult("failure", null);
      return;
    }

    if (!emailRegex.test(email)) {
      showMessage("Please enter a valid email.", "error");
      onAuthResult("failure", null);
      return;
    }

    if (!phoneRegex.test(phone)) {
      showMessage("Phone must be 10 digits.", "error");
      onAuthResult("failure", null);
      return;
    }

    if (!passwordRegex.test(password)) {
      showMessage("Password must be at least 6 characters.", "error");
      onAuthResult("failure", null);
      return;
    }

    try {
      const checkResponse = await fetch(
        `http://localhost:3001/users?username=${username}`
      );
      const existingUsers = await checkResponse.json();

      if (existingUsers.length > 0) {
        showMessage("Username already exists.", "error");
        onAuthResult("failure", null);
        return;
      }

      const newUser = { username, email, phone, password };
      const addUserResponse = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (addUserResponse.ok) {
        showMessage("Signup successful ✅", "success");
        setDrawerOpen(false);
        onAuthResult("success", newUser);
        setTimeout(() => navigate("/account"), 1500);
      } else {
        showMessage("Failed to sign up.", "error");
        onAuthResult("failure", null);
      }
    } catch (error) {
      showMessage("Error during signup. Try again later.", "error");
      onAuthResult("failure", null);
    }
  };

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
      }}
    >
      {/* LOGIN FORM */}
      <Box sx={{ width: 300, display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h5" textAlign="center">
          Login
        </Typography>
        <TextField
          label="Username"
          value={loginData.username}
          onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          fullWidth
        />
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>

        <Button variant="text" onClick={() => setDrawerOpen(true)} sx={{ textTransform: "none" }}>
          Don't have an account? Sign up
        </Button>
      </Box>

      {/* SIGNUP DRAWER */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: { xs: "100%", sm: 400 } } }}
      >
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h6">Sign Up</Typography>

          <TextField
            label="Username"
            value={signupData.username}
            onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
            fullWidth
          />
          <TextField
            label="Email"
            value={signupData.email}
            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
            fullWidth
          />
          <TextField
            label="Phone"
            value={signupData.phone}
            onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={signupData.password}
            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
            fullWidth
          />

          <Button variant="contained" onClick={handleSignup}>
            Sign Up
          </Button>
        </Box>
      </Drawer>

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
