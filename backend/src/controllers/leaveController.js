const leaveModel = require('../models/Leave');

const applyLeave = async (req, res) => {
    try {
        const { studentId, fromDate, toDate, reason } = req.body;       
        const leaveRequest = new leaveModel({ studentId, fromDate, toDate, reason });
        await leaveRequest.save();
        res.status(201).json({ message: 'Leave request submitted successfully', leaveRequest });
    } catch (error) {
        console.error('Error applying for leave:', error);
        res.status(500).json({ message: 'Server error' });
    }   
};
const updateLeaveStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const leaveRequest = await leaveModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!leaveRequest) {
            return res.status(404).json({ message: 'Leave request not found' });
        }   
        res.status(200).json({ message: 'Leave request status updated successfully', leaveRequest });
    } catch (error) {
        console.error('Error updating leave status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getLeaveRequests = async (req, res) => {
    try {
        const leaveRequests = await leaveModel.find();
        res.status(200).json(leaveRequests);
    } catch (error) {
        console.error('Error fetching leave requests:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports = { applyLeave, updateLeaveStatus, getLeaveRequests };