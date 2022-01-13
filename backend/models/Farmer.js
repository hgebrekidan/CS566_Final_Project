const mongoose = require('mongoose');

const Farmer = mongoose.model('Appointment',{
    name: String,
    address: String,
    phone: String,
    products: []
    
//    , product: {
//         productId: String, 
//         productName: String, 
//         productAmount: Number
//     }
});
module.exports = Farmer;