const express = require('express');
const { todoFunction, getFunction, getProfile, dataFunction, profilepic,  } = require('./controller/userController');
const { getattendance , postAttendan } = require('./controller/attendController');

const router = express.Router();

router.use(express.json());

router.post('/register', todoFunction);
router.post('/rawData' , dataFunction);
router.post('/profilepic' ,profilepic );
router.get('/getPost/:_id', getFunction);
router.get('/profile/:_id', getProfile);
router.post('/attendance', postAttendan);
router.get('/getattendance', getattendance);

module.exports = router;

