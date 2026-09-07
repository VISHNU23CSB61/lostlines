const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {

    const authHeader = req.headers.authorization;

    // Missing or malformed Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Authentication required"
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Authentication required"
        });
    }

    try {

        const verified = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = verified;

        next();

    } catch (err) {

        // Expired, malformed or invalid token.
        // Do not leak the reason or any internal details.
        return res.status(401).json({
            message: "Invalid or expired token"
        });

    }

}

module.exports = authMiddleware;