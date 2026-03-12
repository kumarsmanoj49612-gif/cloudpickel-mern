const mongoose = require('mongoose');
const attendanceSchema = new mongoose.Schema({
    Id: {type: String, required: true},
    date: {type: Date, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    studentRegNo: {type: String, required: true},
    status: {type: String, enum: ['present', 'absent'], required: true}
});
module.exports=mongoose.model("Attendance", attendanceSchema);