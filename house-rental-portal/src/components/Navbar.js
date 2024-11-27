import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

function Navbar({ isLoggedIn }) { 
  return (
    <nav className="navbar">
      <div className="navbar-icon">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRClNecKeon2uko0y9xj4fK_EeYf95wdmNJwg&s" alt="Logo" height="40" width="40" /> {/* Replace with your icon */}
      </div>
       <h1 className='title'>flat finder</h1>
      <div className="navbar-links">
       
        <Link to="/">Home</Link>
        <Link to="/add-property">Add Property</Link>
        <Link to="/wishlist">Wishlist</Link>
        {isLoggedIn ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
