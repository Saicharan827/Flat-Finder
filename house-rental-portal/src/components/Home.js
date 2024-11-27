import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import './Home.css';
import { Link } from 'react-router-dom';


function Home() {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    roomsAvailable: '',
  });

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await fetch('http://localhost:5000/api/properties');
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    }
    fetchProperties();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleAddToWishlist = async (propertyId) => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      alert('Please log in to add properties to your wishlist.');
      return;
    }
  
    console.log("Property ID to be added to wishlist:", propertyId); 
    
    try {
      const response = await fetch('http://localhost:5000/api/wishlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ propertyId }), 
      });
      

      if (response.ok) {
        alert('Property added to wishlist successfully!');
      } else {
        const errorData = await response.json();
        alert(`Failed to add to wishlist: ${errorData.message || 'Unknown error'}`);
        console.error('Wishlist Error:', errorData); 
      }
    } catch (error) {
      alert(`Error adding to wishlist: ${error.message}`);
      console.error('Fetch Error:', error); 
    }
  };
  
  

  const filteredProperties = properties.filter((property) => {
    const matchesLocation = filters.location
      ? property.location.toLowerCase().includes(filters.location.toLowerCase())
      : true;
    const matchesMinPrice = filters.minPrice
      ? property.price >= Number(filters.minPrice)
      : true;
    const matchesMaxPrice = filters.maxPrice
      ? property.price <= Number(filters.maxPrice)
      : true;
    const matchesRooms = filters.roomsAvailable
      ? property.roomsAvailable === Number(filters.roomsAvailable)
      : true;

    return matchesLocation && matchesMinPrice && matchesMaxPrice && matchesRooms;
  });

  return (
    <div className="home">
      <h1>Find Your Perfect Rental Property</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="filters">
        <div className="filter-item">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
          />
        </div>

        <div className="filter-item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
        </div>

        <div className="filter-item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
        </div>

        <div className="filter-item">
          <label htmlFor="roomsAvailable">Rooms Available</label>
          <input
            type="number"
            id="roomsAvailable"
            name="roomsAvailable"
            value={filters.roomsAvailable}
            onChange={handleFilterChange}
          />
        </div>
      </div>
       <br />
      <div className="property-list">
        {filteredProperties.map((property) => (
          <div key={property.id} className="property-card">
            <img src={`http://localhost:5000${property.images}`} alt="House" className="property-image" />
            <div className="property-info">
              <h3>Location: {property.location}</h3>
              <p>Price: {property.price}</p>
              <p>Type: {property.roomsAvailable}BHK</p>
              

              <Link to={`/property/${property._id}`}>
               <button className="contact-button">View Details</button>
              </Link>
              <button 
                className="wishlist-button" 
                onClick={() => handleAddToWishlist(property._id)}
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <Footer />
    </div>
  );
}

export default Home;
