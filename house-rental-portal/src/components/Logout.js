import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ setIsLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
    console.log("logged")
  }, [setIsLoggedIn, navigate]);

  return <div>Logging out...</div>;
}

export default Logout;
