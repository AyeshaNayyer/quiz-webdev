function customerMiddleware(req, res, next) {
    if (req.user && req.user.role === "user") {
        next();
    } else {
        return res.status(403).json({ msg: "Forbidden: Access denied!" });
    }
}

module.exports = customerMiddleware;
