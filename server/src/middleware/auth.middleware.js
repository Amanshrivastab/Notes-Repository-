const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        console.log("AUTH HEADER:", authHeader);

        if (!authHeader) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        const token = authHeader.split(" ")[1];

        console.log("TOKEN:", token);
        console.log("JWT SECRET EXISTS:", !!process.env.JWT_SECRET);

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("DECODED:", decoded);

        req.user = decoded;

        next();

    } catch (error) {
        console.log("JWT ERROR:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token",
            error: error.message
        });
    }
};

module.exports = authMiddleware;