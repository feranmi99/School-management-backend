const chatModel = require("../model/chatModel");
const userModel = require("../model/userModel");


const chatList = (req, res) => {
    userModel.find()
        .then((resuit) => {
            res.status(200).json(resuit)
        }).catch((err) => {
            console.log(err);
        })
};

const mainChat = (req, res) => {
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
};

const sentChatMessage = async(req, res) => {
    const { from, to } = req.params;
    const { chatuser, sender, message } = req.body;

    // await chatModel.deleteMany()

    const newChatMessage = new chatModel({
        chatuser,
        sender,
        message,
    });
    newChatMessage.save()
        .then((result) => {
            // console.log(result);
            res.status(200).json(result);

        })
        .catch((err) => {
            console.log(err);
        })
};

const getChatMessage = (req, res) => {
    const { from, to } = req.params;

    chatModel
        .find({
            chatuser: { $all: [from, to] }
        })
        .sort({ createdAt: 1 })  
        .then((result) => {
            // console.log(result);
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
};




module.exports = { chatList, mainChat, sentChatMessage, getChatMessage }