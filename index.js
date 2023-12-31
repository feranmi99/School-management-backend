const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { Server } = require("socket.io"); 
const http = require("http"); 
// const router = require('./routers');
const studentRouter = require('./allRouters/studentRouter')
// const staffRouter = require('./allRouters/staffRouter');

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(express.json({ limit: "50mb" }));

let port = process.env.PORT;
let URI = process.env.MONGO_URI;

// app.use('/', router);
app.use('/student', studentRouter)
// app.use('/staff', staffRouter)

mongoose.connect(URI)
    .then(() => {
        console.log("mongoose has connected successfully");
    })
    .catch((err) => {
        console.log(err);
    });

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});


io.on('connection', (socket) => {
    // console.log(`User connected (Socket ID: ${socket.id})`);
    socket.on('sendMsg', (message) => {
        console.log(`Received message: ${message}`);
        io.emit('broadcastMsg', message);
    });
    // Handle disconnections (commented out)
    // socket.on('disconnect', () => {
    //   console.log(`User has disconnected (Socket ID: ${socket.id})`);
    // });
});
  
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
