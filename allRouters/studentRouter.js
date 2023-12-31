const express = require('express');
const { studentSignup, studentLogin } = require('../controller/student/studentRegister');

const studentRouter = express.Router();

studentRouter.use(express.json());

studentRouter.post('/studentSignup', studentSignup );
studentRouter.post('/studentLogin', studentLogin );


module.exports = studentRouter;