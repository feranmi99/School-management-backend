const mongoose = require('mongoose');

const studentAttendanceSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    matricnumber: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: false,
    }
}, { timestamps: true });

const studentAttendanceModel = mongoose.model('StudentAttendance', studentAttendanceSchema);

module.exports = studentAttendanceModel;