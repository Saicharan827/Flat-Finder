// propertyRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const { getAllProperties, addProperty, getPropertyById, updateProperty, deleteProperty } = require('../controllers/propertyController');
const { addToWishlist, getWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware'); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); 
    }
  });
  
  const upload = multer({ storage: storage });
router.post('/', verifyToken,upload.single('images'), addProperty);
router.get('/', getAllProperties);      
router.get('/:id', getPropertyById);     
router.put('/:id', updateProperty);      
router.delete('/:id', deleteProperty);  
router.post('/add', verifyToken, addToWishlist);
router.get('/', verifyToken, getWishlist);
router.delete('/remove', verifyToken, removeFromWishlist);


module.exports = router;
