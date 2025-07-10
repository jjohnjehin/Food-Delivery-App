import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Fab,
  Tooltip,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useWorkflow } from "../context/WorkflowContext";

export const ProductList = () => {
  const { getAllCategories, getTagsByCategory, validateProductData, formatPrice } = useWorkflow();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "table"
  
  // Dialog states
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [dialogMode, setDialogMode] = useState("add"); // "add" or "edit"
  
  // Form states
  const [formData, setFormData] = useState({
    dish_name: "",
    restaurant_name: "",
    category: "",
    price: "",
    rating: "",
    image: "",
    description: "",
    slogan: "",
  });

  // Snackbar states
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const categories = getAllCategories().map(cat => cat.name);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const result = await response.json();
      
      const products = Array.isArray(result) && Array.isArray(result[0]?.products)
        ? result[0].products
        : [];

      setProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      showSnackbar("Failed to fetch products", "error");
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleOpenDialog = (mode, product = null) => {
    setDialogMode(mode);
    setEditingProduct(product);
    if (mode === "edit" && product) {
      setFormData({
        dish_name: product.dish_name || "",
        restaurant_name: product.restaurant_name || "",
        category: product.category || "",
        price: product.price || "",
        rating: product.rating || "",
        image: product.image || "",
        description: product.description || "",
        slogan: product.slogan || "",
      });
    } else {
      setFormData({
        dish_name: "",
        restaurant_name: "",
        category: "",
        price: "",
        rating: "",
        image: "",
        description: "",
        slogan: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
    setFormData({
      dish_name: "",
      restaurant_name: "",
      category: "",
      price: "",
      rating: "",
      image: "",
      description: "",
      slogan: "",
    });
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    // Validate product data using workflow
    const validationErrors = validateProductData(formData);
    if (validationErrors.length > 0) {
      showSnackbar(`Validation errors: ${validationErrors.join(', ')}`, "error");
      return;
    }

    try {
      const url = dialogMode === "add" 
        ? "http://localhost:5000/api/products"
        : `http://localhost:5000/api/products/${editingProduct.id}`;
      
      const method = dialogMode === "add" ? "POST" : "PUT";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save product");
      }

      showSnackbar(
        dialogMode === "add" 
          ? "Product added successfully!" 
          : "Product updated successfully!"
      );
      
      handleCloseDialog();
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error("Error saving product:", error);
      showSnackbar("Failed to save product", "error");
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      showSnackbar("Product deleted successfully!");
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error("Error deleting product:", error);
      showSnackbar("Failed to delete product", "error");
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.dish_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.restaurant_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const renderGridView = () => (
    <Grid container spacing={3}>
      {filteredProducts.map((product) => (
        <Grid item key={product.id} sx={{ width: 300 }}>
          <Card sx={{ height: "100%", position: "relative", width: 300 }}>
            <CardMedia
              component="img"
              height="200"
              image={product.image}
              alt={product.dish_name}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {product.dish_name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {product.restaurant_name}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Chip label={product.category} size="small" color="primary" />
                              <Typography variant="h6" color="green" fontWeight="bold">
                {formatPrice(product.price)}
              </Typography>
              </Box>
              <Typography variant="body2" gutterBottom>
                ⭐ {product.rating}
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                <Tooltip title="View Details">
                  <IconButton size="small" color="primary">
                    <ViewIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit Product">
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={() => handleOpenDialog("edit", product)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Product">
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => handleDelete(product.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderTableView = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Dish Name</TableCell>
            <TableCell>Restaurant</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <img 
                  src={product.image} 
                  alt={product.dish_name}
                  style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }}
                />
              </TableCell>
              <TableCell>{product.dish_name}</TableCell>
              <TableCell>{product.restaurant_name}</TableCell>
              <TableCell>
                <Chip label={product.category} size="small" />
              </TableCell>
              <TableCell>{formatPrice(product.price)}</TableCell>
              <TableCell>⭐ {product.rating}</TableCell>
              <TableCell>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Tooltip title="View Details">
                    <IconButton size="small" color="primary">
                      <ViewIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Product">
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => handleOpenDialog("edit", product)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Product">
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleDelete(product.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box>
      <Header />
      
      <Box sx={{ mt: "100px", px: 2, minHeight: "100vh" }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Typography variant="h4" fontWeight="bold">
            Product Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog("add")}
            sx={{ bgcolor: "#FF8C00" }}
          >
            Add Product
          </Button>
        </Box>

        {/* Filters and Search */}
        <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
          <TextField
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300 }}
          />
          
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              label="Category"
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant={viewMode === "grid" ? "contained" : "outlined"}
              onClick={() => setViewMode("grid")}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === "table" ? "contained" : "outlined"}
              onClick={() => setViewMode("table")}
            >
              Table
            </Button>
          </Box>
        </Box>

        {/* Products Display */}
        {loading ? (
                  <Typography variant="h6" textAlign="center" color="orange">
          Loading products...
        </Typography>
        ) : filteredProducts.length > 0 ? (
          viewMode === "grid" ? renderGridView() : renderTableView()
        ) : (
          <Typography variant="h6" textAlign="center" color="gray">
            No products found
          </Typography>
        )}

        {/* Add Product FAB */}
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            bgcolor: "#FF8C00",
          }}
          onClick={() => handleOpenDialog("add")}
        >
          <AddIcon />
        </Fab>
      </Box>

      {/* Add/Edit Product Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {dialogMode === "add" ? "Add New Product" : "Edit Product"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Dish Name"
                value={formData.dish_name}
                onChange={(e) => handleFormChange("dish_name", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Restaurant Name"
                value={formData.restaurant_name}
                onChange={(e) => handleFormChange("restaurant_name", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  onChange={(e) => handleFormChange("category", e.target.value)}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                value={formData.price}
                onChange={(e) => handleFormChange("price", e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Rating"
                type="number"
                value={formData.rating}
                onChange={(e) => handleFormChange("rating", e.target.value)}
                inputProps={{ min: 0, max: 5, step: 0.1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                value={formData.image}
                onChange={(e) => handleFormChange("image", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => handleFormChange("description", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Slogan"
                value={formData.slogan}
                onChange={(e) => handleFormChange("slogan", e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: "#FF8C00" }}>
            {dialogMode === "add" ? "Add Product" : "Update Product"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Footer />
    </Box>
  );
}; 