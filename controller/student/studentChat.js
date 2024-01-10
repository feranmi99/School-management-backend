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
        .find({ chatuser: { $all: [from, to] } })
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

const sendStudentMessage = (req, res) => {
    const { message, from, to } = req.body;

    if (!message || !from || !to) {
        return res.json({ code: 105, msg: "Missing required parameters" });
    }

    studentChatModel.create(
        {
            message: message,
            from: from,
            to: to,
        },
        function (err, doc) {
            if (err) {
                return res.json({ code: 500, msg: "Server error" });
            }

            return res.json({
                code: 200,
                msg: "Message sent successfully",
                data: doc,
            });
        }
    );
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
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                message: "Unable to Get Message",
                status: false,
            });
        });
};

module.exports = { getAllUser, getStudentMessageList };
