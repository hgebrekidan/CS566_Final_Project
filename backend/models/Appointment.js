const mongoose = require('mongoose');

const Appointment = mongoose.model('Appointment',{
    appointmentDate: Date,
    firstName: String,
    lastName: String,
    phone: String
});
module.exports = Appointment;