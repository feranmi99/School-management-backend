const express = require('express');
const { todoFunction, getFunction, getProfile, dataFunction, profilepic,  } = require('./controller/userController');
const { getattendance , postAttendan } = require('./controller/attendController');
const { chatList, mainChat, sentChatMessage, getChatMessage } = require('./controller/chatController');
const { posttimetable } = require('./controller/timetableController');

const router = express.Router();

router.use(express.json());

router.post('/register', todoFunction);
router.post('/rawData' , dataFunction);
router.post('/profilepic' ,profilepic );
router.get('/getPost/:_id', getFunction);
router.get('/profile/:_id', getProfile);
router.post('/attendance', postAttendan);
router.get('/getattendance', getattendance);
router.get('/getChatUser', chatList);
router.get('/myChat/:_id', mainChat);
router.post('/updatedChatMessage/:from/:_id' ,sentChatMessage );
router.get('/getChatMessage/:from/:to', getChatMessage);
router.post('/posttimetable', posttimetable);

module.exports = router;

