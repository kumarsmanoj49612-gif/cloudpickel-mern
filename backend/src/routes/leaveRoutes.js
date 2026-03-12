const express = require('express');
const router = express.Router();
const {applyLeave, getLeaveRequests, updateLeaveStatus} = require('../controllers/leaveController');
router.put("/apply", applyLeave);
router.get("/all", getLeaveRequests);
router.put("/:Id", updateLeaveStatus);

module.exports = router;