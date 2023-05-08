import jwt from "jsonwebtoken";

const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    console.log(token);
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, config.JWT_KEY);
        req.user = decoded;
        if(req.isAdmin == false)
        {
            return res.status(403).send("You are not an Admin");
        }
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

export { verifyToken }