const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json("No Token Found")
    }

    const token = authHeader.split(" ")[1];

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next()
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports = authMiddleware 