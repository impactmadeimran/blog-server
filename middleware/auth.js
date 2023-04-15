const jwt = require("jsonwebtoken");

require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ "info": "A token is required for authentication" });
    }
    try {
        const bearer = token.split(' ');
        const bearerToken = bearer[1]
        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(decoded)
    } catch (err) {
        return res.status(401).json({ "info": "Invalid Token", "success": false });
    }
    return next();
};

module.exports = verifyToken;
