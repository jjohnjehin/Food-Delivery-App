import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
  Card,
  CardContent,
  Grid,
  Divider,
  Tooltip,
  Badge,
  Tabs,
  Tab
} from '@mui/material';
import {
  Search as SearchIcon,
  Mic as MicIcon,
  CameraAlt as CameraIcon,
  TrendingUp as TrendingIcon,
  History as HistoryIcon,
  Star as StarIcon,
  Restaurant as RestaurantIcon,
  LocalPizza as PizzaIcon,
  LocalDining as DiningIcon,
  LocalCafe as CafeIcon,
  LocalBar as BarIcon,
  Close as CloseIcon,
  KeyboardVoice as VoiceIcon,
  Image as ImageIcon,
  AutoAwesome as AIIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWorkflow } from '../context/WorkflowContext';
import { googleSearchAPI } from '../services/GoogleSearchAPI';

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`ai-search-tabpanel-${index}`}
    aria-labelledby={`ai-search-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

export const AISearch = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getAllCategories, searchCategories, searchTags } = useWorkflow();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [searchHistory, setSearchHistory] = useState([]);
  const [trendingSearches, setTrendingSearches] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [voiceListening, setVoiceListening] = useState(false);
  const [imageSearch, setImageSearch] = useState(false);
  
  const searchInputRef = useRef(null);
  const voiceRecognitionRef = useRef(null);

  // Mock AI responses for different search types
  const mockAIResponses = {
    'pizza': {
      response: "I found some amazing pizza options for you! 🍕 Based on your search, I recommend trying our Margherita Pizza with fresh mozzarella and basil, or our Pepperoni Supreme for a classic taste. Both are available with different sizes and crust options.",
      suggestions: ['Margherita Pizza', 'Pepperoni Supreme', 'Vegetarian Pizza', 'BBQ Chicken Pizza'],
      categories: ['pizza', 'italian', 'main_course'],
      confidence: 0.95
    },
    'burger': {
      response: "Great choice! 🍔 I've found several delicious burger options. Our Classic Beef Burger with fresh lettuce and tomatoes is a crowd favorite, or try our Spicy Chicken Burger for something different.",
      suggestions: ['Classic Beef Burger', 'Spicy Chicken Burger', 'Veggie Burger', 'Cheese Burger'],
      categories: ['burger', 'fast_food', 'main_course'],
      confidence: 0.92
    },
    'pasta': {
      response: "Perfect! 🍝 I've discovered some excellent pasta dishes. Our Carbonara with creamy sauce and bacon is a must-try, or go for our Spaghetti Bolognese for a hearty meal.",
      suggestions: ['Carbonara', 'Spaghetti Bolognese', 'Penne Arrabbiata', 'Fettuccine Alfredo'],
      categories: ['pasta', 'italian', 'main_course'],
      confidence: 0.89
    },
    'dessert': {
      response: "Sweet treats! 🍰 I found some delightful dessert options. Our Chocolate Lava Cake is perfect for chocolate lovers, or try our Tiramisu for a classic Italian dessert.",
      suggestions: ['Chocolate Lava Cake', 'Tiramisu', 'Cheesecake', 'Ice Cream'],
      categories: ['dessert', 'sweet', 'beverages'],
      confidence: 0.87
    },
    'drinks': {
      response: "Thirsty? 🥤 I've got some refreshing drink options for you. Our Fresh Fruit Smoothies are perfect for health-conscious choices, or try our Signature Coffee for a caffeine boost.",
      suggestions: ['Fresh Fruit Smoothies', 'Signature Coffee', 'Iced Tea', 'Fresh Juices'],
      categories: ['beverages', 'drinks', 'refreshments'],
      confidence: 0.91
    }
  };

  // Mock trending searches
  const mockTrendingSearches = [
    { query: 'Margherita Pizza', count: 156, trending: true },
    { query: 'Chicken Wings', count: 134, trending: true },
    { query: 'Pasta Carbonara', count: 98, trending: false },
    { query: 'Chocolate Cake', count: 87, trending: true },
    { query: 'Fresh Smoothies', count: 76, trending: false }
  ];

  // Mock search history
  const mockSearchHistory = [
    { query: 'Pepperoni Pizza', timestamp: '2023-12-07T10:30:00Z' },
    { query: 'Chicken Burger', timestamp: '2023-12-06T15:45:00Z' },
    { query: 'Spaghetti Bolognese', timestamp: '2023-12-05T12:20:00Z' },
    { query: 'Tiramisu', timestamp: '2023-12-04T18:15:00Z' }
  ];

  useEffect(() => {
    // Load trending searches from Google Search API
    const loadTrendingSearches = async () => {
      try {
        const trending = await googleSearchAPI.getTrendingSearches();
        setTrendingSearches(trending);
      } catch (error) {
        console.error('Error loading trending searches:', error);
        setTrendingSearches(mockTrendingSearches);
      }
    };
    
    loadTrendingSearches();
    setSearchHistory(mockSearchHistory);
    
    // Initialize voice recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      voiceRecognitionRef.current = new SpeechRecognition();
      voiceRecognitionRef.current.continuous = false;
      voiceRecognitionRef.current.interimResults = false;
      voiceRecognitionRef.current.lang = 'en-US';
      
      voiceRecognitionRef.current.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setVoiceListening(false);
        
        // Use Google Search API for voice search
        try {
          const voiceResult = await googleSearchAPI.voiceSearch(null);
          const processedQuery = voiceResult.transcript || transcript;
          setSearchQuery(processedQuery);
          handleAISearch(processedQuery);
        } catch (error) {
          console.error('Voice search error:', error);
          handleAISearch(transcript);
        }
      };
      
      voiceRecognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setVoiceListening(false);
        showSnackbar('Voice recognition failed. Please try again.', 'error');
      };
    }
  }, []);

  const handleAISearch = async (query = searchQuery) => {
    if (!query.trim()) return;
    
    setLoading(true);
    
    try {
      // Get AI response and Google Search results in parallel
      const [aiResponse, googleResults] = await Promise.all([
        // AI processing
        (async () => {
          await new Promise(resolve => setTimeout(resolve, 1000));
          const queryLower = query.toLowerCase();
          let aiResponse = null;
          
          // Find matching AI response
          for (const [key, response] of Object.entries(mockAIResponses)) {
            if (queryLower.includes(key)) {
              aiResponse = response;
              break;
            }
          }
          
          // Default response if no specific match
          if (!aiResponse) {
            aiResponse = {
              response: `I found some great options for "${query}"! 🍽️ Here are some recommendations based on your search.`,
              suggestions: ['Popular Items', 'Chef Specials', 'Customer Favorites', 'New Arrivals'],
              categories: ['general', 'recommendations'],
              confidence: 0.75
            };
          }
          
          return aiResponse;
        })(),
        
        // Google Search API
        googleSearchAPI.search(query, { num: 6 })
      ]);
      
      setAiResponse(aiResponse);
      
      // Transform Google Search results to our format
      const transformedResults = googleResults.items.map((item, index) => ({
        id: index + 1,
        title: item.title,
        description: item.snippet,
        image: item.image || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
        price: `₹${Math.floor(Math.random() * 300) + 200}`,
        rating: (Math.random() * 2 + 3).toFixed(1),
        category: aiResponse.categories[0],
        available: true,
        link: item.link
      }));
      
      setSearchResults(transformedResults);
      
      // Add to search history
      const newHistoryItem = {
        query: query,
        timestamp: new Date().toISOString()
      };
      setSearchHistory(prev => [newHistoryItem, ...prev.slice(0, 9)]);
      
      setShowDialog(true);
      
    } catch (error) {
      console.error('AI Search error:', error);
      showSnackbar('Search failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceSearch = () => {
    if (voiceRecognitionRef.current) {
      setVoiceListening(true);
      voiceRecognitionRef.current.start();
    } else {
      showSnackbar('Voice recognition not supported in this browser.', 'warning');
    }
  };

  const handleImageSearch = () => {
    setImageSearch(true);
    showSnackbar('Image search feature coming soon!', 'info');
  };

  const handleQuickSearch = (query) => {
    setSearchQuery(query);
    handleAISearch(query);
  };

  const handleResultClick = (result) => {
    navigate('/MenuItemDetails', { 
      state: { 
        item: result,
        category: result.category 
      } 
    });
    setShowDialog(false);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'pizza': return <PizzaIcon />;
      case 'burger': return <RestaurantIcon />;
      case 'pasta': return <DiningIcon />;
      case 'dessert': return <CafeIcon />;
      case 'drinks': return <BarIcon />;
      default: return <RestaurantIcon />;
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#f5f5f5', 
      pt: 12,
      marginTop: "100px"
    }}>
      <Typography variant="h4" gutterBottom align="center">
        AI-Powered Food Search
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Discover your perfect meal with intelligent search and personalized recommendations
      </Typography>

      {/* Search Bar */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          mb: 3, 
          borderRadius: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AIIcon sx={{ fontSize: 28, color: 'white' }} />
          <TextField
            fullWidth
            placeholder="Ask AI about food, ingredients, or preferences..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAISearch()}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
                '& input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  opacity: 1,
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title="Voice Search">
                    <IconButton 
                      onClick={handleVoiceSearch}
                      disabled={voiceListening}
                      sx={{ color: 'white' }}
                    >
                      {voiceListening ? <CircularProgress size={20} color="inherit" /> : <VoiceIcon />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Image Search">
                    <IconButton 
                      onClick={handleImageSearch}
                      sx={{ color: 'white' }}
                    >
                      <ImageIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="AI Search">
                    <IconButton 
                      onClick={() => handleAISearch()}
                      disabled={loading}
                      sx={{ color: 'white' }}
                    >
                      {loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
                    </IconButton>
                  </Tooltip>
                </Box>
              ),
            }}
          />
        </Box>
      </Paper>

      {/* Quick Search Options */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Quick Search
          </Typography>
        </Grid>
        {Object.keys(mockAIResponses).map((category) => (
          <Grid item xs={6} sm={4} md={2} key={category}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.05)' }
              }}
              onClick={() => handleQuickSearch(category)}
            >
              <CardContent sx={{ textAlign: 'center', p: 2 }}>
                {getCategoryIcon(category)}
                <Typography variant="body2" sx={{ mt: 1, textTransform: 'capitalize' }}>
                  {category}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Trending Searches */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          <TrendingIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Trending Searches
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {trendingSearches.map((item, index) => (
            <Chip
              key={index}
              label={item.query}
              onClick={() => handleQuickSearch(item.query)}
              color={item.trending ? 'primary' : 'default'}
              variant={item.trending ? 'filled' : 'outlined'}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      </Paper>

      {/* Search History */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          <HistoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Recent Searches
        </Typography>
        <List>
          {searchHistory.slice(0, 5).map((item, index) => (
            <ListItem 
              key={index}
              button
              onClick={() => handleQuickSearch(item.query)}
              sx={{ borderRadius: 1, mb: 1 }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <SearchIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.query}
                secondary={new Date(item.timestamp).toLocaleDateString()}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* AI Search Results Dialog */}
      <Dialog 
        open={showDialog} 
        onClose={() => setShowDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              AI Search Results
            </Typography>
            <IconButton onClick={() => setShowDialog(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {aiResponse && (
            <Box>
              {/* AI Response */}
              <Paper sx={{ p: 3, mb: 3, bgcolor: 'primary.light', color: 'white' }}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {aiResponse.response}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {aiResponse.suggestions.map((suggestion, index) => (
                    <Chip
                      key={index}
                      label={suggestion}
                      variant="outlined"
                      sx={{ color: 'white', borderColor: 'white' }}
                      onClick={() => handleQuickSearch(suggestion)}
                    />
                  ))}
                </Box>
                <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
                  AI Confidence: {(aiResponse.confidence * 100).toFixed(0)}%
                </Typography>
              </Paper>

              {/* Search Results */}
              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                <Tab label="Search Results" />
                <Tab label="AI Recommendations" />
              </Tabs>

              <TabPanel value={activeTab} index={0}>
                <Grid container spacing={2}>
                  {searchResults.map((result) => (
                    <Grid item xs={12} sm={6} md={4} key={result.id}>
                      <Card 
                        sx={{ cursor: 'pointer', height: '100%' }}
                        onClick={() => handleResultClick(result)}
                      >
                        <Box
                          sx={{
                            height: 200,
                            backgroundImage: `url(${result.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            position: 'relative'
                          }}
                        />
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {result.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {result.description}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" color="primary">
                              {result.price}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <StarIcon sx={{ color: 'warning.main', fontSize: 16 }} />
                              <Typography variant="body2" sx={{ ml: 0.5 }}>
                                {result.rating}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

              <TabPanel value={activeTab} index={1}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Based on your search, here are some personalized recommendations:
                </Typography>
                <List>
                  {aiResponse.suggestions.map((suggestion, index) => (
                    <ListItem key={index} button onClick={() => handleQuickSearch(suggestion)}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'secondary.main' }}>
                          <RestaurantIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={suggestion}
                        secondary="AI Recommended"
                      />
                    </ListItem>
                  ))}
                </List>
              </TabPanel>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>Close</Button>
          <Button variant="contained" onClick={() => navigate('/ExploreMenu')}>
            View All Menu
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