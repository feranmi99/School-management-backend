const express = require('express');
const { staffSignup, staffAuth, staffLogin } = require('../controller/staff/staffRegister');

const staffRouter = express.Router();

staffRouter.use(express.json());


staffRouter.post('/staffSignup', staffSignup );
staffRouter.post('/staffLogin', staffLogin );
staffRouter.get('/staffAuth', staffAuth );


module.exports = staffRouter