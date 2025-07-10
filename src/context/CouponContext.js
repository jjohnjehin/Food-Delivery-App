import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useWorkflow } from './WorkflowContext';

const CouponContext = createContext();

// Action Types
const COUPON_ACTIONS = {
  SET_COUPONS: 'SET_COUPONS',
  ADD_COUPON: 'ADD_COUPON',
  UPDATE_COUPON: 'UPDATE_COUPON',
  DELETE_COUPON: 'DELETE_COUPON',
  APPLY_COUPON: 'APPLY_COUPON',
  REMOVE_COUPON: 'REMOVE_COUPON',
  SET_USER_COUPONS: 'SET_USER_COUPONS',
  SET_WORKFLOW_RULES: 'SET_WORKFLOW_RULES',
  TRIGGER_WORKFLOW: 'TRIGGER_WORKFLOW',
  UPDATE_USER_ENGAGEMENT: 'UPDATE_USER_ENGAGEMENT'
};

// Initial State
const initialState = {
  // Coupon Management
  coupons: [],
  userCoupons: [],
  activeCoupon: null,
  
  // Workflow Automation
  workflowRules: {
    purchaseFollowUp: {
      enabled: true,
      delay: 3, // days
      maxFollowUps: 3,
      couponTypes: ['discount', 'free_delivery', 'cashback']
    },
    reEngagement: {
      enabled: true,
      inactiveDays: 7,
      couponTypes: ['welcome_back', 'special_offer']
    },
    loyaltyRewards: {
      enabled: true,
      pointsThreshold: 100,
      rewardTypes: ['discount', 'free_item', 'upgrade']
    }
  },
  
  // User Engagement Tracking
  userEngagement: {},
  
  // Analytics
  analytics: {
    couponUsage: {},
    conversionRates: {},
    revenueImpact: {}
  },
  
  loading: false,
  error: null
};

// Reducer
const couponReducer = (state, action) => {
  switch (action.type) {
    case COUPON_ACTIONS.SET_COUPONS:
      return { ...state, coupons: action.payload };
    
    case COUPON_ACTIONS.ADD_COUPON:
      return { 
        ...state, 
        coupons: [...state.coupons, action.payload] 
      };
    
    case COUPON_ACTIONS.UPDATE_COUPON:
      return {
        ...state,
        coupons: state.coupons.map(coupon => 
          coupon.id === action.payload.id ? action.payload : coupon
        )
      };
    
    case COUPON_ACTIONS.DELETE_COUPON:
      return {
        ...state,
        coupons: state.coupons.filter(coupon => coupon.id !== action.payload)
      };
    
    case COUPON_ACTIONS.APPLY_COUPON:
      return { ...state, activeCoupon: action.payload };
    
    case COUPON_ACTIONS.REMOVE_COUPON:
      return { ...state, activeCoupon: null };
    
    case COUPON_ACTIONS.SET_USER_COUPONS:
      return { ...state, userCoupons: action.payload };
    
    case COUPON_ACTIONS.SET_WORKFLOW_RULES:
      return { 
        ...state, 
        workflowRules: { ...state.workflowRules, ...action.payload } 
      };
    
    case COUPON_ACTIONS.TRIGGER_WORKFLOW:
      return {
        ...state,
        userEngagement: {
          ...state.userEngagement,
          [action.payload.userId]: {
            ...state.userEngagement[action.payload.userId],
            ...action.payload.data
          }
        }
      };
    
    case COUPON_ACTIONS.UPDATE_USER_ENGAGEMENT:
      return {
        ...state,
        userEngagement: {
          ...state.userEngagement,
          [action.payload.userId]: action.payload.data
        }
      };
    
    default:
      return state;
  }
};

// Coupon Management Functions
const useCouponManagement = () => {
  const { user, token } = useAuth();
  const { formatPrice, formatDate } = useWorkflow();
  
  const createCoupon = async (couponData) => {
    try {
      const response = await fetch('http://localhost:5000/api/coupons', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(couponData)
      });
      
      const result = await response.json();
      if (result.success) {
        return result.data;
      }
      throw new Error(result.message);
    } catch (error) {
      console.error('Error creating coupon:', error);
      throw error;
    }
  };
  
  const updateCoupon = async (couponId, updates) => {
    try {
      const response = await fetch(`http://localhost:5000/api/coupons/${couponId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });
      
      const result = await response.json();
      if (result.success) {
        return result.data;
      }
      throw new Error(result.message);
    } catch (error) {
      console.error('Error updating coupon:', error);
      throw error;
    }
  };
  
  const deleteCoupon = async (couponId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/coupons/${couponId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      if (result.success) {
        return true;
      }
      throw new Error(result.message);
    } catch (error) {
      console.error('Error deleting coupon:', error);
      throw error;
    }
  };
  
  const fetchCoupons = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/coupons', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      if (result.success) {
        return result.data;
      }
      throw new Error(result.message);
    } catch (error) {
      console.error('Error fetching coupons:', error);
      throw error;
    }
  };
  
  const fetchUserCoupons = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}/coupons`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      if (result.success) {
        return result.data;
      }
      throw new Error(result.message);
    } catch (error) {
      console.error('Error fetching user coupons:', error);
      throw error;
    }
  };
  
  return {
    createCoupon,
    updateCoupon,
    deleteCoupon,
    fetchCoupons,
    fetchUserCoupons
  };
};

// Workflow Automation Functions
const useWorkflowAutomation = () => {
  const { user, token } = useAuth();
  
  const triggerPurchaseFollowUp = async (userId, orderData) => {
    try {
      const response = await fetch('http://localhost:5000/api/workflow/purchase-followup', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          orderData,
          triggerType: 'purchase_followup'
        })
      });
      
      const result = await response.json();
      if (result.success) {
        return result.data;
      }
      throw new Error(result.message);
    } catch (error) {
      console.error('Error triggering purchase follow-up:', error);
      throw error;
    }
  };
  
  const triggerReEngagement = async (userId, inactivityData) => {
    try {
      const response = await fetch('http://localhost:5000/api/workflow/re-engagement', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          inactivityData,
          triggerType: 're_engagement'
        })
      });
      
      const result = await response.json();
      if (result.success) {
        return result.data;
      }
      throw new Error(result.message);
    } catch (error) {
      console.error('Error triggering re-engagement:', error);
      throw error;
    }
  };
  
  const processLoyaltyRewards = async (userId, pointsData) => {
    try {
      const response = await fetch('http://localhost:5000/api/workflow/loyalty-rewards', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          pointsData,
          triggerType: 'loyalty_rewards'
        })
      });
      
      const result = await response.json();
      if (result.success) {
        return result.data;
      }
      throw new Error(result.message);
    } catch (error) {
      console.error('Error processing loyalty rewards:', error);
      throw error;
    }
  };
  
  return {
    triggerPurchaseFollowUp,
    triggerReEngagement,
    processLoyaltyRewards
  };
};

// Analytics Functions
const useCouponAnalytics = () => {
  const { user, token } = useAuth();
  
  const fetchCouponAnalytics = async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters);
      const response = await fetch(`http://localhost:5000/api/analytics/coupons?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      if (result.success) {
        return result.data;
      }
      throw new Error(result.message);
    } catch (error) {
      console.error('Error fetching coupon analytics:', error);
      throw error;
    }
  };
  
  const fetchUserEngagementMetrics = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/analytics/user-engagement/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      if (result.success) {
        return result.data;
      }
      throw new Error(result.message);
    } catch (error) {
      console.error('Error fetching user engagement metrics:', error);
      throw error;
    }
  };
  
  return {
    fetchCouponAnalytics,
    fetchUserEngagementMetrics
  };
};

// Utility Functions
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Validation Functions
const validateCoupon = (couponData) => {
  const errors = [];
  
  if (!couponData.code) {
    errors.push('Coupon code is required');
  }
  
  if (!couponData.discountType || !['percentage', 'fixed', 'free_delivery'].includes(couponData.discountType)) {
    errors.push('Valid discount type is required');
  }
  
  if (couponData.discountType === 'percentage' && (couponData.discountValue < 1 || couponData.discountValue > 100)) {
    errors.push('Percentage discount must be between 1 and 100');
  }
  
  if (couponData.discountType === 'fixed' && couponData.discountValue <= 0) {
    errors.push('Fixed discount must be greater than 0');
  }
  
  if (!couponData.validFrom || !couponData.validTo) {
    errors.push('Valid from and to dates are required');
  }
  
  if (new Date(couponData.validFrom) >= new Date(couponData.validTo)) {
    errors.push('Valid to date must be after valid from date');
  }
  
  return errors;
};

// Coupon Provider Component
export const CouponProvider = ({ children }) => {
  const [state, dispatch] = useReducer(couponReducer, initialState);
  const { user } = useAuth();
  
  // Initialize user engagement tracking
  useEffect(() => {
    if (user) {
      // Load user's coupon engagement data
      const userEngagement = localStorage.getItem(`user_engagement_${user.id}`);
      if (userEngagement) {
        dispatch({
          type: COUPON_ACTIONS.UPDATE_USER_ENGAGEMENT,
          payload: {
            userId: user.id,
            data: JSON.parse(userEngagement)
          }
        });
      }
    }
  }, [user]);
  
  // Save user engagement data
  useEffect(() => {
    if (user && state.userEngagement[user.id]) {
      localStorage.setItem(
        `user_engagement_${user.id}`,
        JSON.stringify(state.userEngagement[user.id])
      );
    }
  }, [state.userEngagement, user]);
  
  const value = {
    // State
    ...state,
    
    // Actions
    setCoupons: (coupons) => dispatch({ type: COUPON_ACTIONS.SET_COUPONS, payload: coupons }),
    addCoupon: (coupon) => dispatch({ type: COUPON_ACTIONS.ADD_COUPON, payload: coupon }),
    updateCoupon: (coupon) => dispatch({ type: COUPON_ACTIONS.UPDATE_COUPON, payload: coupon }),
    deleteCoupon: (couponId) => dispatch({ type: COUPON_ACTIONS.DELETE_COUPON, payload: couponId }),
    applyCoupon: (coupon) => dispatch({ type: COUPON_ACTIONS.APPLY_COUPON, payload: coupon }),
    removeCoupon: () => dispatch({ type: COUPON_ACTIONS.REMOVE_COUPON }),
    setUserCoupons: (coupons) => dispatch({ type: COUPON_ACTIONS.SET_USER_COUPONS, payload: coupons }),
    setWorkflowRules: (rules) => dispatch({ type: COUPON_ACTIONS.SET_WORKFLOW_RULES, payload: rules }),
    triggerWorkflow: (userId, data) => dispatch({ 
      type: COUPON_ACTIONS.TRIGGER_WORKFLOW, 
      payload: { userId, data } 
    }),
    updateUserEngagement: (userId, data) => dispatch({
      type: COUPON_ACTIONS.UPDATE_USER_ENGAGEMENT,
      payload: { userId, data }
    }),
    
    // Utility Functions
    validateCoupon,
    formatPrice,
    formatDate
  };
  
  return (
    <CouponContext.Provider value={value}>
      {children}
    </CouponContext.Provider>
  );
};

// Hook to use coupon context
export const useCoupon = () => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error('useCoupon must be used within a CouponProvider');
  }
  return context;
};

// Export management hooks
export { useCouponManagement, useWorkflowAutomation, useCouponAnalytics }; 