const mongoose = require('mongoose');


const User = mongoose.model('Patient',{
    email: String,
    password: String,
    phone: String,
    location: {
        zipcode: String,
        city: String,
        state: String
    },
    logs: [{ timestamp: Number, city: String, state: String}]
});


module.exports = User;
