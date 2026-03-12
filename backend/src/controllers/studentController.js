const User=require('../models/user');
const bcrypt = require('bcrypt' );
const generateTokens=require('../utils/generateTokens');

// Controller function to create a new studentr
console.log("student controller loaded");
const registerStudent=async (req,res)=>{
    console.log("register student called");
    try{
       console.log("helllo");
        const {name,email,password,studentRegNo}=req.body;  
        const existingStudent=await User.findOne({email});  
        if(existingStudent){
            return res.status(400).json({message:"Student with this email already exists"});
        }
        if(!name || !email || !password || !studentRegNo){
            return res.status(400).json({message:"All fields are required"});
        }   
        const hashedPassword=await bcrypt.hash(password,10);
        const newStudent=new User({ 
            name,       
            email,
            password:hashedPassword,
            studentRegNo,
            role:"student"
        });
        await newStudent.save();
        res.status(201).json({message:"Student registered successfully"});
    }catch(error){
        console.error("Error registering student:",error.message);
        res.status(500).json({message:"Server error"});
    }
};  

const loginStudent=async(req,res)=>
{
    try
    {
        const{studentRegNo,password}=req.body;
        const student=await User.findOne({studentRegNo});
        if (!studentRegNo || !password) 
        {
            return res.status(400).json({ message: "All fields are required" });
        }
        if(!student){
            return res.status(400).json({ message: "Student not found" });
        }
        if(registerStudent==studentRegNo,password)
        {
            return res.status(400).json({ message: "login successfull",token:generateTokens(student)});
        }

        const isPasswordValid=await bcrypt.compare(password,student.password);
        if(!isPasswordValid)
        {
            return res.status(400).json({ message: "invalid password" });
        }
    }
    catch(error)
    {
        console.error("Error loging :",error.message);
        res.status(400).json({message:"Server error"});
    }
};  
     
const getAll=async(req,res)=>{
    try{
        const students=await User.find();
        res.status(200).json({message:"Students fetched successfully",students});
    }catch(error){
       
        res.status(500).json({message:"Server error"});
        console.log(error)
    }
};


module.exports={registerStudent,loginStudent,getAll};
