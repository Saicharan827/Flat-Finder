import React, { useState, useEffect } from 'react';
import './Wishlist.css';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    
    const token = localStorage.getItem('token');
  
    if (!token) {
      alert('Please log in to add properties to your wishlist.');
      return;
    }
  
    const fetchWishlist = async () => {
      try {
        const response = await fetch('https://flat-finder-qnkc.onrender.com/api/wishlist', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
        }); 
        if (!response.ok) {
          throw new Error('Failed to fetch wishlist');
        }

        const data = await response.json();
        setWishlist(data); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchWishlist(); 
  }, []); 
  if (loading) {
    return <div className="loading">Loading your wishlist...</div>;
  }

  if (error) {
    return <div className="error">{`Error: ${error}`}</div>;
  }

  if (wishlist.length === 0) {
    return <div>No properties added to your wishlist yet.</div>;
  }

  return (
    <div>
      <h2>Your Wishlist</h2>
      <div className="wishlist-container">
        {wishlist.map((property) => (
          <div key={property._id} className="wishlist-item">
            <img src={`https://flat-finder-qnkc.onrender.com${property.images}`} alt={property.name} className="wishlist-image" />
            <div className="wishlist-info">
              <h3>{property.name}</h3>
              <p><strong>Location:</strong> {property.location}</p>
              <p><strong>Price:</strong> ₹{property.price}</p>
              <p><strong>Rooms Available:</strong> {property.roomsAvailable} BHK</p>
              <p><strong>Description:</strong> {property.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
