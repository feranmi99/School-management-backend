const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require("cors")
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const router = require('./routers');
const bcryptjs = require('bcryptjs');
const multer = require('multer');
const cloudinary = require('cloudinary').v2
// const {CloudinaryStorage} = require(multer-storage-cloudinary)

// const { count } = require('./model/userModel');
dotenv.config()
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));
app.use(cors());
app.use(express.json({limit:"50mb"}));

let port = process.env.PORT;
let URI = process.env.MONGO_URI

app.use('/', router);

mongoose.connect(URI).then(()=>{
    console.log("mongoose has connected successfully");
})
.catch((err)=>{
    console.log(err);
})

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// const storage = new CloudinaryStorage({
//     params:{
//         folder:"profiles",
//         allowedFormat: ["png", "jpeg", "svg", "gif"]

//     }
// })

app.post('/users', (req, res) => {
    console.log(req);
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})