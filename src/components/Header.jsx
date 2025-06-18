import { Box, Grid, Button, Typography, TextField, IconButton,Tooltip,Avatar } from "@mui/material"
import { useState, useRef ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import DiscountIcon from '@mui/icons-material/Discount';
import ListIcon from '@mui/icons-material/List';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import { Popper, Paper, List, ListItem, ListItemText } from '@mui/material';

export const Header = ({ cartLength, favLength,user,message }) => {
  console.log("message;",message)
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate=useNavigate()
  const navigateCart = useNavigate();
  const navigateHome = useNavigate();
  const navigateMenu = useNavigate(); // for individual menu item navigate

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const checkPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 8) return "Strong";
    return "Medium";
  };

  const handleSignup = () => {
    let isValid = true;
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    const strength = checkPasswordStrength(password);
    if (strength === "Weak") {
      setPasswordError("Password is too weak. Use at least 6 characters.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      console.log("Signup Successful");
      setOpenSignUp(false);
    }
  };

  const menuRef = useRef(null);

  const handleClick = () => {
    setAnchorEl(anchorEl ? null : menuRef.current);
  };

  const open = Boolean(anchorEl);

  const dishes = [
    "Pizza", "Burger", "Pasta", "Fries", "Shavarma",
    "Ice Cream", "Juice", "Noodles", "Salad", "Dosa"
  ];
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Whenever message changes, check if it's success
  useEffect(() => {
    if (message === "success") {
      setIsLoggedIn(true);
    }
  }, [message]);

  return (
    <Box>
      <Box>
        <Box sx={{
          width: "100%", height: "100px", position: "fixed", top: 0, left: 0,
          zIndex: 999, backgroundColor: "white", display: "flex", alignItems: "center",
          justifyContent: "space-around", bgcolor: '#e36414'
        }}>
          <Typography variant="h3" sx={{
            fontWeight: "700", color: "beige",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" }
          }}>𝕱𝖗𝖊𝖘𝖍 𝕱𝖊𝖆𝖘𝖙</Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            <Grid sx={{ width: "100px", height: "50px", display: "flex", alignItems: "center" }}>
              <Typography sx={{ color: "white", cursor: 'pointer' }} onClick={() => navigateHome('/')}>Home</Typography>
              <Grid sx={{ width: "30px", height: "40px", display: "flex", marginTop: "5px" }}>
                <HomeIcon sx={{ fontSize: "30px", color: "white" }} />
              </Grid>
            </Grid>

            <Box ref={menuRef} onClick={handleClick} sx={{
              width: "100px", height: "50px", display: "flex",
              alignItems: "center", cursor: "pointer", position: "relative"
            }}>
              <Typography sx={{ color: "white" }}>Menu</Typography>
              <ListIcon sx={{ fontSize: "33px", color: "white" }} />
            </Box>

            <Popper
              open={open}
              anchorEl={anchorEl}
              placement="bottom-start"
              modifiers={[{ name: 'offset', options: { offset: [0, 10] } }]}
              sx={{ zIndex: 1200 }}
            >
              <Paper sx={{ p: 1, boxShadow: 4, borderRadius: 2 }}>
                <List dense>
                  {dishes.map((dish, index) => (
                    <ListItem
                    key={index}
                    button
                    onClick={() => {
                      navigateMenu('/MenuItemDetails', { state: { category: dish } });
                      console.log(dish); 
                      setAnchorEl(null); 
                    }}
                  >
                  
                      <ListItemText primary={dish} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Popper>

            <Grid sx={{ width: "100px", height: "50px", display: "flex", alignItems: "center" }}>
              <Typography sx={{ color: "white", cursor: 'pointer' }} onClick={() => navigateHome('/Offers')}>Offers</Typography>
              <Grid sx={{ width: "30px", height: "40px", display: "flex", marginTop: "7px" }}>
                <DiscountIcon sx={{ fontSize: "25px", color: "white" }} />
              </Grid>
            </Grid>

            <Grid sx={{ width: "150px", height: "50px", display: "flex", alignItems: "center" }}>
              <Typography sx={{ color: "white", cursor: 'pointer' }} onClick={() => navigateHome('/ContactUS')}>Contact Us</Typography>
            </Grid>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, color: 'white' }}>
            <Tooltip title="Search">
              <SearchIcon sx={{ fontSize: "25px", cursor: "pointer" }} onClick={() => setOpenSearch(true)} />
              <Drawer anchor="right" open={openSearch} onClose={() => setOpenSearch(false)}>
                <Box sx={{ width: { xs: 250, sm: 300 }, p: 3 }}>
                  <Typography variant="h6" gutterBottom>Search</Typography>
                  <TextField
                    variant="outlined"
                    placeholder="Search for Restaurent,Dish or Cuisine"
                    fullWidth
                    autoFocus
                  />
                </Box>
              </Drawer>
            </Tooltip>

            <Tooltip title="Cart">
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <ShoppingCartIcon onClick={() => navigateCart('/Cart')} sx={{ fontSize: "25px", color: 'white' }} />
                <Box sx={{
                  width: "18px", height: "18px", bgcolor: "red", borderRadius: "50%",
                  border: '1px solid white', position: "absolute", top: "-10px", right: "-6px",
                  display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: "12px"
                }}>
                  <Typography variant="caption" color="white">{cartLength}</Typography>
                </Box>
              </Box>
            </Tooltip>

            <Tooltip title="Favourites">
                  <Box sx={{ position: 'relative', display: 'inline-block' }}>
                    <FavoriteIcon
                      onClick={() => navigateCart('/Favourite')}
                      sx={{ fontSize: "25px", color: 'white', cursor: 'pointer' }}
                    />
                    <Box
                      sx={{
                        width: "18px",
                        height: "18px",
                        bgcolor: "red",
                        borderRadius: "50%",
                        border: '1px solid white',
                        position: "absolute",
                        top: "-10px",
                        right: "-8px",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: "12px"
                      }}
                    >
                      <Typography variant="caption" color="white">
                        {favLength}
                      </Typography>
                    </Box>
                  </Box>
            </Tooltip>

            <>
      {message === "success" && user ? (
        <Tooltip title={`Welcome ${user.username}`}>
          <IconButton onClick={() => navigate("/account")}>
            <Avatar sx={{ bgcolor: "#4caf50", fontSize: "14px", width: 30, height: 30 }}>
              {user.username.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Login">
          <IconButton onClick={() => navigate("/auth")}>
            {/* Person Icon here */}
            <PersonIcon sx={{ fontSize: 30, color: "white" }} onClick={()=>navigate('/Account')} />
          </IconButton>
        </Tooltip>
      )}
    </>

            <IconButton sx={{ display: { xs: "block", md: "none" } }} onClick={() => setOpenNav(true)}>
              <MenuIcon sx={{ fontSize: "30px" }} />
            </IconButton>
          </Box>
        </Box>

        <Drawer anchor="right" open={openNav} onClose={() => setOpenNav(false)}>
          <Box sx={{ width: { xs: 180, sm: 200 }, p: 2 }}>
            <Typography sx={{ mb: 2 }} onClick={() => navigateHome('/')}>Home</Typography>
            <Typography sx={{ mb: 2 }} onClick={() => navigateHome('/Menu')}>Menu</Typography>
            <Typography sx={{ mb: 2 }} onClick={() => navigateHome('/Offers')}>Offers</Typography>
            <Typography sx={{ mb: 2 }} onClick={() => navigateHome('/ContactUs')}>Contact Us</Typography>
          </Box>
        </Drawer>

        <Drawer anchor="right" open={openLogin} onClose={() => setOpenLogin(false)}>
          <Box sx={{ width: { xs: 200, sm: 250, md: 300 }, p: 3 }}>
            <Typography variant="h5" gutterBottom>Login</Typography>
            <TextField label="Email" variant="outlined" fullWidth margin="normal" />
            <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" />
            <Grid sx={{ width: "100%", height: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Typography sx={{ fontSize: { xs: "12px", sm: "14px", md: "15px" } }}>Don't have an account?</Typography>
              <Typography sx={{ color: "blue", fontSize: { xs: "10px", sm: "14px", md: "15px" }, cursor: "pointer" }} onClick={() => {
                setOpenLogin(false);
                setOpenSignUp(true);
              }}>Create account</Typography>
            </Grid>
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Login</Button>
          </Box>
        </Drawer>

        <Drawer anchor="right" open={openSignUp} onClose={() => setOpenSignUp(false)}>
          <Box sx={{ width: { xs: 200, sm: 250, md: 300 }, p: 3 }}>
            <Typography variant="h5" gutterBottom>Sign Up</Typography>
            <TextField label="Email" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} error={!!emailError} helperText={emailError} />
            <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} error={!!passwordError} helperText={passwordError} />
            <Grid sx={{ width: "100%", height: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Typography sx={{ fontSize: { xs: "12px", sm: "14px", md: "15px" } }}>Already have an account?</Typography>
              <Typography sx={{ color: "blue", fontSize: { xs: "10px", sm: "14px", md: "15px" }, cursor: "pointer", ml: 1 }} onClick={() => {
                setOpenSignUp(false);
                setOpenLogin(true);
              }}>Login</Typography>
            </Grid>
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSignup}>Sign Up</Button>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
};
