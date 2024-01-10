const studentModel = require("../../model/student/studentModel");


const getAllUser = (req, res) => {
    studentModel.find({})
        .then((resuit) => {
            res.status(200).json(resuit)
        }).catch((err) => {
            console.log(err);
        })
};

module.exports = { getAllUser }