const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ status: 'error', message: 'Access denied. No token provided.' });
    }

    try {
        req.user = null;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded) {
            req.user = decoded; 
        }
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ status: 'error', message: 'Token has expired.' });
        }

        return res.status(400).json({ status: 'error', message: 'Invalid token.' });
    }
}

module.exports = authenticate;