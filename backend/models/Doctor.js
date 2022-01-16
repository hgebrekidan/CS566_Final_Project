const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Doctor = mongoose.model('Doctor',{
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    appointments: [
        {
        user: { type: Schema.Types.ObjectId,
        ref: 'User', required: false},
        time: {
            type: String,
            required: false
        },
        isAvailable: {
            type: Boolean,
            default: true
        }
        }
    ],
    rating: {type: Number, required: false},
});


module.exports = Doctor;