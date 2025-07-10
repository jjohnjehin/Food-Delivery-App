import React, { createContext, useContext, useState, useCallback } from 'react';

const FormContext = createContext();

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};

export const FormProvider = ({ children }) => {
  // Form states for different forms
  const [forms, setForms] = useState({
    login: {
      data: { username: '', password: '' },
      errors: {},
      touched: {},
      isValid: false,
      isSubmitting: false
    },
    signup: {
      data: {
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        role: 'user'
      },
      errors: {},
      touched: {},
      isValid: false,
      isSubmitting: false
    },
    businessApplication: {
      data: {
        businessName: '',
        businessType: '',
        gstNumber: '',
        fssaiNumber: '',
        businessAddress: '',
        businessPhone: '',
        businessEmail: ''
      },
      errors: {},
      touched: {},
      isValid: false,
      isSubmitting: false
    },
    profile: {
      data: {
        firstName: '',
        lastName: '',
        phone: '',
        address: {
          street: '',
          city: '',
          state: '',
          pincode: ''
        },
        dateOfBirth: '',
        gender: ''
      },
      errors: {},
      touched: {},
      isValid: false,
      isSubmitting: false
    },
    payment: {
      data: {
        method: '',
        cardNumber: '',
        cvv: '',
        upiApp: '',
        cardType: ''
      },
      errors: {},
      touched: {},
      isValid: false,
      isSubmitting: false
    },
    address: {
      data: {
        street: '',
        city: '',
        state: '',
        pincode: ''
      },
      errors: {},
      touched: {},
      isValid: false,
      isSubmitting: false
    }
  });

  // Validation rules
  const validationRules = {
    email: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) return 'Email is required';
      if (!emailRegex.test(value)) return 'Please enter a valid email';
      return null;
    },
    phone: (value) => {
      const phoneRegex = /^[0-9]{10}$/;
      if (!value) return 'Phone number is required';
      if (!phoneRegex.test(value)) return 'Phone must be 10 digits';
      return null;
    },
    password: (value) => {
      if (!value) return 'Password is required';
      if (value.length < 6) return 'Password must be at least 6 characters';
      return null;
    },
    confirmPassword: (value, password) => {
      if (!value) return 'Please confirm your password';
      if (value !== password) return 'Passwords do not match';
      return null;
    },
    required: (value, fieldName) => {
      if (!value || value.trim() === '') return `${fieldName} is required`;
      return null;
    },
    username: (value) => {
      if (!value) return 'Username is required';
      if (value.length < 3) return 'Username must be at least 3 characters';
      if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
      return null;
    },
    gstNumber: (value) => {
      if (!value) return null; // Optional field
      if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value)) {
        return 'Please enter a valid GST number';
      }
      return null;
    },
    fssaiNumber: (value) => {
      if (!value) return null; // Optional field
      if (!/^[0-9]{14}$/.test(value)) return 'FSSAI number must be 14 digits';
      return null;
    },
    pincode: (value) => {
      if (!value) return 'Pincode is required';
      if (!/^[0-9]{6}$/.test(value)) return 'Pincode must be 6 digits';
      return null;
    },
    cardNumber: (value) => {
      if (!value) return 'Card number is required';
      if (!/^[0-9]{16}$/.test(value.replace(/\s/g, ''))) {
        return 'Please enter a valid 16-digit card number';
      }
      return null;
    },
    cvv: (value) => {
      if (!value) return 'CVV is required';
      if (!/^[0-9]{3,4}$/.test(value)) return 'CVV must be 3-4 digits';
      return null;
    }
  };

  // Update form data
  const updateFormData = useCallback((formName, field, value) => {
    setForms(prev => ({
      ...prev,
      [formName]: {
        ...prev[formName],
        data: {
          ...prev[formName].data,
          [field]: value
        },
        touched: {
          ...prev[formName].touched,
          [field]: true
        }
      }
    }));
  }, []);

  // Update nested form data (for objects like address)
  const updateNestedFormData = useCallback((formName, parentField, field, value) => {
    setForms(prev => ({
      ...prev,
      [formName]: {
        ...prev[formName],
        data: {
          ...prev[formName].data,
          [parentField]: {
            ...prev[formName].data[parentField],
            [field]: value
          }
        },
        touched: {
          ...prev[formName].touched,
          [`${parentField}.${field}`]: true
        }
      }
    }));
  }, []);

  // Validate a single field
  const validateField = useCallback((formName, field, value, rule, additionalData = null) => {
    let error = null;
    
    if (rule === 'email') {
      error = validationRules.email(value);
    } else if (rule === 'phone') {
      error = validationRules.phone(value);
    } else if (rule === 'password') {
      error = validationRules.password(value);
    } else if (rule === 'confirmPassword') {
      error = validationRules.confirmPassword(value, additionalData);
    } else if (rule === 'username') {
      error = validationRules.username(value);
    } else if (rule === 'gstNumber') {
      error = validationRules.gstNumber(value);
    } else if (rule === 'fssaiNumber') {
      error = validationRules.fssaiNumber(value);
    } else if (rule === 'pincode') {
      error = validationRules.pincode(value);
    } else if (rule === 'cardNumber') {
      error = validationRules.cardNumber(value);
    } else if (rule === 'cvv') {
      error = validationRules.cvv(value);
    } else if (rule === 'required') {
      error = validationRules.required(value, field);
    }

    setForms(prev => ({
      ...prev,
      [formName]: {
        ...prev[formName],
        errors: {
          ...prev[formName].errors,
          [field]: error
        }
      }
    }));

    return error;
  }, []);

  // Validate entire form
  const validateForm = useCallback((formName, validationSchema) => {
    const formData = forms[formName].data;
    const errors = {};

    Object.keys(validationSchema).forEach(field => {
      const { rule, additionalData } = validationSchema[field];
      const value = field.includes('.') 
        ? field.split('.').reduce((obj, key) => obj?.[key], formData)
        : formData[field];
      
      const error = validateField(formName, field, value, rule, additionalData);
      if (error) {
        errors[field] = error;
      }
    });

    const isValid = Object.keys(errors).length === 0;
    
    setForms(prev => ({
      ...prev,
      [formName]: {
        ...prev[formName],
        errors,
        isValid
      }
    }));

    return isValid;
  }, [forms, validateField]);

  // Set form submission state
  const setFormSubmitting = useCallback((formName, isSubmitting) => {
    setForms(prev => ({
      ...prev,
      [formName]: {
        ...prev[formName],
        isSubmitting
      }
    }));
  }, []);

  // Reset form
  const resetForm = useCallback((formName) => {
    setForms(prev => ({
      ...prev,
      [formName]: {
        data: {},
        errors: {},
        touched: {},
        isValid: false,
        isSubmitting: false
      }
    }));
  }, []);

  // Set form errors
  const setFormErrors = useCallback((formName, errors) => {
    setForms(prev => ({
      ...prev,
      [formName]: {
        ...prev[formName],
        errors
      }
    }));
  }, []);

  // Initialize form with data
  const initializeForm = useCallback((formName, initialData) => {
    setForms(prev => ({
      ...prev,
      [formName]: {
        ...prev[formName],
        data: { ...prev[formName].data, ...initialData },
        errors: {},
        touched: {},
        isValid: false,
        isSubmitting: false
      }
    }));
  }, []);

  // Get form state
  const getFormState = useCallback((formName) => {
    return forms[formName] || null;
  }, [forms]);

  // Check if form is valid
  const isFormValid = useCallback((formName) => {
    return forms[formName]?.isValid || false;
  }, [forms]);

  // Check if form is submitting
  const isFormSubmitting = useCallback((formName) => {
    return forms[formName]?.isSubmitting || false;
  }, [forms]);

  // Get form errors
  const getFormErrors = useCallback((formName) => {
    return forms[formName]?.errors || {};
  }, [forms]);

  // Get field error
  const getFieldError = useCallback((formName, field) => {
    return forms[formName]?.errors?.[field] || null;
  }, [forms]);

  // Check if field is touched
  const isFieldTouched = useCallback((formName, field) => {
    return forms[formName]?.touched?.[field] || false;
  }, [forms]);

  const value = {
    forms,
    updateFormData,
    updateNestedFormData,
    validateField,
    validateForm,
    setFormSubmitting,
    resetForm,
    setFormErrors,
    initializeForm,
    getFormState,
    isFormValid,
    isFormSubmitting,
    getFormErrors,
    getFieldError,
    isFieldTouched,
    validationRules
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
}; 