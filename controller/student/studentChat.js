const studentChatModel = require("../../model/student/studentChatModel");
const studentModel = require("../../model/student/studentModel");


const getStudentMessageList = (req, res) => {
    const { from, otherUserId } = req.query;
    if (!from || !otherUserId) {
        return res.status(500).json({
            message: "Missing parameters",
            status: false,
        })
    }

    studentChatModel
        .find({ chatuser: { $all: [from, otherUserId] } })
        .then((result) => {
            return res.status(200).json({
                message: "Get Chat successful",
                result: result,
                status: true,
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                message: "Unable to Get chat",
                status: false,
            });
        });
};

const sendStudentMessage = async (req, res) => {
    const { userId, friendId } = req.params;
    const { chatuser, sender, message } = req.body;
    console.log(req.params);
    console.log(req.body);
    // await studentChatModel.deleteMany()
    if (!chatuser || !sender || !message) {
        console.log('Missing required parameters');
        return res.status(500).json({
            status: false,
            message: "Missing required parameters",
        });
    }

    const newChatMessage = new studentChatModel({
        chatuser,
        sender,
        message,
    });

    newChatMessage.save()
        .then((result) => {
            console.log(result);
            return res.status(200).json({
                status: true,
                message: "Message sent successfully",
                result: result,
            });
        }).catch((err) => {
            console.error(err);
            return res.status(500).json({
                status: false,
                message: "Error sending message",
                result: err,
            });
        });
};

const getAllUser = (req, res) => {
    studentModel
        .find({})
        .then((result) => {
            return res.status(200).json({
                message: "Get Message successful",
                result: result,
                status: true,
            });
        }).catch((err) => {
            console.log(err);
            return res.status(500).json({
                message: "Unable to Get Message",
                status: false,
            });
        });
};

module.exports = { getAllUser, getStudentMessageList, sendStudentMessage };
