const attendancemodel = require('../model/attendancemodel');

const postAttendan = (req,res)=> {
    console.log(req.body);
    let info = req.body;
    let form = new attendancemodel(info);
    form.save().then((resuit)=> {
        res.status(200).json(resuit)
    }).then((err)=> {
        console.log(err);
    })

}

const getattendance =  (req,res) => {
    attendancemodel.find()
    .then((resuit)=>{
        console.log(resuit);
        res.status(200).json(resuit)
    }).catch((err)=>{
        console.log(err);
    })

}

module.exports = { postAttendan , getattendance }