const { timetableModel, todoModel } = require("../model/timetableModel");

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

const postodo = (req, res) => {
    const { item, time, date, users } = req.body
    const { user } = req.params

    const newtodo = new todoModel({
        item,
        time,
        date,
        users,
    })
    newtodo.save()
    .then((result) => {
        // console.log(result);
        res.status(200).json(result);
        
    })
    .catch((err) => {
        console.log(err);
    })
}

const gettodo =  (req,res) => {
    const { users } = req.params
    // console.log(user);
    todoModel.find({users})
    .then((result) => {
        // console.log(result);
        res.status(200).json(result);
        
    })
    .catch((err) => {
        console.log(err);
    })

}

module.exports = { posttimetable, gettimetable, postodo, gettodo }