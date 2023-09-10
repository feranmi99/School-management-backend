const express = require('express');
const { todoFunction, getFunction, getProfile, dataFunction, profilepic,  } = require('./controller/userController');
const { getattendance , postAttendan } = require('./controller/attendController');
const { chatList, mainChat, sentChatMessage, getChatMessage } = require('./controller/chatController');
const { posttimetable, gettimetable, postodo, gettodo } = require('./controller/timetableController');

const router = express.Router();

router.use(express.json());

router.post('/signup', todoFunction);
router.post('/login' , dataFunction);
router.post('/profilepic' ,profilepic );
router.get('/getPost/:_id', getFunction);
router.get('/profile/:_id', getProfile);
router.post('/attendance', postAttendan);
router.get('/getattendance', getattendance);
router.get('/getChatUser', chatList);
router.get('/myChat/:_id', mainChat);
router.post('/updatedChatMessage/:from/:_id' ,sentChatMessage );
router.get('/getChatMessage/:from/:to', getChatMessage);
router.post('/posttimetable/:user', posttimetable);
router.get('/gettimetable/:users', gettimetable);
router.post('/postodo/:user', postodo);
router.get('/gettodo/:users', gettodo);

module.exports = router;

