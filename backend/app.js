const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/User');
const farmerRoutes = require('./routes/Farmer');
const app = express();

mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use('/user', userRoutes);
app.use('/farmer', farmerRoutes);

app.use((err, req, res, next)=>{
    res.status(400).json({ error: err})
})

app.listen(3000, ()=>console.log("Listening on 3000..."))