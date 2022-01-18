var express = require('express');
var router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const Appointment = require('../models/Appointment')

// list all the appointments
router.get('/appointments', async (req, res, next) => {
    try {
        const appointment = await Appointment.find({})
        if(!appointment) res.json('Appointment does not exist!')
        res.json({success: 1, data: appointment})
    } catch (error) {
        next(error)
    }
});
// get the appointment by id
router.get('/appointments/:id', async (req, res, next) => {
    try {
        const appointment = await Appointment.findOne({ _id: new Object(req.params.id) })
        .select({_id: 0})
        // const specificAppointment = await Appointment.findOne({_id: appointment._id})
        res.json({success: 1, data: appointment})
    } catch (error) {
        next(error)
    }
});
// add new appointment
router.post('/appointments', async (req, res, next) => {
    try {
        const {appointmentDate, firstName,lastName, email} = req.body;
        if (!appointmentDate || !firstName || !lastName || !email) {
    return res.status(400).json({
      message: 'Appointment Date, Name and email are required',
    });
  }
  const existedSchedule = await Appointment.findOne({email: email});
  console.log(existedSchedule)
  if(existedSchedule){
    res.json("Appointment already exists")
    
  }
  const payload = { appointmentDate, firstName, lastName, email };
    const appointment = new Appointment(payload);
    const appoint = await appointment.save()
    res.json({success: 1, schedule:appoint})
    } catch (error) {
        next(error)
    }
  
  

});
// delete/cancel an appointment by id
router.delete('/appointments/:id', async (req, res, next) => {
    try {
        
  const deletedAppointment = await Appointment.deleteOne({ _id: new Object(req.params.id) })
  console.log(deletedAppointment)
  if(!deletedAppointment.deletedCount) res.json('Appointment does not exist!')
    
    res.json({ success: 1 })
    } catch (error) {
        next(error)
    }
  
});
// user can edit the appointment by id
router.patch('/appointments/:id', async (req, res, next)=>{
    try {
      
            const appointment = await Appointment.updateOne({_id: new Object(req.params.id)},
            {
                $set: { appointmentDate: req.body.appointmentDate, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email }
            });
            const updatedAppointment = await Appointment.findOne({_id: new Object(req.params.id)}).select({_id: 0})
            // if(user.matchedCount === 1) res.json({error: 'User does not exist'})
            res.json({success: 1, data: updatedAppointment})
        
        
    } catch (err) {
        next(err)
    }
})

module.exports = router;


