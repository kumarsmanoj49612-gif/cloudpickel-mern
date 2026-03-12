const jwt = require('jsonwebtoken');

const generateTokens = (student) => { 
    return jwt.sign(
        {
            id: student._id,
            name: student.name,
            email: student.email,
            role: student.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '3d' }
    );
}

module.exports = generateTokens;


