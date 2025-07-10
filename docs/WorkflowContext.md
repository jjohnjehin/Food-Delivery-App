# WorkflowContext Documentation

## Overview

The `WorkflowContext` is a global state management system that provides centralized control over categories, tags, workflow states, and business logic across the food delivery application. It serves as a single source of truth for all categorization, tagging, and workflow management.

## Table of Contents

1. [Installation & Setup](#installation--setup)
2. [Core Concepts](#core-concepts)
3. [API Reference](#api-reference)
4. [Usage Examples](#usage-examples)
5. [Data Structure](#data-structure)
6. [Best Practices](#best-practices)
7. [Migration Guide](#migration-guide)
8. [Troubleshooting](#troubleshooting)

## Installation & Setup

### 1. Import the Provider

```javascript
import { WorkflowProvider } from './context/WorkflowContext';
```

### 2. Wrap Your App

```javascript
function App() {
  return (
    <AuthProvider>
      <FormProvider>
        <WorkflowProvider>
          <BrowserRouter>
            {/* Your app components */}
          </BrowserRouter>
        </WorkflowProvider>
      </FormProvider>
    </AuthProvider>
  );
}
```

### 3. Use in Components

```javascript
import { useWorkflow } from '../context/WorkflowContext';

function MyComponent() {
  const { getAllCategories, getTagById, formatPrice } = useWorkflow();
  // Use workflow functions
}
```

## Core Concepts

### 1. Categories
Categories represent the main classification system for products and services.

**Structure:**
```javascript
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
        tags: ['margherita', 'pepperoni', 'vegetarian'],
        attributes: ['size', 'crust', 'toppings'],
        popular: true
      }
    }
  }
}
```

### 2. Tags
Tags provide additional metadata and filtering capabilities.

**Structure:**
```javascript
tags: {
  dietary: {
    vegetarian: { 
      id: 'vegetarian', 
      name: 'Vegetarian', 
      icon: '🥬', 
      color: '#4caf50' 
    }
  },
  spice_level: {
    mild: { 
      id: 'mild', 
      name: 'Mild', 
      icon: '🌶️', 
      color: '#4caf50' 
    }
  }
}
```

### 3. Workflow States
Workflow states manage the lifecycle of different entities.

**Structure:**
```javascript
workflowStates: {
  product: {
    draft: { id: 'draft', name: 'Draft', color: '#9e9e9e', icon: '📝' },
    approved: { id: 'approved', name: 'Approved', color: '#4caf50', icon: '✅' }
  }
}
```

## API Reference

### Core Functions

#### `getAllCategories()`
Returns all categories (main and subcategories) as a flat array.

```javascript
const categories = getAllCategories();
// Returns: [Category1, Category2, ...]
```

#### `getCategoryById(categoryId)`
Retrieves a category by its ID.

```javascript
const category = getCategoryById('pizza');
// Returns: { id: 'pizza', name: 'Pizza', ... }
```

#### `getSubcategoryById(subcategoryId)`
Retrieves a subcategory by its ID.

```javascript
const subcategory = getSubcategoryById('margherita');
// Returns: { id: 'margherita', name: 'Margherita', ... }
```

#### `getAllTags()`
Returns all tags as a flat array.

```javascript
const tags = getAllTags();
// Returns: [Tag1, Tag2, ...]
```

#### `getTagById(tagId)`
Retrieves a tag by its ID.

```javascript
const tag = getTagById('vegetarian');
// Returns: { id: 'vegetarian', name: 'Vegetarian', ... }
```

#### `getWorkflowState(type, stateId)`
Retrieves a workflow state.

```javascript
const state = getWorkflowState('product', 'approved');
// Returns: { id: 'approved', name: 'Approved', color: '#4caf50', icon: '✅' }
```

### Search Functions

#### `searchCategories(query)`
Searches categories by name or description.

```javascript
const results = searchCategories('pizza');
// Returns: [Pizza category, ...]
```

#### `searchTags(query)`
Searches tags by name.

```javascript
const results = searchTags('vegetarian');
// Returns: [Vegetarian tag, ...]
```

### Category & Tag Functions

#### `getTagsByCategory(categoryId)`
Returns all tags associated with a category.

```javascript
const tags = getTagsByCategory('pizza');
// Returns: ['margherita', 'pepperoni', 'vegetarian', ...]
```

#### `getAttributesByCategory(categoryId)`
Returns all attributes for a category.

```javascript
const attributes = getAttributesByCategory('pizza');
// Returns: ['size', 'crust', 'toppings']
```

#### `getPopularCategories()`
Returns only popular categories.

```javascript
const popular = getPopularCategories();
// Returns: [Popular categories only]
```

### Validation & Formatting

#### `validateProductData(productData)`
Validates product data against workflow rules.

```javascript
const errors = validateProductData({
  dish_name: 'Margherita Pizza',
  price: 299,
  category: 'pizza'
});
// Returns: [] (no errors) or ['Error message 1', 'Error message 2']
```

#### `formatPrice(price, currency)`
Formats price with currency symbol.

```javascript
const formatted = formatPrice(299.99);
// Returns: "₹299.99"
```

#### `formatDate(date)`
Formats date according to global settings.

```javascript
const formatted = formatDate(new Date());
// Returns: "25/12/2023"
```

## Usage Examples

### 1. Product Management

```javascript
import { useWorkflow } from '../context/WorkflowContext';

function ProductForm() {
  const { 
    getAllCategories, 
    getTagsByCategory, 
    validateProductData,
    formatPrice 
  } = useWorkflow();

  const handleSubmit = (productData) => {
    // Validate using workflow
    const errors = validateProductData(productData);
    if (errors.length > 0) {
      console.error('Validation errors:', errors);
      return;
    }

    // Get available tags for the category
    const tags = getTagsByCategory(productData.category);
    
    // Format price
    const formattedPrice = formatPrice(productData.price);
    
    // Submit product
    submitProduct(productData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### 2. Category Filtering

```javascript
function CategoryFilter() {
  const { getAllCategories, getPopularCategories } = useWorkflow();
  
  const allCategories = getAllCategories();
  const popularCategories = getPopularCategories();

  return (
    <div>
      <h3>All Categories</h3>
      {allCategories.map(category => (
        <Chip key={category.id} label={category.name} />
      ))}
      
      <h3>Popular Categories</h3>
      {popularCategories.map(category => (
        <Chip key={category.id} label={category.name} color="primary" />
      ))}
    </div>
  );
}
```

### 3. Tag Management

```javascript
function TagSelector({ categoryId, selectedTags, onTagsChange }) {
  const { getTagsByCategory, getTagById } = useWorkflow();
  
  const availableTags = getTagsByCategory(categoryId);
  
  const handleTagToggle = (tagId) => {
    const newTags = selectedTags.includes(tagId)
      ? selectedTags.filter(id => id !== tagId)
      : [...selectedTags, tagId];
    onTagsChange(newTags);
  };

  return (
    <div>
      {availableTags.map(tagId => {
        const tag = getTagById(tagId);
        return (
          <Chip
            key={tag.id}
            label={tag.name}
            icon={tag.icon}
            color={selectedTags.includes(tag.id) ? 'primary' : 'default'}
            onClick={() => handleTagToggle(tag.id)}
          />
        );
      })}
    </div>
  );
}
```

### 4. Workflow State Management

```javascript
function ProductStatus({ productId, currentState }) {
  const { getWorkflowState } = useWorkflow();
  
  const state = getWorkflowState('product', currentState);
  
  return (
    <Chip
      label={state.name}
      icon={state.icon}
      sx={{ backgroundColor: state.color, color: 'white' }}
    />
  );
}
```

## Data Structure

### Category Structure
```javascript
{
  id: 'string',           // Unique identifier
  name: 'string',         // Display name
  description: 'string',  // Detailed description
  icon: 'string',         // Emoji or icon
  subcategories: {        // Nested subcategories
    [subcategoryId]: {
      id: 'string',
      name: 'string',
      description: 'string',
      icon: 'string',
      tags: ['string'],     // Associated tag IDs
      attributes: ['string'], // Category attributes
      popular: boolean       // Popularity flag
    }
  }
}
```

### Tag Structure
```javascript
{
  id: 'string',        // Unique identifier
  name: 'string',      // Display name
  icon: 'string',      // Emoji or icon
  color: 'string'      // Hex color code
}
```

### Workflow State Structure
```javascript
{
  id: 'string',        // Unique identifier
  name: 'string',      // Display name
  color: 'string',     // Hex color code
  icon: 'string'       // Emoji or icon
}
```

## Best Practices

### 1. Performance Optimization
```javascript
// ❌ Don't call functions in render
function BadExample() {
  const { getAllCategories } = useWorkflow();
  const categories = getAllCategories(); // Called on every render
  
  return <div>{categories.map(...)}</div>;
}

// ✅ Use useMemo for expensive operations
function GoodExample() {
  const { getAllCategories } = useWorkflow();
  const categories = useMemo(() => getAllCategories(), []);
  
  return <div>{categories.map(...)}</div>;
}
```

### 2. Error Handling
```javascript
function SafeCategoryDisplay({ categoryId }) {
  const { getCategoryById } = useWorkflow();
  
  const category = getCategoryById(categoryId);
  
  if (!category) {
    return <div>Category not found</div>;
  }
  
  return <div>{category.name}</div>;
}
```

### 3. Validation
```javascript
function ProductForm() {
  const { validateProductData } = useWorkflow();
  
  const handleSubmit = (data) => {
    const errors = validateProductData(data);
    if (errors.length > 0) {
      // Handle validation errors
      return;
    }
    // Proceed with submission
  };
}
```

## Migration Guide

### From Hardcoded Categories
```javascript
// ❌ Old way
const categories = ["Pizza", "Burger", "Pasta"];

// ✅ New way
const { getAllCategories } = useWorkflow();
const categories = getAllCategories().map(cat => cat.name);
```

### From Manual Price Formatting
```javascript
// ❌ Old way
const price = `₹${product.price}`;

// ✅ New way
const { formatPrice } = useWorkflow();
const price = formatPrice(product.price);
```

### From Manual Validation
```javascript
// ❌ Old way
const validateProduct = (product) => {
  const errors = [];
  if (!product.name) errors.push('Name required');
  if (!product.price) errors.push('Price required');
  return errors;
};

// ✅ New way
const { validateProductData } = useWorkflow();
const errors = validateProductData(product);
```

## Troubleshooting

### Common Issues

#### 1. "useWorkflow must be used within a WorkflowProvider"
**Solution:** Ensure your component is wrapped with `WorkflowProvider`.

```javascript
// In App.js
<WorkflowProvider>
  <YourComponent />
</WorkflowProvider>
```

#### 2. Categories not loading
**Solution:** Check if the workflow state is properly initialized.

```javascript
const { workflowState } = useWorkflow();
console.log('Categories:', workflowState.categories);
```

#### 3. Tags not found
**Solution:** Verify tag ID exists in the workflow.

```javascript
const { getTagById } = useWorkflow();
const tag = getTagById('nonexistent-tag');
if (!tag) {
  console.log('Tag not found');
}
```

### Debug Mode
```javascript
// Enable debug logging
const { workflowState } = useWorkflow();
console.log('Workflow State:', workflowState);
```

## Contributing

### Adding New Categories
1. Update the `categories` object in `WorkflowContext.js`
2. Add appropriate tags and attributes
3. Test with existing components

### Adding New Tags
1. Add to the appropriate tag group in `WorkflowContext.js`
2. Update category associations if needed
3. Test tag filtering functionality

### Adding New Workflow States
1. Add to the `workflowStates` object
2. Define appropriate colors and icons
3. Update components that use workflow states

## Support

For questions or issues:
- Check the troubleshooting section
- Review the API reference
- Test with the provided examples
- Contact the development team

---

**Version:** 1.0.0  
**Last Updated:** December 2023  
**Maintainer:** Development Team 