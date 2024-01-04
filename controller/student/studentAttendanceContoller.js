const studentModel = require("../../model/student/studentModel");
const studentAttendce = require('../../model/student/studentAttendanceModel')

const studentAttendcePost = (req,res)=> {
    const { fullname, matricnumber, department, level } = req.body;
    console.log(req.body);
    // let info = req.body;
    // let form = new studentAttendce(info);
    // form.save()
    // .then((resuit)=> {
    //     res.status(200).json(resuit);
    // }).catch((err)=> {
    //     console.log(err);
    // })

};

const studentAttendceGet =  (req,res) => {
    studentAttendce.find({})
    .then((resuit)=>{
        console.log(resuit);
        res.status(200).json(resuit)
    }).catch((err)=>{
        console.log(err);
    })

};

module.exports = { studentAttendcePost , studentAttendceGet }