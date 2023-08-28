const chatModel = require("../model/chatModel");
const userModel = require("../model/userModel");


const chatList =  (req, res) => {
    userModel.find()
    .then((resuit) => {
        res.status(200).json(resuit)
    }).catch((err) => {
        console.log(err);
    })
}

const mainChat = (req,res) => {
    const { _id } = req.params;
    // console.log(_id);
    userModel.find({ _id })
    .then((result) => {
        // console.log(result);
        res.status(200).json(result);
        
    })
    .catch((err) => {
        console.log(err);
    })
}

const sentChatMessage = (req,res) => {
    const chatuser = req.body;
    const data = new chatModel(chatuser)
    data.save()
    .then((result) => {
        // console.log(result);
        res.status(200).json(result);
        
    })
    .catch((err) => {
        console.log(err);
    })
}


module.exports =  { chatList, mainChat, sentChatMessage }