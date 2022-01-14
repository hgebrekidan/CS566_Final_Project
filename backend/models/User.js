const mongoose = require('mongoose');


const User = mongoose.model('Patient',{
    email: String,
    password: String,
    phone: String,
    
});


module.exports = User;
