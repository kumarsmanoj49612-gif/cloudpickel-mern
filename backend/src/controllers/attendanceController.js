const attendanceModel = require('../models/Attendance');
const userModel = require('../models/user');

const markAttendance = async (req, res) => {
  try {
    const student = await userModel.findById(req.body.Id );
    console.log("student found:", student);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    else {
    const Id= student._id;
    const date = new Date();
    const name = student.name;
    const email = student.email;
    const studentRegNo = student.studentRegNo;
    const status = req.body.status;

    const attendanceRecord = new attendanceModel({
      Id,
      name,
      email,
      studentRegNo,
      date,
      status
    });
    if(status === 'present'){
      student.attendanceCount = (student.attendanceCount || 0) + 1;
      await student.save();

      await attendanceRecord.save();
    res.status(201).json({ message: 'Attendance marked successfully' });
    }
    

    else if(status === 'absent'){
      student.absentCount = (student.absentCount || 0) + 1;
      await student.save();
    }
    res.status(201).json({ message: 'Attendance already marked, please update status' });
    

    
  }
  }
   catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getAttendance = async (req, res) => {
    try {
        const Id = req.params.Id;
        const attendanceRecords = await attendanceModel.find({ Id });
        res.status(200).json(attendanceRecords);
    }
    catch (error) {
        console.error('Error fetching attendance:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { markAttendance, getAttendance };