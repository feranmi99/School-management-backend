const studentModel = require("../../model/student/studentModel");
const studentAttendce = require('../../model/student/studentAttendanceModel')

const studentAttendancePost = async (req, res) => {
    console.log(req.body);
    // try {
    //     const { fullname, matricnumber, department, level } = req.body;
    //     console.log(req.body);

    //     const newAttendance = new studentAttendce({ fullname, matricnumber, department, level });
    //     const result = await newAttendance.save();

    //     res.status(200).json(result);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Internal Server Error' });
    // }
};

const studentAttendanceGet = async (req, res) => {
    try {
        const result = await studentAttendce.find({});
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { studentAttendancePost , studentAttendanceGet }