const jwt = require("jsonwebtoken");

require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).json({ "info": "A token is required for authentication" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        // console.log(decoded)
    } catch (err) {
        return res.status(401).json({ "info": "Invalid Token", "success": false });
    }
    return next();
};

module.exports = verifyToken;
