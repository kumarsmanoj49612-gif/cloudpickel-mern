const bycrypt = require('bcrypt');
const User=require('./models/user');

const seedAdmin=async()=>{
    try
    {
        const adminEmail="manojkumar@gmail.com";
        const existingAdmin=await User.findOne({email:adminEmail});
        if(existingAdmin){
            console.log("Admin user already exists");
            return;
        }
        const hashedPassword=await bycrypt.hash("Admin@123",10);
        const adminUser=new User({
            name:"Admin User",          
            email:adminEmail,
            password:hashedPassword,
            role:"admin"    
        });
        await adminUser.save();
        console.log("Admin user created successfully");     
    }catch(error){
        console.error("Error creating admin user:",error.message);  
    }
};

module.exports=seedAdmin;

