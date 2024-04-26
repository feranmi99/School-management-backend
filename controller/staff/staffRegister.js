const staffModel = require("../../model/staff/staffModel");
const axios = require('axios');

const emailValidationAPIKey = '3d6c86703a414f868782f6316269f1fb';
const phoneValidationAPIKey = 'b467b7393451452eb1f282236bbfb2c4';

const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
dotenv.config();

const SECRET = process.env.SECRET;

const staffSignup = async (req, res) => {
    const {
        firstname,
        lastname,
        email,
        password,
        gender,
        address,
        nationality,
        phonenumber,
        stateoforigin,
        condition,
        city
    } = req.body;

    if (!firstname || !lastname || !email || !password || !gender || !phonenumber || !condition || !city) {
        return res.status(400).json({
            message: 'Incomplete or invalid data. Please provide all required fields.',
            status: false,
        });
    };

    try {
        const existingUser = await staffModel.findOne({ email });
        if (existingUser) {
            return res.status(500).json({
                message: 'Email already exists. Please use a different email address.',
                status: false,
            });
        };
        // const emailValidationResponse = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${emailValidationAPIKey}&email=${email}`);
        // if (emailValidationResponse.data.deliverability === 'DELIVERABLE') {
        //     const phoneValidationResponse = await axios.get(`https://phonevalidation.abstractapi.com/v1/?api_key=${phoneValidationAPIKey}&phone=${phonenumber}`);
        //     if (phoneValidationResponse.data.valid == true) {

                const newUser = new staffModel({
                    firstname,
                    lastname,
                    email,
                    password,
                    gender,
                    phonenumber,
                    city,
                    nationality,
                    stateoforigin,
                    address,
                    condition,
                });

                newUser.save()
                    .then((result) => {
                        return res.status(200).json({
                            message: 'Signup successful',
                            result: result,
                            status: true,
                        });
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            message: 'An error occurred during signup. Please try again later.',
                            error: err.message,
                            status: false,
                        });
                    });

        //     } else {
        //         // Handle invalid phone number
        //         return res.status(400).json({
        //             message: 'Invalid phone number.',
        //             status: false,
        //         });
        //     }
        // } else {
        //     // Handle invalid email
        //     return res.status(400).json({
        //         message: 'Invalid email address.',
        //         status: false,
        //     });
        // }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'An error occurred during signup. Please try again later.',
            error: error.message,
            status: false,
        });
    }
}
const staffLogin = (req, res) => {
    const { email, password } = req.body;
    console.log(email)
    staffModel.findOne({ email })
        .then((result) => {
            if (!result) {
                return res.status(500).json({
                    message: 'User not found !!!',
                    status: false,
                });
            }

            result.validatepassword(password, (err, isMatch) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ 
                        message: 'Internal server error !!!' ,
                        status: false,
                    });
                }

                if (isMatch) {
                    const token = jwt.sign({ email }, SECRET, { expiresIn: "6h" })
                    res.status(200).json({ 
                        message: '✔ Sign up successfully',
                        result: result,
                        token: token,
                        status: true,
                    });
                } else {
                    res.status(500).json({ 
                        message: 'Authentication failed !!!' ,
                        status: false,
                    });
                }
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Internal server error !!!' ,
                status: false,
            });
        });
};


const staffAuth = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, SECRET, (err, result) => {
        if (err) {
            res.status(500).json({
                result: err,
                message: 'token expire' ,
                status: false,
            });
            console.log(err);
        } else {
            let email = result.email;
            staffModel.findOne({ email })
                .then((result) => {
                    res.status(200).json({
                        result: result,
                        message: 'good' ,
                        status: true,
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        result: err,
                        message: 'token expire' ,
                        status: false,
                    });
                    console.log(err);
                })
        }
    })
};



module.exports = { staffSignup, staffAuth, staffLogin }