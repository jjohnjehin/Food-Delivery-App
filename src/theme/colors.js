// Food Delivery App Color Theme
// This file contains all the standardized colors used throughout the application

export const appColors = {
  // Primary Colors
  primary: {
    main: '#FF6B35', // Orange - Main brand color
    light: '#FF8A65',
    dark: '#E65100',
    contrastText: '#FFFFFF'
  },
  
  // Secondary Colors
  secondary: {
    main: '#2E7D32', // Green - Success/Action color
    light: '#4CAF50',
    dark: '#1B5E20',
    contrastText: '#FFFFFF'
  },
  
  // Accent Colors
  accent: {
    red: '#D32F2F', // Red - Error/Danger/Favorite
    yellow: '#FFC107', // Yellow - Warning/Star ratings
    blue: '#1976D2', // Blue - Info/Links
    purple: '#7B1FA2', // Purple - Premium features
    grey: '#757575' // Grey - Secondary text
  },
  
  // Status Colors
  status: {
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3'
  },
  
  // Background Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F5F5F5',
    tertiary: '#FAFAFA',
    dark: '#212121'
  },
  
  // Text Colors
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
    inverse: '#FFFFFF'
  },
  
  // Button Colors
  button: {
    primary: '#FF6B35',
    secondary: '#2E7D32',
    danger: '#D32F2F',
    warning: '#FF9800',
    info: '#2196F3',
    success: '#4CAF50'
  },
  
  // Icon Colors
  icon: {
    primary: '#FF6B35',
    secondary: '#2E7D32',
    favorite: '#D32F2F',
    star: '#FFC107',
    cart: '#FF6B35',
    delete: '#D32F2F',
    edit: '#2196F3',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336'
  }
};

// Common color utilities
export const colorUtils = {
  // Get favorite icon color
  getFavoriteColor: (isFavorited) => isFavorited ? appColors.icon.favorite : appColors.text.secondary,
  
  // Get star rating color
  getStarColor: () => appColors.icon.star,
  
  // Get cart icon color
  getCartColor: () => appColors.icon.cart,
  
  // Get price color
  getPriceColor: () => appColors.secondary.main,
  
  // Get discount color
  getDiscountColor: () => appColors.accent.red,
  
  // Get status color
  getStatusColor: (status) => {
    switch (status) {
      case 'success':
      case 'completed':
      case 'delivered':
        return appColors.status.success;
      case 'warning':
      case 'pending':
      case 'processing':
        return appColors.status.warning;
      case 'error':
      case 'cancelled':
      case 'failed':
        return appColors.status.error;
      case 'info':
      case 'confirmed':
        return appColors.status.info;
      default:
        return appColors.text.secondary;
    }
  }
};

export default appColors; 