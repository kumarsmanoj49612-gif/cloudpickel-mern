const mongoose = require('mongoose');
const leaveSchema = new mongoose.Schema({
    studentId: {type: String, required: true},
    fromDate: {type: Date, required: true},
    toDate: {type: Date, required: true},
    reason: {type: String, required: true},
    status: {type: String, enum: ['approved', 'rejected', 'pending'], default: 'pending'}
});
module.exports=mongoose.model("Leave", leaveSchema);