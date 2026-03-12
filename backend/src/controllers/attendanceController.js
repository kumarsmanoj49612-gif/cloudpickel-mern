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
    const Id= student;
    const date = new Date(req.body.date);
    const status = req.body.status;
    const name = student.name;
    const email = student.email;
    const studentRegNo = student.studentRegNo;
    const attendance = new attendanceModel({ Id, date, status });
    // await attendence.findeoneAndUpdate({ Id, date }, 
    //   { status, name, email, studentRegNo }, 
    //   { upsert: true, new: true });
    //   res.status(200).json({ message: 'please update' });

    // if (student.status === 'present||absent') {
    //   await attendanceModel.findOneAndUpdate(
    //     { Id, date },
    //     { status, name, email, studentRegNo },
    //   );
    //   res.status(200).json({ message: 'Attendance already marked Please update status' });
    // }

    await attendance.save();
    res.status(201).json({ message: 'Attendance marked successfully' });
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