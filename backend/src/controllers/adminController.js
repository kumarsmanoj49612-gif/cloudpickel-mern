const User=require('../models/user');
const bcrypt = require('bcrypt' );
const generateTokens=require('../utils/generateTokens');

const adminLogin = async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        const admin=await User.findOne({email});
        
        if ( !name || !email || !password ) 
        {
            return res.status(400).json({ message: "All fields are required" });
        }

        if(!admin){
            return res.status(400).json({ message: "admin not found" });
        }
        const isPasswordValid=await bcrypt.compare(password,admin.password);
        if(!isPasswordValid)
        {
            return res.status(400).json({ message: "invalid password" });
        }
    
        if(adminLogin==name,email,password)
        {
            return res.status(400).json({ message: "login successfull",token:generateTokens(admin)});
        }
    }
    catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports={adminLogin};