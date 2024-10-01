export const authenticate = (req, res, next) => {
    const token = req.cookies.authToken; // Get the token from cookies

    if (!token) {
        return res.status(401).send("Unauthorized");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        next();
    } catch (err) {
        return res.status(401).send("Unauthorized");
    }
};