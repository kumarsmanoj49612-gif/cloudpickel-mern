const express = require('express');
const router = express.Router();
const {markAttendance, getAllAttendance, updateAttendanceStatusByAdmin} = require('../controllers/attendanceController');
const protect = require('../middleware/protect');
const adminOnly = require('../middleware/adminMiddleware');
router.post("/mark", markAttendance);
router.get("/admin/all",protect, adminOnly, getAllAttendance);
router.put("/admin/update/:attendanceId", protect, adminOnly, updateAttendanceStatusByAdmin);
// router.get("/student/my-attendence", protect, getMyAttendance);

module.exports = router;



