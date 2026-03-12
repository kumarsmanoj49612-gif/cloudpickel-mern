const authorizeRoles = (...roles) => {
    return (req, res, next) => {

        // Make sure protect middleware already ran
        if (!req.user) {
          console.log("hjghgfhgh",req.user);
            return res.status(401).json({ message: "Not authorized, user not found" });
        }

        // Check if user role is allowed
        if (!roles.includes(req.user.role)) {
          console.log("hellohgbg",req.user.role);
            return res.status(403).json({
                message: `Access denied.`
            });
        }

        next();
    };
};

module.exports = authorizeRoles;
