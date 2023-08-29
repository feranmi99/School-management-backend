const timetableModel = require("../model/timetableModel");

const posttimetable = (req, res) => {
    const { starttime, stoptime, tuesday, wednesday, thursday, friday } = req.body

    const newtimetable = new timetableModel({
        starttime,
        stoptime,
        tuesday,
        wednesday,
        thursday,
        friday,
    })
    timetableModel.save()
    .then((result) => {
        // console.log(result);
        res.status(200).json(result);
        
    })
    .catch((err) => {
        console.log(err);
    })
}

module.exports = { posttimetable }