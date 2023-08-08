const mongoose = require('mongoose');

const attendModel = new mongoose.Schema({
    fullname:{
        type :String,
        required:true
    },
    matricnumber:{
        type :String,
        required:true
    },
    email:{
        type :String,
        required:true
    },
    class:{
        type :String,
        required:true
    },
    department:{
        type :String,
        required:true
    },
    phonenumber:{
        type :String,
        required:true
    },
    level:{
        type :String,
        required:true
    }
},{timestamps:true});

const userAttend = mongoose.model('attendnce' , attendModel);

module.exports = userAttend;