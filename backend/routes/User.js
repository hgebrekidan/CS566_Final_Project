const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const config = require('../config.json');
const auth = require('../middleware/auth');

const router = express.Router();


router.post('/signup', async (req, res, next) => {
    // input req.body
    try {
        // console.log(req.body);
        const exists = await User.findOne({ email: req.body.email });

        if (exists) throw new Error('User already Exists')
        const password = await bcrypt.hash(req.body.password, 10);
        const user = new User({ ...req.body, password });// assuming the input will have all the attributes of User Object with the hashed password
        await user.save();
        res.json({ success: 1 });
    } catch (err) {
        next(err);
    }
    // insert user
    // log
})
router.post('/login', async (req, res, next) => {
    try {
        let different_location = false;
        // console.log(req.body);
        const user = await User.findOne({ email: req.body.email } )
            .select({ logs: { $slice: -1}, location: 0});
        // console.log(user);


        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw new Error("Invalid Passowrd");

        const update = await User.updateOne({ email: req.body.email }, {
            $push: {
                logs: {
                    timestamp: Date.now(),
                    city: req.body.city,
                    state: req.body.state
                }
            }
        });
        if (req.body.city !== user.logs[0].city || req.body.state !== user.logs[0].state) {
            different_location = true;
        }

        const token = jwt.sign({
            email: user.email,
            phone: user.phone
        }, config.secret)


        res.json({ success: 1, different_location, token });
    } catch (err) {
        next(err);
    }
})
router.get('/logs', auth, async (req, res, next) => {
    try{
        const user = await User.findOne({ email: req.token.email})
        .select({ logs: {$slice: -5}, email: 0, phone: 0, location: 0, password: 0});
        res.json({logs: user.logs})
    }catch(err){
        next(err)
    }
})



module.exports = router;