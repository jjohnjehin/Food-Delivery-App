import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Alert,
  Snackbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Help as HelpIcon,
  ContactSupport as ContactSupportIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Chat as ChatIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Support as SupportIcon,
  Payment as PaymentIcon,
  LocalShipping as ShippingIcon,
  Restaurant as RestaurantIcon,
  AccountCircle as AccountIcon,
  Security as SecurityIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const Help = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // FAQ Categories
  const faqCategories = [
    {
      title: 'Ordering & Payment',
      icon: <PaymentIcon />,
      faqs: [
        {
          question: 'How do I place an order?',
          answer: 'Browse our menu, add items to your cart, select delivery address, choose payment method, and confirm your order. You can track your order in real-time.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit/debit cards, UPI, net banking, digital wallets (Paytm, PhonePe, Google Pay), and cash on delivery.'
        },
        {
          question: 'Can I cancel my order?',
          answer: 'You can cancel your order within 5 minutes of placing it. After that, please contact our customer support for assistance.'
        },
        {
          question: 'Is there a minimum order value?',
          answer: 'Yes, the minimum order value is ₹99. This helps us provide efficient delivery service.'
        }
      ]
    },
    {
      title: 'Delivery & Shipping',
      icon: <ShippingIcon />,
      faqs: [
        {
          question: 'How long does delivery take?',
          answer: 'Standard delivery takes 30-45 minutes. Express delivery (available in select areas) takes 20-30 minutes. Delivery times may vary based on location and order volume.'
        },
        {
          question: 'Do you deliver to my area?',
          answer: 'We deliver to most areas within city limits. Enter your address on our website or app to check delivery availability in your area.'
        },
        {
          question: 'What if my food arrives late?',
          answer: 'If your order is delayed beyond the promised time, you may be eligible for compensation. Contact our support team for assistance.'
        },
        {
          question: 'Can I track my order?',
          answer: 'Yes! You can track your order in real-time through our app or website. You\'ll receive updates at every stage of your order.'
        }
      ]
    },
    {
      title: 'Account & Security',
      icon: <AccountIcon />,
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'Download our app or visit our website, click "Sign Up", enter your details, verify your email/phone, and you\'re ready to order!'
        },
        {
          question: 'I forgot my password. What should I do?',
          answer: 'Click "Forgot Password" on the login page, enter your registered email, and follow the instructions sent to your email to reset your password.'
        },
        {
          question: 'Is my payment information secure?',
          answer: 'Yes, we use industry-standard SSL encryption to protect your payment information. We never store your card details on our servers.'
        },
        {
          question: 'Can I change my delivery address?',
          answer: 'Yes, you can manage multiple delivery addresses in your account settings. You can also add a new address during checkout.'
        }
      ]
    },
    {
      title: 'Restaurants & Menu',
      icon: <RestaurantIcon />,
      faqs: [
        {
          question: 'How do you ensure food quality?',
          answer: 'We partner with carefully selected restaurants that meet our quality standards. All restaurants are regularly inspected and rated by our team.'
        },
        {
          question: 'Can I customize my order?',
          answer: 'Yes! Most items can be customized. You can add special instructions, modify ingredients, or request specific cooking preferences.'
        },
        {
          question: 'What if my food is not as expected?',
          answer: 'If you\'re not satisfied with your order, contact us within 30 minutes of delivery. We\'ll work to resolve the issue promptly.'
        },
        {
          question: 'Do you have vegetarian/vegan options?',
          answer: 'Yes, we have a wide variety of vegetarian and vegan options. You can filter by dietary preferences in our menu.'
        }
      ]
    }
  ];

  // Support Options
  const supportOptions = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: <ChatIcon />,
      action: () => setContactDialogOpen(true),
      color: 'primary'
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: <EmailIcon />,
      action: () => window.location.href = 'mailto:support@freshfeast.com',
      color: 'secondary'
    },
    {
      title: 'Phone Support',
      description: 'Call us directly',
      icon: <PhoneIcon />,
      action: () => window.location.href = 'tel:+919876543210',
      color: 'success'
    },
    {
      title: 'Visit Us',
      description: 'Find our office location',
      icon: <LocationIcon />,
      action: () => window.open('https://maps.google.com', '_blank'),
      color: 'warning'
    }
  ];

  // Troubleshooting Guides
  const troubleshootingGuides = [
    {
      title: 'Order Not Delivered',
      steps: [
        'Check your order status in the app',
        'Verify your delivery address',
        'Contact customer support if delayed',
        'Check for any delivery restrictions'
      ]
    },
    {
      title: 'Payment Issues',
      steps: [
        'Verify your payment method',
        'Check your bank balance',
        'Try a different payment option',
        'Contact your bank if needed'
      ]
    },
    {
      title: 'App Not Working',
      steps: [
        'Update to the latest version',
        'Clear app cache and data',
        'Check your internet connection',
        'Restart the app'
      ]
    },
    {
      title: 'Wrong Order Received',
      steps: [
        'Contact support immediately',
        'Take photos of the issue',
        'Keep the order for inspection',
        'Request a refund or replacement'
      ]
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSnackbar({
      open: true,
      message: 'Your message has been sent! We\'ll get back to you within 24 hours.',
      severity: 'success'
    });
    setContactDialogOpen(false);
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', pt: 12, marginTop: "100px" }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'white', py: 4, mb: 3 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
          <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
            Help & Support
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Find answers to your questions and get the support you need
          </Typography>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
        {/* Search Bar */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SearchIcon color="action" />
            <TextField
              fullWidth
              placeholder="Search for help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="standard"
              InputProps={{ disableUnderline: true }}
            />
          </Box>
        </Paper>

        {/* Quick Support Options */}
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
          Get Help Quickly
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {supportOptions.map((option, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}
                onClick={option.action}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box sx={{ color: `${option.color}.main`, mb: 2 }}>
                    {option.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {option.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {option.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* FAQ Section */}
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
          Frequently Asked Questions
        </Typography>
        
        {filteredFAQs.map((category, categoryIndex) => (
          <Box key={categoryIndex} sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ color: 'primary.main' }}>
                {category.icon}
              </Box>
              <Typography variant="h6" fontWeight="bold">
                {category.title}
              </Typography>
            </Box>
            
            {category.faqs.map((faq, faqIndex) => (
              <Accordion key={faqIndex} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight="medium">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        ))}

        {/* Troubleshooting Section */}
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3, mt: 4 }}>
          Troubleshooting Guides
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {troubleshootingGuides.map((guide, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {guide.title}
                  </Typography>
                  <List dense>
                    {guide.steps.map((step, stepIndex) => (
                      <ListItem key={stepIndex} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircleIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={step} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Contact Information */}
        <Paper sx={{ p: 4, bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Still Need Help?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Our customer support team is available 24/7 to assist you with any questions or concerns.
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<ContactSupportIcon />}
            onClick={() => setContactDialogOpen(true)}
            sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
          >
            Contact Support
          </Button>
        </Paper>
      </Box>

      {/* Contact Dialog */}
      <Dialog open={contactDialogOpen} onClose={() => setContactDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Contact Support
            <IconButton onClick={() => setContactDialogOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <form onSubmit={handleContactSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setContactDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Send Message
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Snackbar */}
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