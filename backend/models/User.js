const mongoose = require('mongoose');


const User = mongoose.model('User',{
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    role: {type: String, required: true}
});


module.exports = User;
