const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/User');
const doctorRoutes = require('./routes/Doctor')
const appointmentRoutes = require('./routes/Appointment');
const auth = require('./middleware/auth');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
// app.use('/doctor', doctorRoutes)
app.use('/users', userRoutes);
app.use('/sns', appointmentRoutes)
app.use('/schedules', appointmentRoutes);

app.use((err, req, res, next)=>{
    res.status(400).json({ error: err})
})

app.listen(3000, ()=>console.log("Listening on 3000..."))