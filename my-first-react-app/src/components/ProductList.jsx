import { useState } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'MacBook Pro',
      price: 1999.99,
      category: 'Electronics',
      inStock: true,
    },
    {
      id: 2,
      name: 'iPhone 15',
      price: 999.99,
      category: 'Electronics',
      inStock: true,
    },
    {
      id: 3,
      name: 'AirPods',
      price: 249.99,
      category: 'Audio',
      inStock: false,
    },
    {
      id: 4,
      name: 'iPad Air',
      price: 599.99,
      category: 'Tablets',
      inStock: true,
    },
    {
      id: 5,
      name: 'Apple Watch',
      price: 399.99,
      category: 'Wearables',
      inStock: false,
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0.0,
    category: '',
    inStock: false,
  });

  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const addProduct = () => {
    if (
      newProduct.name.trim() &&
      newProduct.price &&
      newProduct.category &&
      newProduct.inStock
    ) {
      const product = {
        id: crypto.randomUUID,
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        category: newProduct.category,
        inStock: newProduct.inStock,
      };

      setProducts([...products, product]);
      setNewProduct({ name: '', price: 0.0, category: '', inStock: false });
    }
  };

  const removeProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const toggleStockStatus = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, inStock: !product.inStock } : product
      )
    );
  };

  const filteredProducts = products.filter((product) => {
    if (filter === 'inStock') return product.inStock;
    if (filter === 'outOfStock') return !product.inStock;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'category') return a.category.localeCompare(b.category);
    return 0;
  });

  const totalProducts = products.length;
  const inStockCount = products.filter((product) => product.inStock).length;
  const outOfStockCount = totalProducts - inStockCount;

  return (
    <div className="product-list">
      <h3>Product Managment</h3>
      <div className="add-product-form">
        <h4>Add New Product</h4>
        <div className="form-row">
          <input
            type="text"
            placeholder="Product name..."
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="form-input"
          />
          <input
            type="number"
            placeholder="Price..."
            value={newProduct.price}
            min="0"
            step="0.01"
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="form-input"
          />

          <select
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="form-input"
          >
            <option value="Electronics"> Electronics</option>
            <option value="Audio"> Audio</option>
            <option value="Tablets"> Tablets</option>
            <option value="Electronics"> Wearables</option>
            <option value="Accesories"> Accesories</option>
          </select>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={newProduct.inStock}
              onChange={(e) =>
                setNewProduct({ ...newProduct, inStock: e.target.checked })
              }
            />
            In Stock
          </label>
          <button onClick={addProduct} className="btn btn-success">
            Add Product
          </button>
        </div>
      </div>

      <div className="product-controls">
        <div className="control-group">
          <label>Filter:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Products ({totalProducts})</option>
            <option value="inStock">In Stock: ({inStockCount})</option>
            <option value="outOfStock">Out of Stock ({outOfStockCount})</option>
          </select>
        </div>
        <div className="control-group">
          <label>Sort By:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="empty-state">
          <h4>No products found</h4>
          <p>
            {filter === 'inStock'
              ? 'There are no products in stock. Try changing the filter.'
              : filter === 'outOfStock'
              ? 'All products are in stock! 🎉'
              : 'No products available. Add some products using the form above!'}
          </p>
        </div>
      ) : (
        <div className="products-grid">
          <div className="products-header">
            <span>Product</span>
            <span>Category</span>
            <span>Price</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className={`product-item ${
                !product.inStock ? 'out-of-stock' : ''
              }`}
            >
              <span className="product-name">{product.name}</span>
              <span className="product-category">{product.category}</span>
              <span className="product-price">{product.price.toFixed(2)}</span>
              <span
                className={`stock-status ${
                  product.inStock ? '✅ in-stock' : '❌ out-of-stock'
                }`}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
              <div className="product-actions">
                <button
                  onClick={() => toggleStockStatus(product.id)}
                  className="btn btn-small btn-warning"
                >
                  {product.inStock ? 'Mark Out' : 'Mark In'}
                </button>
                <button
                  onClick={() => removeProduct(product.id)}
                  className="btn btn-small btn-danger"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="product-stats">
        <h4>Product Statistics</h4>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">{totalProducts}</span>
            <span className="stat-label">Total Products</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{inStockCount}</span>
            <span className="stat-label">In Stock</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{outOfStockCount}</span>$
            <span className="stat-label">Out of Stock</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              $
              {products
                .reduce((total, product) => total + product.price, 0)
                .toFixed(2)}
            </span>
            <span className="stat-label">Total Value</span>
          </div>
        </div>
      </div>
    </div>
  );
}
