# WorkflowContext Quick Reference

## 🚀 Quick Start

```javascript
import { useWorkflow } from '../context/WorkflowContext';

function MyComponent() {
  const { getAllCategories, getTagById, formatPrice } = useWorkflow();
  // Use workflow functions
}
```

## 📋 Most Used Functions

### Categories
```javascript
const { getAllCategories, getCategoryById, getPopularCategories } = useWorkflow();

// Get all categories
const categories = getAllCategories();

// Get specific category
const category = getCategoryById('pizza');

// Get popular categories only
const popular = getPopularCategories();
```

### Tags
```javascript
const { getAllTags, getTagById, getTagsByCategory } = useWorkflow();

// Get all tags
const tags = getAllTags();

// Get specific tag
const tag = getTagById('vegetarian');

// Get tags for a category
const categoryTags = getTagsByCategory('pizza');
```

### Validation & Formatting
```javascript
const { validateProductData, formatPrice, formatDate } = useWorkflow();

// Validate product
const errors = validateProductData(productData);

// Format price
const price = formatPrice(299.99); // "₹299.99"

// Format date
const date = formatDate(new Date()); // "25/12/2023"
```

## 🏗️ Data Structure

### Category
```javascript
{
  id: 'pizza',
  name: 'Pizza',
  description: 'Italian pizza varieties',
  icon: '🍕',
  tags: ['margherita', 'pepperoni'],
  attributes: ['size', 'crust'],
  popular: true
}
```

### Tag
```javascript
{
  id: 'vegetarian',
  name: 'Vegetarian',
  icon: '🥬',
  color: '#4caf50'
}
```

### Workflow State
```javascript
{
  id: 'approved',
  name: 'Approved',
  color: '#4caf50',
  icon: '✅'
}
```

## 🔍 Search Functions

```javascript
const { searchCategories, searchTags } = useWorkflow();

// Search categories
const results = searchCategories('pizza');

// Search tags
const tagResults = searchTags('vegetarian');
```

## ⚡ Common Patterns

### Category Filtering
```javascript
function CategoryFilter() {
  const { getAllCategories } = useWorkflow();
  const categories = getAllCategories();
  
  return (
    <div>
      {categories.map(category => (
        <Chip key={category.id} label={category.name} />
      ))}
    </div>
  );
}
```

### Tag Selection
```javascript
function TagSelector({ categoryId, selectedTags, onTagsChange }) {
  const { getTagsByCategory, getTagById } = useWorkflow();
  const availableTags = getTagsByCategory(categoryId);
  
  return (
    <div>
      {availableTags.map(tagId => {
        const tag = getTagById(tagId);
        return (
          <Chip
            key={tag.id}
            label={tag.name}
            onClick={() => onTagsChange([...selectedTags, tag.id])}
          />
        );
      })}
    </div>
  );
}
```

### Product Validation
```javascript
function ProductForm() {
  const { validateProductData } = useWorkflow();
  
  const handleSubmit = (data) => {
    const errors = validateProductData(data);
    if (errors.length > 0) {
      console.error('Validation errors:', errors);
      return;
    }
    // Submit product
  };
}
```

## 🛠️ Troubleshooting

### Provider Error
```javascript
// Error: "useWorkflow must be used within a WorkflowProvider"
// Solution: Wrap your app with WorkflowProvider
<WorkflowProvider>
  <YourApp />
</WorkflowProvider>
```

### Debug Mode
```javascript
const { workflowState } = useWorkflow();
console.log('Workflow State:', workflowState);
```

## 📚 Full Documentation

For complete documentation, see: [WorkflowContext.md](./WorkflowContext.md)

---

**Need help?** Check the full documentation or contact the development team. 