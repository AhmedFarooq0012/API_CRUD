const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Header se token nikalna
    const authHeader = req.header('Authorization');
    
    if (!authHeader) return res.status(401).json({ message: "Access Denied. No token provided." });

    try {
        // Bearer word ko remove karke sirf token lena
        const token = authHeader.split(" ")[1] || authHeader;
        
        // Token verify karna
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        // User ki ID request object mein save karna
        req.user = verified;
        next(); 
    } catch (err) {
        res.status(400).json({ message: "Invalid or Expired Token" });
    }
};

module.exports = verifyToken;
