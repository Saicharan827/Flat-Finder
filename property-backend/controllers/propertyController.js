const Property = require('../models/Property');




exports.getAllProperties = async (req, res) => {
    const { price, location, roomsAvailable } = req.query;
    let filter = {};

    if (price) {
        if (price.startsWith('lte')) {
            const parsedPrice = parseFloat(price.replace('lte', ''));
            if (!isNaN(parsedPrice)) filter.price = { $lte: parsedPrice };
        } else if (price.startsWith('lt')) {
            const parsedPrice = parseFloat(price.replace('lt', ''));
            if (!isNaN(parsedPrice)) filter.price = { $lt: parsedPrice };
        } else {
            const parsedPrice = parseFloat(price);
            if (!isNaN(parsedPrice)) filter.price = { $lte: parsedPrice };
        }
    }

    if (location) filter.location = { $regex: location, $options: 'i' };
    if (roomsAvailable) filter.roomsAvailable = roomsAvailable;

    try {
        const properties = await Property.find(filter);
        res.json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ error: 'Failed to retrieve properties' });
    }
};


exports.addProperty = async (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file); 

    const {
        name, district, location, price, roomsAvailable, bathrooms,
        electricityBillPaidBy, ownerPhoneNumber, ownerEmail, ownerArea,
        parking, groundWaterSupply, description
    } = req.body;

    const images = req.file ? `/uploads/${req.file.filename}` : null;
    console.log('Extracted Price:', price);
    console.log('Extracted Image Path:', images);

    try {
        
        if (!name || !district || !location || !price || !roomsAvailable ||
            !bathrooms || !ownerPhoneNumber || !ownerEmail || !ownerArea) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        
        const propertyData = await Property.create({
            name,
            district,
            location,
            price,
            roomsAvailable,
            bathrooms,
            electricityBillPaidBy,
            ownerDetails: {
                phoneNumber: ownerPhoneNumber,
                email: ownerEmail,
                area: ownerArea,
            },
            parking,
            groundWaterSupply,
            description,
            images
        });

        res.status(200).json({ message: 'Property added successfully', property: propertyData });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




exports.getPropertyById = async (req, res) => {
    try {
        const propertyId = req.params.id;
        const property = await Property.findById(propertyId);
    
        if (!property) {
          return res.status(404).json({ message: 'Property not found' });
        }
    
       
        res.json(property);
      } catch (err) {
        console.error('Error fetching property:', err);
        res.status(500).json({ message: 'Server error' });
      }
    };


exports.updateProperty = async (req, res) => {
    try {
        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProperty);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update property' });
    }
};


exports.deleteProperty = async (req, res) => {
    try {
        await Property.findByIdAndDelete(req.params.id);
        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete property' });
    }
};
exports.getImageById = (req, res) => {
    const { fileId } = req.params; 
  
    try {
      const objectId = new mongoose.Types.ObjectId(fileId);
  
      const downloadStream = bucket.openDownloadStream(objectId);
  
      downloadStream.on('data', (chunk) => {
        res.write(chunk);
      });
  
      downloadStream.on('end', () => {
        res.end();
      });
  
      downloadStream.on('error', (err) => {
        res.status(404).send({ error: 'Image not found' });
      });
    } catch (error) {
      res.status(500).send({ error: 'Failed to retrieve image' });
    }
  };