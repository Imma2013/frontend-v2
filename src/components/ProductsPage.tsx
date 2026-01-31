import React from 'react';
import ProductCard from './ProductCard';

const products = [
  // Mock data - we'll replace this with real data later
  {
    id: 1,
    name: 'iPhone 13',
    price: 999,
    imageUrl: '/images/phones/iphone-13.jpg',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S22',
    price: 899,
    imageUrl: '/images/phones/samsung-galaxy-s22.jpg',
  },
];

const ProductsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;