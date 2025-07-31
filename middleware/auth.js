const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key'; // יש להשתמש באותו מפתח סודי כמו ב-index.js

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // שמירת המידע מהטוקן על אובייקט הבקשה
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};