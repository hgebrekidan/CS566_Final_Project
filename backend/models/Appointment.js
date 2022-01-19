const mongoose = require('mongoose');
const { timing } = require('npmlog');

const Appointment = mongoose.model('Appointment',{
    appointmentDate: Date,
    appointmentTime: String,
    firstName: String,
    lastName: String,
    phone: String
});
module.exports = Appointment;