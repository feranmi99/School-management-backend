const express = require('express');

const staffRouter = express.Router();

staffRouter.use(express.json());

module.exports = staffRouter