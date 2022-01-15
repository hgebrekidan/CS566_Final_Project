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

module.exports = router;