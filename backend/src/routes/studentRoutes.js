const express = require('express');
const router = express.Router();
const {registerStudent,loginStudent,getAll} = require('../controllers/studentController');
const authorizeRoles=require('../middleware/adminMiddleware');
const protect = require('../middleware/protect');
router.post("/register", registerStudent);
router.post("/login",loginStudent);
router.get("/all",protect,authorizeRoles("admin"),getAll);


module.exports = router;
