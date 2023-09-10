const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const router = require('./routers');
const socketClient = require('socket.io');
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());

app.use(express.json({ limit: "50mb" }));

let port = process.env.PORT;
let URI = process.env.MONGO_URI;

app.use('/', router);


mongoose.connect(URI)
    .then(() => {
        console.log("mongoose has connected successfully");
    })
    .catch((err) => {
        console.log(err);
    });

const connection = app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});


const io = socketClient(connection, {
    cors: { origin: "*" }
})
io.on('connection', (socket) => {
    // console.log(`User connected (Socket ID: ${socket.id})`);
    socket.on('sendMsg', (message) => {
        console.log(`Received message: ${message}`);
        io.emit('broadcastMsg', message)
    })
    // Handle disconnections (commented out)
    // socket.on('disconnect', () => {
    //   console.log(`User disconnected (Socket ID: ${socket.id})`);
    // });
})

