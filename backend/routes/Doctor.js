const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Doctor = require('../models/Doctor');
const config = require('../config.json');
const auth = require('../middleware/auth');

const router = express.Router();


router.post('/signup', async (req, res, next) => {
    // input req.body
    try {
        const {fullName, email, password, phone, role} = req.body
        if(!fullName || !email || !password || !phone || !role ){
            res.json('Fill out the blank spaces please');
        }
        
        const exists = await Doctor.findOne({ email: req.body.email });

        if (exists) throw new Error('Doctor already Exists')
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const doctor = new Doctor({ ...req.body, password: hashedPassword });// assuming the input will have all the attributes of User Object with the hashed password
        await doctor.save();
        res.json({ success: 1 });
    } catch (err) {
        next(err);
    }
    // insert user
    // log
})
router.post('/login', async (req, res, next) => {
    try {
        
        // console.log(req.body);
        const doctor = await Doctor.findOne({ email: req.body.email } )
        const match = await bcrypt.compare(req.body.password, doctor.password);
        if (!match) throw new Error("Invalid Passowrd");

        const token = jwt.sign({
            fullName: doctor.fullName,
            email: doctor.email,
            phone: doctor.phone,
            role: doctor.role
        }, config.secret)


        res.json({ success: 1,data: token });
    } catch (err) {
        next(err);
    }
})
router.get('/appointments', auth, async (req, res, next) => {
    try{
        const doctor = await Doctor.findOne({ email: req.token.email})
        .select({ appointments: {$slice: 20}, email: 0, phone: 0, role: 0, password: 0});
        res.json({appointments: doctor.appointments})
    }catch(err){
        next(err)
    }
})
module.exports = router;
//'--------------------------------------------------'


