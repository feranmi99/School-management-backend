const mongoose = require('mongoose');

const studentChatSchema = new mongoose.Schema({
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

const studentChatModel = mongoose.model('studentChat', studentChatSchema);

module.exports = studentChatModel;
