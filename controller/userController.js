const userModel = require("../model/userModel");
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const todoFunction = (req, res) => {
    const { firstname, lastname, email, password, gender, address, nationality, phonenumber, stateoforigin, courses, department, level, matrinumber } = req.body;

    const newUser = new userModel({
        firstname,
        lastname,
        email,
        password,
        gender,
        phonenumber,
        courses,
        department,
        level,
        nationality,
        stateoforigin,
        address,
        matrinumber,

    });
    newUser.save()
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            console.log(err);
        })
};

// const dataFunction = (req, res) => {
//     let { password } = req.body 
//     userModel.findOne({
//         email: req.body.email,
//         password: req.body.password
//     })
//         .then((result) => {
//             // console.log(result);
//             if (result) {
//                 result.validatepassword(password, () => {

//                 })
//                 res.status(200).json(result)
//             } else {
                
//             }

//         })
//         .catch((err) => {
//             console.log(err); 
//         })
// }


const dataFunction = (req, res) => {
    const { email, password } = req.body;

    userModel.findOne({ email })
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            result.validatepassword(password, (err, isMatch) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: 'Server error' });
                }
                
                if (isMatch) {
                    res.status(200).json(result);
                } else {
                    res.status(401).json({ message: 'Authentication failed' });
                }
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Server error' });
        });
};


const getFunction = (req, res) => {
    const { _id } = req.params;
    // console.log(_id);
    userModel.find({ _id })
        .then((result) => {
            res.status(200).json(result);
            // console.log(result);
        })
        .catch((err) => {
            console.log(err);
        })
}

const getProfile = (req, res) => {
    const { _id } = req.params;
    // console.log(_id);
    userModel.find({ _id })
        .then((result) => {
            res.status(200).json(result);
            // console.log(result);
        })
        .catch((err) => {
            console.log(err);
        })
}
const profilepic = (req, res) => {
    let myfile = req.body.myfile;
    let id = req.body._id
    console.log(id);
    cloudinary.v2.uploader.upload(myfile, { public_id: id },
        (error, result) => {
            console.log(resuit);
            console.log(error);
            console.log(result.secure_url);
            // if (error) {
            //     console.log(error);
            // } else {
            //     if (result) {
            //         const profileURL = result.secure_url;
            //         console.log(profileURL);
                    userModel.updateOne({ _id: id }, { $set: { profilepicture: result.secure_url } }).then (result => {
                        console.log(result);
                    })
            //     }
                // console.log(error)
            //     res.status(200).json(result)
            // }
        });


}

module.exports = { todoFunction, getFunction, dataFunction, getProfile, profilepic };