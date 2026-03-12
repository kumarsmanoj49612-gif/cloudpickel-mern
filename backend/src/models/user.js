const mangoose = require('mongoose');
const userSchema =  new mangoose.Schema({
    name: {type: String, required: true},
    email: {type: String,unique: true},
    password:{type: String, required: true},
    studentRegNo:{type:String},
    
     
role:{type:String,
     enum:["admin","student"],
     default:"student"}
});
module.exports=mangoose.model("User", userSchema);
