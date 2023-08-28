const mongoose = require('mongoose');

const bcryptjs = require('bcryptjs');
const bcrypt = require('bcryptjs/dist/bcrypt');

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    nationality:{
        type: String,
        required: true
    },
    phonenumber:{
        type: String,
        required: true
    },
    stateoforigin:{
        type: String,
        required: true
    },
    courses:{
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    },
    level:{
        type: String,
        required: true
    },
    // matricnumber:{
    //     type: Number,
    //     required: true
    // },
    profilepicture:{
        type: String,
        default: ''
    }
},{timestamps: true});

let saltRound = 10
userSchema.pre('save', function(next){
    console.log(this.password);
    bcryptjs.hash(this.password,saltRound )
    .then(res =>{
        this.password = res
        next();
    })
    .catch(err =>{
        console.log(err);
    })
})

// userSchema.methods.validatepassword = function(password, callback) {
//     console.log(password);
//     console.log(this);
//     bcrypt.compare(password, this.password,(err , result) => {
//         console.log(result);
//     })
    
// }

userSchema.methods.validatepassword = function (password, callback) {
    bcryptjs.compare(password, this.password, (err, result) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        console.log(result);
        callback(null, result); 
    });
};

const userModel = mongoose.model('connection', userSchema);

module.exports = userModel ;