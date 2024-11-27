// authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

   
    const token = authHeader && authHeader.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({ error: 'Bearer token missing from Authorization header' });
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded); 
        
        
        req.user = decoded;
        
        
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};

module.exports = { verifyToken };
