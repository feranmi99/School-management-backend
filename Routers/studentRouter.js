const express = require('express');
const { studentSignup, studentLogin, studentAuth } = require('../controller/student/studentRegister');
const { studentUploadImage } = require('../controller/student/studentUploadImage');
const { studentAttendancePost, studentAttendanceGet } = require('../controller/student/studentAttendanceContoller');

const studentRouter = express.Router();

studentRouter.use(express.json());

studentRouter.post('/studentSignup', studentSignup );
studentRouter.post('/studentLogin', studentLogin );
studentRouter.get('/studentAuth', studentAuth );
studentRouter.post('/studentUpLoadImage', studentUploadImage );
studentRouter.post('/studentAttendancePost', studentAttendancePost );
studentRouter.get('/studentAttendanceGet', studentAttendanceGet );



module.exports = studentRouter;