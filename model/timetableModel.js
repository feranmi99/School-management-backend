const  mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
    starttime:{
        type:String,
        require:true
    },
    stoptime:{
        type:String,
        require:true,
    },
    monday:{
        type:String,
        require:true,
    },
    tuesday:{
        type:String,
        require:true,
    },
    wednesday:{
        type:String,
        require:true,
    },
    thursday:{
        type:String,
        require:true,
    },
    friday:{
        type:String,
        require:true,
    },
    users:{
        type:String,
        require:true,
    },
},{timestamps:true});

const todoSchema = mongoose.Schema({
    item:{
        type:String,
        require:true,
    },
    time:{
        type:String,
        require:true,
    },
    date:{
        type:String,
        require:true,
    },
    users:{
        type:String,
        require:true,
    },
},{timestamps:true});

const timetableModel = mongoose.model('timetableSchema', timetableSchema);
const todoModel = mongoose.model('todoSchema', todoSchema);

module.exports = { timetableModel, todoModel };