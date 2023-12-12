// components/ProductDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';


const ProductDetails = () => {
  const { id } = useParams(); // Extracting the 'id' parameter from the URL

  // Simulated product details fetching based on the 'id'
  const product = { id: id, name: `Product ${id}`, price: 15 }; // Replace this with your product fetching logic

  return (
    <div>
      <h2>Product Details</h2>
      <p>ID: {product.id}</p>
      <p>Name: {product.name}</p>
      <p>Price: ${product.price}</p>
      {/* Other product details can be displayed here */}
    </div>
  );
};

export default ProductDetails;
