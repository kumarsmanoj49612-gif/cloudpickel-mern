const Attendance = require('../models/Attendance');
const userModel = require('../models/user');

const markAttendance = async (req, res) => {
  const record = await Attendance.create(req.body);
  
  console.log("mark attendance called");
  try {
    const{Id, status,date} = req.body;
    const student = await userModel.findById(req.body.Id );
    console.log("student found:", student);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    if (!status || !date || !Id || !student.name || !student.email || !student.studentRegNo) {
      return res.status(400).json({ message: 'all fields are required' });
    }

    if(status === 'present'){
      student.attendanceCount = (student.attendanceCount || 0) + 1;
      await student.save();

    const attendanceRecord = await Attendance.create(req.body);
    res.status(201).json({ message: 'Attendance marked successfully' });
    }
    
    else if(status === 'absent'){
      student.absentCount = (student.absentCount || 0) + 1;
      await student.save();
    }
    res.status(201).json({ message: 'Attendance already marked, please update status' });
   
    }
 
  
  
// }
   catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getAllAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find();
        res.status(200).json(attendance);
    }
    catch (error) {
        console.error('Error fetching attendance:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateAttendanceStatusByAdmin = async (req, res) => {
  try {
    const { attendanceId } = req.params;
    const { status } = req.body;

    const attendance = await Attendance.findById(attendanceId);

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    attendance.status = status || "denied";
    attendance.adminMessage = "Please update a message";

    await attendance.save();

    res.status(200).json({
      message: "Attendance updated by admin",
      attendance
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports = { markAttendance, getAllAttendance, updateAttendanceStatusByAdmin };




