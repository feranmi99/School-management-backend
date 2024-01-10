const studentModel = require("../../model/student/studentModel");
const studentAttendanceModel = require("../../model/student/studentAttendanceModel");

const studentAttendancePost = async (req, res) => {
    console.log(req.body);
    try {
        const { fullName, matricnumber, department, level, id, image } = req.body;

        // Check if the user with the provided id exists
        const user = await studentModel.findById(id);
        if (!user) {
            return res.status(500).json({ 
                error: 'User not found',
                status: false
            });
        }

        // Create a new attendance record
    //     const newAttendance = new studentAttendce({ fullname, matricnumber, department, level });
    const newUser = new studentAttendanceModel({
        fullName,
        matricnumber,
        department,
        level,
        id,
        image
    });
   
    newUser.save()
    .then((result) => {
        return res.status(200).json({
            message: 'Attendance sign successful',
            result: user,
            status: true,
        });
    })
    .catch((err) => {
        return res.status(500).json({
            message: 'An error occurred during Attendance. Please try again later.',
            error: err.message,
            status: false,
        });
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const studentAttendanceGet = async (req, res) => {
    try {
        // studentAttendanceModel.deleteMany()
        const result = await studentAttendanceModel.find({});
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { studentAttendancePost , studentAttendanceGet }