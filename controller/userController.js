const userModel = require("../model/userModel");
const cloudinary = require('cloudinary');
const jwt = require('jsonwebtoken');

cloudinary.config({
    cloud_name: 'dvq4xeg1s',
    api_key: '973981513565751',
    api_secret: 'P6_z1xe7VMGnaUmSDL1YC2nlt7A'
});
const todoFunction = (req, res) => {
    const { firstname, lastname, email, password, gender, address, nationality, phonenumber, stateoforigin, courses, department, level, matrinumber, condition } = req.body;
    console.log(req.body);

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
        condition,

    });
    newUser.save()
        .then((result) => {
            console.log(result);
            res.status(200).json(result)
        })
        .catch((err) => {
            console.log(err);
        })
};

// const home = (req, res) => {
// res.status(200).json({ messa })
// res.send('king titus')
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
    console.log(email)
    userModel.findOne({ email })
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: 'User not found !!!' });
            }

            result.validatepassword(password, (err, isMatch) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: 'Internal server error !!!' });
                }

                if (isMatch) {
                    const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: "6h" })
                    res.status(200).json({ message: '✔ Sign up successfully', result, token });
                } else {
                    res.status(401).json({ message: 'Authentication failed !!!' });
                }
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Internal server error !!!' });
        });
};


const getFunction = (req, res) => {
    // const { token2 } = req.params;
    // console.log(req.headers.authorization.split(' ')[1]);
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            let email = result.email;
            userModel.find({ email })
                .then((result) => {
                    res.status(200).json(result);
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
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

// const profilepic = (req, res) => {
//     let myfile = req.body.myfile;
//     let id = req.body._id
//     console.log(id);
//     cloudinary.v2.uploader.upload(myfile, { public_id: id }
//     ).then((result) => {
//         console.log(result);
//         console.log(result.secure_url)
//         userModel.updateOne({ _id: id }, { $set: { profilepicture: result.secure_url } }).then(result => {
//             console.log(result);
//         })
//     }).catch((error) => {
//         console.log(error);
//     })
// }


const profilepic = (req, res) => {
    const myfile = req.body.myfile;
    const id = req.body._id;

    cloudinary.v2.uploader.upload(myfile)
        .then((result) => {
            console.log(result);
            console.log(result.secure_url);

            userModel.updateOne({ _id: id }, { $set: { profilepicture: result.secure_url } })
                .then(() => {
                    console.log("Profile picture upload successful.");
                    res.status(200).json({ message: "Profile picture upload successful." });
                })
                .catch((updateError) => {
                    console.log("Error updating user profile picture:", updateError);
                    res.status(500).json({ error: "An error occurred while updating the profile picture." });
                });
        })
        .catch((uploadError) => {
            console.log("Error uploading profile picture to Cloudinary:", uploadError);
            res.status(500).json({ error: "An error occurred while uploading the profile picture." });
        });
};


module.exports = { todoFunction, getFunction, dataFunction, getProfile, profilepic, };