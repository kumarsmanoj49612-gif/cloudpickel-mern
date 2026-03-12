const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const User = require('./models/user');



const app = express();

app.use(cors());
app.use(express.json());

app.get("/hello", (req, res) => {
    res.send("Welcome to the Student Management API");
});
app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leave", leaveRoutes);



app.use((req, res)=> {
    res.status(404).json({ message: "API not working" });
});


module.exports = app;