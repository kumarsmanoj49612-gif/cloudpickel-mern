const authorizeRoles = (...roles) => {


    const adminOnly = (req, res, next) => {
        if (req.user && req.user.role === 'admin') {
            next(); 
        } else {
            res.status(403).json({ message: 'Access denied. Admins only.' });
        }
    };
    return (req, res, next) => {

        if (!req.user) {
          console.log("hjghgfhgh",req.user);
            return res.status(401).json({ message: "Not authorized, user not found" });
        }

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



// module.exports = adminOnly;
