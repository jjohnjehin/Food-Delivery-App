# Color Standardization Guide

## Overview
This guide provides standardized colors for the Food Delivery App to ensure consistency across all components.

## Color Palette

### Primary Colors
- **Primary Orange**: `#FF6B35` - Main brand color for buttons, links, and primary actions
- **Secondary Green**: `#2E7D32` - Success actions, prices, and positive states

### Accent Colors
- **Red**: `#D32F2F` - Favorites, errors, delete actions
- **Yellow**: `#FFC107` - Star ratings, warnings
- **Blue**: `#1976D2` - Info, links, secondary actions
- **Purple**: `#7B1FA2` - Premium features
- **Grey**: `#757575` - Secondary text

### Status Colors
- **Success**: `#4CAF50` - Completed actions
- **Warning**: `#FF9800` - Pending states
- **Error**: `#F44336` - Failed actions
- **Info**: `#2196F3` - Information states

## Usage Guidelines

### Buttons
```javascript
// Primary buttons (Add to Cart, Buy Now)
sx={{ bgcolor: appColors.button.primary, color: appColors.text.inverse }}

// Secondary buttons (Cancel, Back)
sx={{ bgcolor: appColors.button.secondary, color: appColors.text.inverse }}

// Danger buttons (Delete, Remove)
sx={{ bgcolor: appColors.button.danger, color: appColors.text.inverse }}

// Success buttons (Proceed, Confirm)
sx={{ bgcolor: appColors.button.success, color: appColors.text.inverse }}
```

### Icons
```javascript
// Favorite icons
color: colorUtils.getFavoriteColor(isFavorited)

// Star ratings
color: colorUtils.getStarColor()

// Cart icons
color: colorUtils.getCartColor()

// Delete icons
color: appColors.icon.delete

// Edit icons
color: appColors.icon.edit
```

### Text Colors
```javascript
// Prices
color: colorUtils.getPriceColor()

// Discounts
color: colorUtils.getDiscountColor()

// Status text
color: colorUtils.getStatusColor(status)
```

### Background Colors
```javascript
// Primary background
bgcolor: appColors.background.primary

// Secondary background
bgcolor: appColors.background.secondary

// Dark background
bgcolor: appColors.background.dark
```

## Component Updates Required

### 1. Products.jsx ✅
- ✅ Favorite icons: `colorUtils.getFavoriteColor()`
- ✅ Star ratings: `colorUtils.getStarColor()`
- ⚠️ Button colors need update

### 2. SearchResults.jsx ✅
- ✅ Loading text: `appColors.primary.main`
- ✅ Favorite icons: `colorUtils.getFavoriteColor()`
- ✅ Cart icons: `colorUtils.getCartColor()`
- ⚠️ Price colors need update

### 3. Item.jsx ✅
- ✅ Favorite icons: `colorUtils.getFavoriteColor()`
- ✅ Price colors: `colorUtils.getPriceColor()`
- ⚠️ Button colors need update

### 4. MenuItemDetails.jsx ✅
- ✅ Color theme imported
- ⚠️ Favorite icons and button colors need update

### 5. Cart.jsx ✅
- ✅ Color theme imported
- ⚠️ Delete button and discount colors need update

### 6. ExploreMenu.jsx ✅
- ✅ Color theme imported
- ⚠️ All colors need standardization

### 7. Other Components
- ⚠️ Account.jsx - Needs color standardization
- ⚠️ PaymentDetails.jsx - Needs color standardization
- ⚠️ AdminPage components - Need color standardization

## Implementation Steps

1. **Import color theme** in each component:
```javascript
import { appColors, colorUtils } from '../theme/colors';
```

2. **Replace hardcoded colors** with theme colors:
```javascript
// Before
color: "red"
bgcolor: "orange"

// After
color: colorUtils.getFavoriteColor(isFavorited)
bgcolor: appColors.button.primary
```

3. **Update button styles**:
```javascript
// Primary action buttons
sx={{ bgcolor: appColors.button.primary, color: appColors.text.inverse }}

// Secondary action buttons
sx={{ bgcolor: appColors.button.secondary, color: appColors.text.inverse }}
```

4. **Update icon colors**:
```javascript
// Favorite icons
sx={{ color: colorUtils.getFavoriteColor(isFavorited) }}

// Star ratings
sx={{ color: colorUtils.getStarColor() }}
```

## Benefits

1. **Consistency**: All components use the same color scheme
2. **Maintainability**: Easy to update colors globally
3. **Accessibility**: Proper contrast ratios
4. **Brand Identity**: Consistent brand colors throughout
5. **User Experience**: Familiar color patterns

## Testing Checklist

- [ ] All favorite icons use standardized red color
- [ ] All star ratings use standardized yellow color
- [ ] All prices use standardized green color
- [ ] All primary buttons use standardized orange color
- [ ] All delete buttons use standardized red color
- [ ] All success buttons use standardized green color
- [ ] All warning states use standardized orange color
- [ ] All error states use standardized red color

## Future Updates

When updating colors:
1. Update the `appColors` object in `colors.js`
2. Update the `colorUtils` functions if needed
3. Test all components to ensure consistency
4. Update this guide with any new color patterns 