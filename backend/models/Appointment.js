const mongoose = require('mongoose');

const Appointment = mongoose.model('Appointment',{
    
    firstName: String,
    lastName: String,
    email: String,
    appointmentDate: String,
    appointmentTime: String,
});
module.exports = Appointment;