import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Badge,
  Drawer,
  TextField,
  Button,
  Grid,
  Avatar,
  Tooltip,
  Popper,
  Paper,
  ClickAwayListener,
  InputAdornment,
  Modal,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import CakeIcon from "@mui/icons-material/Cake";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import HelpIcon from "@mui/icons-material/Help";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import InventoryIcon from "@mui/icons-material/Inventory";
import CampaignIcon from "@mui/icons-material/Campaign";
import TimelineIcon from "@mui/icons-material/Timeline";
import { useAuth } from '../context/AuthContext';

export const Header = ({ cartLength, favLength, setFilteredItems }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [openNav, setOpenNav] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  const menuRef = useRef(null);
  const searchRef = useRef(null);

  const isSearchOpen = Boolean(searchAnchorEl);

  const handleSearchClick = (event) => {
    setSearchAnchorEl(event.currentTarget);
  };

  const handleSearchClose = () => {
    setSearchAnchorEl(null);
    setSearchSubmitted(false);
    setSearchValue("");
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      setSearchSubmitted(true);
      setSearchAnchorEl(null);
      // Navigate to search results page
      navigate('/search', { state: { query: searchValue.trim() } });
    }
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setSearchSubmitted(false);
    if (setFilteredItems) {
      setFilteredItems("");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleMenuClick = () => {
    setMenuModalOpen(true);
  };

  const handleMenuClose = () => {
    setMenuModalOpen(false);
  };

  const handleMenuCategoryClick = (category) => {
    setMenuModalOpen(false);
    // Navigate to search results with the selected category
    navigate('/search', { state: { query: category } });
  };

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleProfileMenuClick = (action) => {
    setProfileAnchorEl(null);
    switch (action) {
      case 'profile':
        navigate('/Account');
        break;
      case 'orders':
        navigate('/Orders');
        break;
      case 'settings':
        navigate('/Settings');
        break;
      case 'help':
        navigate('/Help');
        break;
      case 'dashboard':
        navigate('/admin');
        break;
      case 'analytics':
        navigate('/analytics');
        break;
      case 'product_list':
        navigate('/product_list');
        break;
      case 'coupon_management':
        navigate('/coupon_management');
        break;
      case 'workflow_tracker':
        navigate('/workflow_tracker');
        break;
      case 'ai_search':
        navigate('/ai_search');
        break;
      case 'user_management':
        navigate('/user_management');
        break;
      case 'restaurant_management':
        navigate('/restaurant_management');
        break;
      case 'delivery_management':
        navigate('/delivery_management');
        break;
      case 'system_settings':
        navigate('/system_settings');
        break;
      default:
        break;
    }
  };

  // Click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenNav(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100px",
        bgcolor: "black",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        px: 2,
        position: "fixed",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography
          variant="h3"
          sx={{
            color: "beige",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          𝕱𝖗𝖊𝖘𝖍 𝕱𝖊𝖆𝖘𝖙
        </Typography>
      </Box>

      <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
        <Typography
          sx={{ color: "white", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Home
        </Typography>
        <Typography
          sx={{ color: "white", cursor: "pointer" }}
          onClick={handleMenuClick}
        >
          Menu
        </Typography>
        <Typography
          sx={{ color: "white", cursor: "pointer" }}
          onClick={() => navigate("/Offers")}
        >
          Offers
        </Typography>
        <Typography
          sx={{ color: "white", cursor: "pointer" }}
          onClick={() => navigate("/ContactUS")}
        >
          Contact Us
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {/* Search Icon/Input */}
        <Tooltip title="Search">
          <IconButton
            onClick={handleSearchClick}
            sx={{ color: "white" }}
            ref={searchRef}
          >
            {searchSubmitted ? (
              <SearchIcon sx={{ fontSize: 24 }} />
            ) : (
              <SearchIcon sx={{ fontSize: 24 }} />
            )}
          </IconButton>
        </Tooltip>

        <Popper
          open={isSearchOpen}
          anchorEl={searchAnchorEl}
          placement="bottom-start"
          sx={{ zIndex: 1500 }}
        >
          <ClickAwayListener onClickAway={handleSearchClose}>
            <Paper
              sx={{
                p: 2,
                mt: 1,
                minWidth: 300,
                boxShadow: 3,
              }}
            >
              <form onSubmit={handleSearchSubmit}>
                <TextField
                  autoFocus
                  fullWidth
                  placeholder="Search for food..."
                  value={searchValue}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton type="submit" size="small">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
            </Paper>
          </ClickAwayListener>
        </Popper>

        {/* Cart */}
        <Tooltip title="Cart">
          <IconButton
            onClick={() => navigate("/Cart")}
            sx={{ color: "white" }}
          >
            <Badge badgeContent={cartLength} color="error">
              <ShoppingCartIcon sx={{ fontSize: 30 }} />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Favorites */}
        <Tooltip title="Favorites">
          <IconButton
            onClick={() => navigate("/Favourite")}
            sx={{ color: "white" }}
          >
            <Badge badgeContent={favLength} color="error">
              <FavoriteIcon sx={{ fontSize: 30 }} />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* User Account */}
        {user ? (
          <Tooltip title={`Welcome ${user.firstName || user.username}`}>
            <IconButton onClick={handleProfileClick}>
              <Avatar sx={{ bgcolor: "#4caf50", fontSize: "14px", width: 30, height: 30 }}>
                {user.firstName ? user.firstName.charAt(0).toUpperCase() : user.username.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Login">
            <IconButton onClick={() => navigate("/auth")}>
              <PersonIcon sx={{ fontSize: 30, color: "white" }} />
            </IconButton>
          </Tooltip>
        )}

        {/* Profile Dropdown Menu */}
        <Menu
          anchorEl={profileAnchorEl}
          open={Boolean(profileAnchorEl)}
          onClose={handleProfileClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              boxShadow: 3,
              '& .MuiMenuItem-root': {
                py: 1.5,
                px: 2,
              },
            },
          }}
        >
          <MenuItem onClick={() => handleProfileMenuClick('profile')}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </MenuItem>
          <MenuItem onClick={() => handleProfileMenuClick('orders')}>
            <ListItemIcon>
              <ShoppingBagIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="My Orders" />
          </MenuItem>
          <MenuItem onClick={() => handleProfileMenuClick('settings')}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </MenuItem>
          
          {/* Business-specific menu items */}
          {user && user.role === 'business' && (
            <>
              <Divider />
              <MenuItem onClick={() => handleProfileMenuClick('dashboard')}>
                <ListItemIcon>
                  <DashboardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </MenuItem>
              <MenuItem onClick={() => handleProfileMenuClick('product_list')}>
                <ListItemIcon>
                  <InventoryIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Product List" />
              </MenuItem>
              <MenuItem onClick={() => handleProfileMenuClick('analytics')}>
                <ListItemIcon>
                  <AnalyticsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Analytics" />
              </MenuItem>
              <MenuItem onClick={() => handleProfileMenuClick('coupon_management')}>
                <ListItemIcon>
                  <CampaignIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Coupon Management" />
              </MenuItem>
              <MenuItem onClick={() => handleProfileMenuClick('workflow_tracker')}>
                <ListItemIcon>
                  <TimelineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Workflow Tracker" />
              </MenuItem>
            </>
          )}

          {/* Superadmin-specific menu items */}
          {user && user.role === 'superadmin' && (
            <>
              <Divider />
              <MenuItem onClick={() => handleProfileMenuClick('dashboard')}>
                <ListItemIcon>
                  <DashboardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Super Admin Dashboard" />
              </MenuItem>
              <MenuItem onClick={() => handleProfileMenuClick('product_list')}>
                <ListItemIcon>
                  <InventoryIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Product Management" />
              </MenuItem>
              <MenuItem onClick={() => handleProfileMenuClick('analytics')}>
                <ListItemIcon>
                  <AnalyticsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Analytics & Reports" />
              </MenuItem>
              <MenuItem onClick={() => handleProfileMenuClick('coupon_management')}>
                <ListItemIcon>
                  <CampaignIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Coupon Management" />
              </MenuItem>
              <MenuItem onClick={() => handleProfileMenuClick('workflow_tracker')}>
                <ListItemIcon>
                  <TimelineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Workflow Tracker" />
              </MenuItem>
              <MenuItem onClick={() => handleProfileMenuClick('ai_search')}>
                <ListItemIcon>
                  <SearchIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="AI Search Management" />
              </MenuItem>
              <MenuItem onClick={() => handleProfileMenuClick('user_management')}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="User Management" />
              </MenuItem>
              <MenuItem onClick={() => handleProfileMenuClick('restaurant_management')}>
                <ListItemIcon>
                  <RestaurantIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Restaurant Management" />
              </MenuItem>
              <MenuItem onClick={() => handleProfileMenuClick('delivery_management')}>
                <ListItemIcon>
                  <ShoppingBagIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Delivery Management" />
              </MenuItem>
              <MenuItem onClick={() => handleProfileMenuClick('system_settings')}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="System Settings" />
              </MenuItem>
            </>
          )}
          
          <Divider />
          <MenuItem onClick={() => handleProfileMenuClick('help')}>
            <ListItemIcon>
              <HelpIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Help" />
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemText primary="Logout" sx={{ color: 'error.main' }} />
          </MenuItem>
        </Menu>

        {/* Mobile Menu */}
        <IconButton 
          sx={{ display: { xs: "block", md: "none" }, color: "white" }} 
          onClick={() => setOpenNav(true)}
        >
          <MenuIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      </Box>

      {/* Mobile Navigation Drawer */}
      <Drawer anchor="right" open={openNav} onClose={() => setOpenNav(false)}>
        <Box sx={{ width: { xs: 180, sm: 200 }, p: 2 }}>
          <Typography sx={{ mb: 2 }} onClick={() => navigate('/')}>Home</Typography>
          <Typography sx={{ mb: 2 }} onClick={handleMenuClick}>Menu</Typography>
          <Typography sx={{ mb: 2 }} onClick={() => navigate('/Offers')}>Offers</Typography>
          <Typography sx={{ mb: 2 }} onClick={() => navigate('/ContactUS')}>Contact Us</Typography>
          <Typography sx={{ mb: 2 }} onClick={() => navigate('/help')}>Help</Typography>
          {user && (
            <>
              <Typography sx={{ mb: 2 }} onClick={() => navigate('/Account')}>Account</Typography>
              {user.role === 'business' && (
                <>
                  <Typography sx={{ mb: 2 }} onClick={() => navigate('/admin')}>Dashboard</Typography>
                  <Typography sx={{ mb: 2 }} onClick={() => navigate('/product_list')}>Product List</Typography>
                  <Typography sx={{ mb: 2 }} onClick={() => navigate('/analytics')}>Analytics</Typography>
                  <Typography sx={{ mb: 2 }} onClick={() => navigate('/coupon_management')}>Coupon Management</Typography>
                  <Typography sx={{ mb: 2 }} onClick={() => navigate('/workflow_tracker')}>Workflow Tracker</Typography>
                </>
              )}
              {user.role === 'superadmin' && (
                <>
                  <Typography sx={{ mb: 2 }} onClick={() => navigate('/admin')}>Super Admin Dashboard</Typography>
                  <Typography sx={{ mb: 2 }} onClick={() => navigate('/product_list')}>Product Management</Typography>
                  <Typography sx={{ mb: 2 }} onClick={() => navigate('/analytics')}>Analytics & Reports</Typography>
                  <Typography sx={{ mb: 2 }} onClick={() => navigate('/coupon_management')}>Coupon Management</Typography>
                  <Typography sx={{ mb: 2 }} onClick={() => navigate('/workflow_tracker')}>Workflow Tracker</Typography>
                  <Typography sx={{ mb: 2 }} onClick={() => navigate('/ai_search')}>AI Search Management</Typography>
                  <Typography sx={{ mb: 2 }} onClick={() => navigate('/user_management')}>User Management</Typography>
                  <Typography sx={{ mb: 2 }} onClick={() => navigate('/restaurant_management')}>Restaurant Management</Typography>
                  <Typography sx={{ mb: 2 }} onClick={() => navigate('/delivery_management')}>Delivery Management</Typography>
                  <Typography sx={{ mb: 2 }} onClick={() => navigate('/system_settings')}>System Settings</Typography>
                </>
              )}
              <Typography sx={{ mb: 2 }} onClick={handleLogout}>Logout</Typography>
            </>
          )}
        </Box>
      </Drawer>

      {/* Menu Modal */}
      <Modal
        open={menuModalOpen}
        onClose={handleMenuClose}
        aria-labelledby="menu-modal-title"
        aria-describedby="menu-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 0,
            maxHeight: '80vh',
            overflow: 'auto',
          }}
        >
          <Box
            sx={{
              bgcolor: '#FF8C00',
              color: 'white',
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          >
            <Typography variant="h6" component="h2">
              Menu Categories
            </Typography>
            <IconButton
              onClick={handleMenuClose}
              sx={{ color: 'white' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          
          <List sx={{ p: 0 }}>
            <ListItem 
              button 
              onClick={() => handleMenuCategoryClick('Pizza')}
              sx={{ '&:hover': { bgcolor: '#fff3e0' } }}
            >
              <ListItemIcon>
                <LocalPizzaIcon sx={{ color: '#FF8C00' }} />
              </ListItemIcon>
              <ListItemText primary="Pizza" />
            </ListItem>
            
            <Divider />
            
            <ListItem 
              button 
              onClick={() => handleMenuCategoryClick('Burger')}
              sx={{ '&:hover': { bgcolor: '#fff3e0' } }}
            >
              <ListItemIcon>
                <RestaurantIcon sx={{ color: '#FF8C00' }} />
              </ListItemIcon>
              <ListItemText primary="Burger" />
            </ListItem>
            
            <Divider />
            
            <ListItem 
              button 
              onClick={() => handleMenuCategoryClick('Pasta')}
              sx={{ '&:hover': { bgcolor: '#fff3e0' } }}
            >
              <ListItemIcon>
                <LocalDiningIcon sx={{ color: '#FF8C00' }} />
              </ListItemIcon>
              <ListItemText primary="Pasta" />
            </ListItem>
            
            <Divider />
            
            <ListItem 
              button 
              onClick={() => handleMenuCategoryClick('Noodles')}
              sx={{ '&:hover': { bgcolor: '#fff3e0' } }}
            >
              <ListItemIcon>
                <LocalDiningIcon sx={{ color: '#FF8C00' }} />
              </ListItemIcon>
              <ListItemText primary="Noodles" />
            </ListItem>
            
            <Divider />
            
            <ListItem 
              button 
              onClick={() => handleMenuCategoryClick('Dessert')}
              sx={{ '&:hover': { bgcolor: '#fff3e0' } }}
            >
              <ListItemIcon>
                <CakeIcon sx={{ color: '#FF8C00' }} />
              </ListItemIcon>
              <ListItemText primary="Dessert" />
            </ListItem>
            
            <Divider />
            
            <ListItem 
              button 
              onClick={() => handleMenuCategoryClick('Beverages')}
              sx={{ '&:hover': { bgcolor: '#fff3e0' } }}
            >
              <ListItemIcon>
                <LocalCafeIcon sx={{ color: '#FF8C00' }} />
              </ListItemIcon>
              <ListItemText primary="Beverages" />
            </ListItem>
            
            <Divider />
            
            <ListItem 
              button 
              onClick={() => handleMenuCategoryClick('All')}
              sx={{ '&:hover': { bgcolor: '#fff3e0' } }}
            >
              <ListItemIcon>
                <RestaurantIcon sx={{ color: '#FF8C00' }} />
              </ListItemIcon>
              <ListItemText primary="View All Categories" />
            </ListItem>
          </List>
        </Box>
      </Modal>
    </Box>
  );
};
