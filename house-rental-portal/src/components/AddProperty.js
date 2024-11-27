import React, { useState } from 'react';
import './AddProperty.css';

function AddProperty() {
  const [property, setProperty] = useState({
    name: '',
    district: '',
    location: '',
    price: '',
    roomsAvailable: '',
    bathrooms: '',
    electricityBillPaidBy: 'owner',
    ownerPhoneNumber: '',
    ownerEmail: '',
    ownerArea: '',
    parking: false,
    groundWaterSupply: false,
    description: '',
    images: null
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProperty({
      ...property,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
   
    setProperty({
      ...property,
      images: e.target.files[0] 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to add a property');
      return;
    }
  
   
  
  

// Loop through the keys of the object

const formData = new FormData();
Object.keys(property).forEach((key) => {
    if (key === 'image' && property[key]) {
        formData.append('image', property[key]); // Add file
    } else {
        formData.append(key, property[key]); // Add other fields
    }
});
console.log('FormData fields:');
  formData.forEach((value, key) => {
    console.log(`${key}:`, value); 
  });

  
   
  
    try {
      const response = await fetch('http://localhost:5000/api/properties', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          
        },
        body:formData, 
      });
      
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Property added successfully!');
        
        setProperty({
          name: '',
          district: '',
          location: '',
          price: '',
          roomsAvailable: '',
          bathrooms: '',
          electricityBillPaidBy: 'owner',
          ownerPhoneNumber: '',
          ownerEmail: '',
          ownerArea: '',
          parking: false,
          groundWaterSupply: false,
          description: '',
          images: null 
        });
        document.querySelector('input[type="file"]').value = '';
      } else {
        alert(`Failed to add property: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error adding property:', error);
      alert(`Error adding property: ${error.message}`);
    }
  };
  
  
  return (
    <div className="add-property">
      <h2>Add a New Property</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Property Name:
          <input
            type="text"
            name="name"
            value={property.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          District:
          <input
            type="text"
            name="district"
            value={property.district}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={property.location}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={property.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Rooms Available:
          <input
            type="number"
            name="roomsAvailable"
            value={property.roomsAvailable}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Bathrooms:
          <input
            type="number"
            name="bathrooms"
            value={property.bathrooms}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Electricity Bill Paid By:
          <select
            name="electricityBillPaidBy"
            value={property.electricityBillPaidBy}
            onChange={handleChange}
            required
          >
            <option value="owner">Owner</option>
            <option value="customer">Customer</option>
          </select>
        </label>
        <label>
          Owner Phone Number:
          <input
            type="tel"
            name="ownerPhoneNumber"
            value={property.ownerPhoneNumber}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Owner Email:
          <input
            type="email"
            name="ownerEmail"
            value={property.ownerEmail}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Owner Area:
          <input
            type="text"
            name="ownerArea"
            value={property.ownerArea}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Parking Available:
          <input
            type="checkbox"
            name="parking"
            checked={property.parking}
            onChange={handleChange}
          />
        </label>
        <label>
          Ground Water Supply:
          <input
            type="checkbox"
            name="groundWaterSupply"
            checked={property.groundWaterSupply}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={property.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Property Image:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
}

export default AddProperty;
