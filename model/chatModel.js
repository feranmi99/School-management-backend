const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
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

const chatModel = mongoose.model('chatSchema', chatSchema);

module.exports = chatModel;
