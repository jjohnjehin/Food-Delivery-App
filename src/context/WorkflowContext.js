import React, { createContext, useContext, useState, useEffect } from 'react';

const WorkflowContext = createContext();

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};

export const WorkflowProvider = ({ children }) => {
  // Global workflow state
  const [workflowState, setWorkflowState] = useState({
    // Category Management
    categories: {
      food: {
        id: 'food',
        name: 'Food & Beverages',
        description: 'All food and beverage items',
        icon: '🍽️',
        subcategories: {
          pizza: {
            id: 'pizza',
            name: 'Pizza',
            description: 'Italian pizza varieties',
            icon: '🍕',
            tags: ['margherita', 'pepperoni', 'vegetarian', 'cheese', 'tomato'],
            attributes: ['size', 'crust', 'toppings'],
            popular: true
          },
          burger: {
            id: 'burger',
            name: 'Burger',
            description: 'Burgers and sandwiches',
            icon: '🍔',
            tags: ['beef', 'chicken', 'vegetarian', 'cheese', 'lettuce', 'tomato'],
            attributes: ['patty', 'bun', 'sauce'],
            popular: true
          },
          pasta: {
            id: 'pasta',
            name: 'Pasta',
            description: 'Italian pasta dishes',
            icon: '🍝',
            tags: ['spaghetti', 'penne', 'fettuccine', 'cream', 'tomato', 'seafood'],
            attributes: ['type', 'sauce', 'protein'],
            popular: false
          },
          noodles: {
            id: 'noodles',
            name: 'Noodles',
            description: 'Asian noodle dishes',
            icon: '🍜',
            tags: ['ramen', 'udon', 'soba', 'stir-fry', 'soup', 'spicy'],
            attributes: ['type', 'broth', 'toppings'],
            popular: true
          },
          dessert: {
            id: 'dessert',
            name: 'Desserts',
            description: 'Sweet treats and desserts',
            icon: '🍰',
            tags: ['cake', 'ice-cream', 'chocolate', 'fruit', 'pastry', 'sweet'],
            attributes: ['type', 'flavor', 'size'],
            popular: false
          },
          beverages: {
            id: 'beverages',
            name: 'Beverages',
            description: 'Drinks and beverages',
            icon: '🥤',
            tags: ['coffee', 'tea', 'juice', 'soda', 'smoothie', 'alcohol'],
            attributes: ['type', 'temperature', 'size'],
            popular: false
          }
        }
      },
      restaurant: {
        id: 'restaurant',
        name: 'Restaurant Types',
        description: 'Restaurant categories and types',
        icon: '🏪',
        subcategories: {
          fine_dining: {
            id: 'fine_dining',
            name: 'Fine Dining',
            description: 'High-end restaurants',
            icon: '🍷',
            tags: ['luxury', 'formal', 'wine', 'gourmet', 'reservation'],
            attributes: ['cuisine', 'ambiance', 'price_range'],
            popular: false
          },
          casual: {
            id: 'casual',
            name: 'Casual Dining',
            description: 'Casual restaurants',
            icon: '🍽️',
            tags: ['family', 'affordable', 'quick', 'comfortable'],
            attributes: ['cuisine', 'atmosphere', 'price_range'],
            popular: true
          },
          fast_food: {
            id: 'fast_food',
            name: 'Fast Food',
            description: 'Quick service restaurants',
            icon: '🍟',
            tags: ['quick', 'affordable', 'takeout', 'drive-thru'],
            attributes: ['service_type', 'price_range', 'speed'],
            popular: true
          },
          street_food: {
            id: 'street_food',
            name: 'Street Food',
            description: 'Street food and food trucks',
            icon: '🌮',
            tags: ['local', 'authentic', 'quick', 'affordable'],
            attributes: ['location', 'authenticity', 'price_range'],
            popular: false
          }
        }
      },
      cuisine: {
        id: 'cuisine',
        name: 'Cuisine Types',
        description: 'Different cuisine types',
        icon: '🌍',
        subcategories: {
          indian: {
            id: 'indian',
            name: 'Indian',
            description: 'Indian cuisine',
            icon: '🍛',
            tags: ['spicy', 'curry', 'rice', 'bread', 'vegetarian'],
            attributes: ['region', 'spice_level', 'dietary'],
            popular: true
          },
          chinese: {
            id: 'chinese',
            name: 'Chinese',
            description: 'Chinese cuisine',
            icon: '🥢',
            tags: ['stir-fry', 'noodles', 'rice', 'dim-sum', 'soup'],
            attributes: ['region', 'cooking_style', 'dietary'],
            popular: true
          },
          italian: {
            id: 'italian',
            name: 'Italian',
            description: 'Italian cuisine',
            icon: '🍝',
            tags: ['pizza', 'pasta', 'wine', 'olive-oil', 'herbs'],
            attributes: ['region', 'authenticity', 'dietary'],
            popular: true
          },
          mexican: {
            id: 'mexican',
            name: 'Mexican',
            description: 'Mexican cuisine',
            icon: '🌮',
            tags: ['tacos', 'burritos', 'spicy', 'beans', 'corn'],
            attributes: ['region', 'spice_level', 'dietary'],
            popular: false
          },
          japanese: {
            id: 'japanese',
            name: 'Japanese',
            description: 'Japanese cuisine',
            icon: '🍱',
            tags: ['sushi', 'ramen', 'tempura', 'miso', 'wasabi'],
            attributes: ['region', 'authenticity', 'dietary'],
            popular: true
          }
        }
      }
    },

    // Tag Management
    tags: {
      dietary: {
        vegetarian: { id: 'vegetarian', name: 'Vegetarian', icon: '🥬', color: '#4caf50' },
        vegan: { id: 'vegan', name: 'Vegan', icon: '🌱', color: '#8bc34a' },
        gluten_free: { id: 'gluten_free', name: 'Gluten Free', icon: '🌾', color: '#ff9800' },
        dairy_free: { id: 'dairy_free', name: 'Dairy Free', icon: '🥛', color: '#2196f3' },
        nut_free: { id: 'nut_free', name: 'Nut Free', icon: '🥜', color: '#795548' }
      },
      spice_level: {
        mild: { id: 'mild', name: 'Mild', icon: '🌶️', color: '#4caf50' },
        medium: { id: 'medium', name: 'Medium', icon: '🌶️🌶️', color: '#ff9800' },
        hot: { id: 'hot', name: 'Hot', icon: '🌶️🌶️🌶️', color: '#f44336' },
        extra_hot: { id: 'extra_hot', name: 'Extra Hot', icon: '🌶️🌶️🌶️🌶️', color: '#d32f2f' }
      },
      preparation: {
        quick: { id: 'quick', name: 'Quick', icon: '⚡', color: '#ff9800' },
        made_to_order: { id: 'made_to_order', name: 'Made to Order', icon: '👨‍🍳', color: '#2196f3' },
        pre_made: { id: 'pre_made', name: 'Pre-made', icon: '📦', color: '#9c27b0' },
        fresh: { id: 'fresh', name: 'Fresh', icon: '🌿', color: '#4caf50' }
      },
      price_range: {
        budget: { id: 'budget', name: 'Budget', icon: '💰', color: '#4caf50' },
        moderate: { id: 'moderate', name: 'Moderate', icon: '💰💰', color: '#ff9800' },
        premium: { id: 'premium', name: 'Premium', icon: '💰💰💰', color: '#f44336' },
        luxury: { id: 'luxury', name: 'Luxury', icon: '💰💰💰💰', color: '#9c27b0' }
      }
    },

    // Workflow States
    workflowStates: {
      product: {
        draft: { id: 'draft', name: 'Draft', color: '#9e9e9e', icon: '📝' },
        pending_review: { id: 'pending_review', name: 'Pending Review', color: '#ff9800', icon: '⏳' },
        approved: { id: 'approved', name: 'Approved', color: '#4caf50', icon: '✅' },
        active: { id: 'active', name: 'Active', color: '#2196f3', icon: '🟢' },
        inactive: { id: 'inactive', name: 'Inactive', color: '#f44336', icon: '🔴' },
        archived: { id: 'archived', name: 'Archived', color: '#795548', icon: '📦' }
      },
      order: {
        pending: { id: 'pending', name: 'Pending', color: '#ff9800', icon: '⏳' },
        confirmed: { id: 'confirmed', name: 'Confirmed', color: '#2196f3', icon: '📋' },
        preparing: { id: 'preparing', name: 'Preparing', color: '#ff9800', icon: '👨‍🍳' },
        ready: { id: 'ready', name: 'Ready', color: '#4caf50', icon: '✅' },
        delivered: { id: 'delivered', name: 'Delivered', color: '#4caf50', icon: '🚚' },
        cancelled: { id: 'cancelled', name: 'Cancelled', color: '#f44336', icon: '❌' }
      },
      business: {
        pending_approval: { id: 'pending_approval', name: 'Pending Approval', color: '#ff9800', icon: '⏳' },
        approved: { id: 'approved', name: 'Approved', color: '#4caf50', icon: '✅' },
        suspended: { id: 'suspended', name: 'Suspended', color: '#f44336', icon: '⏸️' },
        active: { id: 'active', name: 'Active', color: '#2196f3', icon: '🟢' },
        inactive: { id: 'inactive', name: 'Inactive', color: '#9e9e9e', icon: '🔴' }
      }
    },

    // Global Settings
    settings: {
      defaultLanguage: 'en',
      supportedLanguages: ['en', 'hi', 'es', 'fr'],
      currency: 'INR',
      timezone: 'Asia/Kolkata',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: 'HH:mm'
    }
  });

  // Helper functions
  const getCategoryById = (categoryId) => {
    for (const mainCategory of Object.values(workflowState.categories)) {
      if (mainCategory.id === categoryId) return mainCategory;
      for (const subCategory of Object.values(mainCategory.subcategories || {})) {
        if (subCategory.id === categoryId) return subCategory;
      }
    }
    return null;
  };

  const getSubcategoryById = (subcategoryId) => {
    for (const mainCategory of Object.values(workflowState.categories)) {
      for (const subCategory of Object.values(mainCategory.subcategories || {})) {
        if (subCategory.id === subcategoryId) return subCategory;
      }
    }
    return null;
  };

  const getTagById = (tagId) => {
    for (const tagGroup of Object.values(workflowState.tags)) {
      for (const tag of Object.values(tagGroup)) {
        if (tag.id === tagId) return tag;
      }
    }
    return null;
  };

  const getWorkflowState = (type, stateId) => {
    return workflowState.workflowStates[type]?.[stateId] || null;
  };

  const getAllCategories = () => {
    const allCategories = [];
    for (const mainCategory of Object.values(workflowState.categories)) {
      allCategories.push(mainCategory);
      if (mainCategory.subcategories) {
        allCategories.push(...Object.values(mainCategory.subcategories));
      }
    }
    return allCategories;
  };

  const getAllTags = () => {
    const allTags = [];
    for (const tagGroup of Object.values(workflowState.tags)) {
      allTags.push(...Object.values(tagGroup));
    }
    return allTags;
  };

  const getPopularCategories = () => {
    const allCategories = getAllCategories();
    return allCategories.filter(category => category.popular);
  };

  const searchCategories = (query) => {
    const allCategories = getAllCategories();
    const searchTerm = query.toLowerCase();
    return allCategories.filter(category => 
      category.name.toLowerCase().includes(searchTerm) ||
      category.description.toLowerCase().includes(searchTerm)
    );
  };

  const searchTags = (query) => {
    const allTags = getAllTags();
    const searchTerm = query.toLowerCase();
    return allTags.filter(tag => 
      tag.name.toLowerCase().includes(searchTerm)
    );
  };

  const getTagsByCategory = (categoryId) => {
    const category = getCategoryById(categoryId) || getSubcategoryById(categoryId);
    return category?.tags || [];
  };

  const getAttributesByCategory = (categoryId) => {
    const category = getCategoryById(categoryId) || getSubcategoryById(categoryId);
    return category?.attributes || [];
  };

  const validateProductData = (productData) => {
    const errors = [];
    
    if (!productData.category) {
      errors.push('Category is required');
    }
    
    if (!productData.dish_name) {
      errors.push('Dish name is required');
    }
    
    if (!productData.price || productData.price <= 0) {
      errors.push('Valid price is required');
    }
    
    if (!productData.restaurant_name) {
      errors.push('Restaurant name is required');
    }
    
    return errors;
  };

  const formatPrice = (price, currency = workflowState.settings.currency) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date(date));
  };

  const value = {
    // State
    workflowState,
    setWorkflowState,
    
    // Helper functions
    getCategoryById,
    getSubcategoryById,
    getTagById,
    getWorkflowState,
    getAllCategories,
    getAllTags,
    getPopularCategories,
    searchCategories,
    searchTags,
    getTagsByCategory,
    getAttributesByCategory,
    validateProductData,
    formatPrice,
    formatDate
  };

  return (
    <WorkflowContext.Provider value={value}>
      {children}
    </WorkflowContext.Provider>
  );
}; 