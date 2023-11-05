const userModel = require("../model/userModel");
const cloudinary = require('cloudinary');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
dotenv.config();

const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;
const SECRET = process.env.SECRET;

cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret
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


const dataFunction = (req, res) => {
    const { email, password } = req.body;
    const SECRETKEY = 'titus'
    console.log(SECRETKEY);
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
                    const token = jwt.sign({ email }, SECRETKEY, { expiresIn: "6h" })
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
    // const token = req.headers.authorization
    // console.log(token);
    // console.log(req.headers.authorization.split(' ')[1]);
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, SECRET, (err, result) => {
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
const home = (req,res) => {
    res.send( {message: 'welcome to Edu protal pro', status:true} )
}

module.exports = { todoFunction, getFunction, dataFunction, getProfile, profilepic,home };