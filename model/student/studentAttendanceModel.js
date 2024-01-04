const mongoose = require('mongoose');

const studentAttendanceModel = new mongoose.Schema({
    fullname:{
        type :String,
        required:true
    },
    matricnumber:{
        type :String,
        required:true
    },
    department:{
        type :String,
        required:true
    },
    level:{
        type :String,
        required:true
    }
},{timestamps:true});

const studentAttendceModel = mongoose.model('studentAttendces' , studentAttendanceModel);

module.exports = studentAttendceModel;