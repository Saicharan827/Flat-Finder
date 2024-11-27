// wishlistRoutes.js
const express = require('express');
const { addToWishlist, getWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/add', verifyToken, addToWishlist);

router.get('/', verifyToken, getWishlist);

router.delete('/remove', verifyToken, removeFromWishlist);

module.exports = router;
