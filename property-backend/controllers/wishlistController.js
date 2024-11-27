

const User = require('../models/User');  
const Property = require('../models/Property');


exports.addToWishlist = async (req, res) => {
    const userId = req.user.userId;  
    console.log(userId);
    const { propertyId } = req.body;  
    if (!propertyId) {
        return res.status(400).json({ error: 'Property ID is required' });
    }

    try {
        
        const user = await User.findById(userId);
        const property = await Property.findById(propertyId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        
        if (user.wishlist.includes(propertyId)) {
            return res.status(400).json({ error: 'Property already in wishlist' });
        }

        
        user.wishlist.push(propertyId);
        await user.save();

        
        res.status(200).json({ message: 'Property added to wishlist', wishlist: user.wishlist });

    } catch (error) {
        console.error('Error adding property to wishlist:', error);
        res.status(500).json({ error: 'Failed to add property to wishlist' });
    }
};


exports.getWishlist = async (req, res) => {
    const userId = req.user.userId; 

    try {
        
        const user = await User.findById(userId).populate('wishlist');
        
        if (!user || !user.wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }


        res.status(200).json(user.wishlist);
    } catch (error) {
        console.error("Error retrieving wishlist:", error);
        res.status(500).json({ error: 'Failed to retrieve wishlist' });
    }
};



exports.removeFromWishlist = async (req, res) => {
    const userId = req.user.userId; 
    const { propertyId } = req.body; 

    try {
        
        const user = await User.findById(userId);
        
        if (!user || !user.wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        
        const propertyIndex = user.wishlist.indexOf(propertyId);
        if (propertyIndex === -1) {
            return res.status(404).json({ message: 'Property not found in wishlist' });
        }

        
        user.wishlist.splice(propertyIndex, 1);
        await user.save();

        res.status(200).json({ message: 'Property removed from wishlist', wishlist: user.wishlist });
    } catch (error) {
        console.error("Error removing property from wishlist:", error);
        res.status(500).json({ error: 'Failed to remove property from wishlist' });
    }
};

