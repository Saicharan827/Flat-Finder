import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PropertyDetail.css';

function PropertyDetail() {
  const { id } = useParams(); 
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchProperty = async () => {
      try {
        if (!id) {
          throw new Error('Property ID is missing');
        }

        const response = await fetch(`http://localhost:5000/api/properties/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch property');
        }

        const data = await response.json();
        setProperty(data); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchProperty(); 
  }, [id]); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{`Error: ${error}`}</div>;
  }

  if (!property) {
    return <div>Property not found</div>; 
  }

  return (
    <div className="property-detail">
      {/* Property Information Section */}
      <div className="detail-info">
        <h2>{property.name}</h2>

        <p>
          <span>Location: </span>{property.location}
        </p>
        <p>
          <span>District: </span>{property.district}
        </p>
        <p>
          <span>Price: </span>₹{property.price}
        </p>
        <p>
          <span>Rooms: </span>{property.roomsAvailable} BHK
        </p>
        <p>
          <span>Bathrooms: </span>{property.bathrooms}
        </p>
        <p>
          <span>Electricity Bill Paid By: </span>{property.electricityBillPaidBy}
        </p>
        <p>
          <span>Owner Contact: </span>{property.ownerDetails?.phoneNumber}
        </p>
        <p>
          <span>Parking: </span>{property.parking ? 'Yes' : 'No'}
        </p>
        <p>
          <span>Ground Water Supply: </span>{property.groundWaterSupply ? 'Yes' : 'No'}
        </p>
        <p>
          <span>Description: </span>{property.description}
        </p>
      

      {/* Property Image Section */}
      <div className="property-image-container">
        <img
          src={`http://localhost:5000${property.images}`}
          alt="Property"
          className="property-image"
        />
      </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
