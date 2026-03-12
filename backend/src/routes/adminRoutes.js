const express = require('express');
const router = express.Router();
const {adminLogin} = require('../controllers/adminController');
router.post("/auth/login",adminLogin);



module.exports = router;
