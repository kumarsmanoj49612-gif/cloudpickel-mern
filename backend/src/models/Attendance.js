const mongoose = require('mongoose');
const attendancecontroller = require('../controllers/attendanceController');
const attendanceSchema = new mongoose.Schema({
    Id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    date: {type: Date, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    studentRegNo: {type: String, required: true},
    status: {type: String, enum: ['present', 'absent'], required: true},
    adminMessage: {type: String, default: '' }
},{timestamps:true});
module.exports=mongoose.model("Attendance", attendanceSchema);