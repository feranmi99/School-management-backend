const mongoose = require('mongoose');

const studentShatSchema = new mongoose.Schema({
    chatuser:{
        type:Array,
        require:true
    },
    message:{
        type:String,
        require:true
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
},{timestamps:true});

const studentChatModel = mongoose.model('studentShatSchema', studentShatSchema);

module.exports = studentChatModel;
