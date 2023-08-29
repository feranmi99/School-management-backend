const timetableModel = require("../model/timetableModel");

const posttimetable = (req, res) => {
    const { starttime, monday, stoptime, tuesday, wednesday, thursday, friday, users } = req.body
    const { user } = req.params

    const newtimetable = new timetableModel({
        starttime,
        stoptime,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        users,
    })
    newtimetable.save()
    .then((result) => {
        // console.log(result);
        res.status(200).json(result);
        
    })
    .catch((err) => {
        console.log(err);
    })
}

const gettimetable =  (req,res) => {
    const { users } = req.params
    // console.log(user);
    timetableModel.find({users})
    .then((result) => {
        // console.log(result);
        res.status(200).json(result);
        
    })
    .catch((err) => {
        console.log(err);
    })

}

module.exports = { posttimetable, gettimetable }