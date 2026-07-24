const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {

    console.log("==============");

    console.log("Headers:", req.headers);

    const authHeader = req.headers.authorization;

    console.log("Authorization:", authHeader);

    if (!authHeader) {
        return res.status(401).json({
            message: "Access Denied. No Token Provided."
        });
    }

    const token = authHeader.split(" ")[1];

    console.log("Token:", token);

    try {

        const verified = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("Verified:", verified);

        req.user = verified;

        next();

    } catch (err) {

        console.log("JWT ERROR:", err.message);

        return res.status(401).json({
            message: "Invalid Token"
        });

    }

}

module.exports = authMiddleware;