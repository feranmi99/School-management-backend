const studentModel = require("../../model/student/studentModel");
const cloudinary = require('cloudinary');
const dotenv = require("dotenv");
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


const studentUploadImage = async (req, res) => {
    try {
        const { myfile, _id } = req.body;

        const uploadResult = await cloudinary.v2.uploader.upload(myfile);
        console.log(uploadResult);

        await studentModel.updateOne({ _id }, { $set: { profilepicture: uploadResult.secure_url } });

        console.log("Profile picture upload successful.");
        res.status(200).json({
            message: "Profile picture upload successful.",
            status: true

            });
    } catch (error) {
        console.error("Error uploading/updating profile picture:");
        res.status(500).json({ 
            error: "An error occurred while processing the request.",
            status: false
        });
    }
};


module.exports = { studentUploadImage };