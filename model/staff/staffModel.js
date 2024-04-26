const mongoose = require('mongoose');

const bcryptjs = require('bcryptjs')

const staffSchema = mongoose.Schema({
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
    city:{
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
    profilepicture:{
        type: String,
        default: ''
    }
},{timestamps: true});

let saltRound = 10
staffSchema.pre('save', function(next){
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


staffSchema.methods.validatepassword = function (password, callback) {
    bcryptjs.compare(password, this.password, (err, result) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        console.log(result);
        callback(null, result); 
    });
};

const staffModel = mongoose.model('staffModel', staffSchema);

module.exports = staffModel ;