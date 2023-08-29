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
    const { from, to } = req.params;
    const { chatuser,sender, message } = req.body

    const newChatMessage = new chatModel({
        chatuser,
        sender,
        message,
    })
    newChatMessage.save()
    .then((result) => {
        // console.log(result);
        res.status(200).json(result);
        
    })
    .catch((err) => {
        console.log(err);
    })
}

const getChatMessage = (req, res) => {
    const { from, to } = req.params;
  
    chatModel
      .find({
        $or: [
          { chatuser: [from, to] },
          { chatuser: [to, from] }
        ]
      })
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Error fetching chat messages" });
      });
  };
  

module.exports =  { chatList, mainChat, sentChatMessage, getChatMessage }