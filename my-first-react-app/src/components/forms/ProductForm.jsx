import { useState } from 'react';
import useForm from '../../hooks/useForm';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function ProductForm({ onAddProduct, initialProduct = null }) {
  const validateProduct = (form) => {
    const errors = {};

    if (!form.name.trim()) {
      errors.name = 'Product name is required';
    } else if (form.name.length < 2) {
      errors.name = 'Product name must be at least 2 characters';
    }

    if (!form.price) {
      errors.price = 'Price is required';
    } else if (parseFloat(form.price) <= 0) {
      errors.price = 'Price must be greater than 0';
    }

    if (!form.category) {
      errors.category = 'Category is required';
    }

    return errors;
  };

  const initialValues = initialProduct || {
    name: '',
    price: '',
    category: '',
    description: '',
    inStock: true,
  };

  const {
    form,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    resetForm,
  } = useForm(initialValues, validateProduct);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      alert('Please fix the errors before submitting');
      return;
    }

    setIsSubmitting(true);

    // Simular una llamada a API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const product = {
      id: initialProduct ? initialProduct.id : Date.now(),
      name: form.name.trim(),
      price: parseFloat(form.price),
      category: form.category,
      description: form.description,
      inStock: form.inStock,
      createdAt: initialProduct
        ? initialProduct.createdAt
        : new Date().toISOString(),
    };

    onAddProduct(product);

    if (!initialProduct) {
      resetForm();
    }

    setIsSubmitting(false);
    alert(initialProduct ? 'Product updated!' : 'Product added!');
  };

  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
  ];

  return (
    <div className="product-form">
      <h3> {initialProduct ? '✏️ Edit Product' : '🆕 Add New Product'}</h3>
      <form onSubmit={handleSubmit} className="form">
        <Input
          label="Product Name *"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          touched={touched.name}
          placeholder="Enter product name"
        />
        <Input
          label="Price *"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.price}
          touched={touched.price}
          placeholder="0.0"
          step="0.01"
          min="0"
        />

        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input ${
              errors.category && touched.category ? 'error' : ''
            } `}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && touched.category && (
            <span className="error-message">{errors.category}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            onBlur={handleBlur}
            rows="3"
            className="form-input"
            placeholder="Enter product description..."
          />
        </div>
        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="inStock"
              checked={form.inStock}
              onChange={handleChange}
              className="checkbox-input"
            />
            <span className="checkmark"></span>
            In Stock
          </label>
        </div>
        <div className="form-actions">
          <Button
            type="button"
            variant="secondary"
            onClick={resetForm}
            disabled={isSubmitting}
          >
            🔄 Reset
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            disabled={!isValid}
          >
            {initialProduct ? '💾 Update Product' : '➕ Add Product'}
          </Button>
        </div>
      </form>
    </div>
  );
}
