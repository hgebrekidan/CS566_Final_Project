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
        const {fullName, email, password, phone, role} = req.body
        if(!fullName || !email || !password || !phone || !role ){
            res.json('Fill out the blank spaces please');
        }
        
        const exists = await User.findOne({ email: req.body.email });

        if (exists) throw new Error('User already Exists')
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({ ...req.body, password: hashedPassword });// assuming the input will have all the attributes of User Object with the hashed password
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
        
        // console.log(req.body);
        const user = await User.findOne({ email: req.body.email } )
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw new Error("Invalid Passowrd");

        const token = jwt.sign({
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            role: user.role
        }, config.secret)


        res.json({ success: 1,data: token });
    } catch (err) {
        next(err);
    }
})
// router.get('/logs', auth, async (req, res, next) => {
//     try{
//         const user = await User.findOne({ email: req.token.email})
//         .select({ logs: {$slice: -5}, email: 0, phone: 0, location: 0, password: 0});
//         res.json({logs: user.logs})
//     }catch(err){
//         next(err)
//     }
// })
// admin user can list out all other users
router.get('/patients',auth, async (req, res, next)=>{
    try {
        const user = await User.findOne({email: req.token.email});
        console.log(user)
        if(user.role === 'admin'){
            const users = await User.find({_id: {$nin: [user._id]}}).select({password: 0});
            res.json({success: 1, data: users})
        }
        res.json('User does not have permission')
    } catch (err) {
        next(err)
    }
})
// admin user can add an other user
router.post('/users',auth, async (req, res, next)=>{
    try {
        const user = await User.findOne({email: req.token.email});
        
        if(user.role==='patient') res.json('Does not have access to do the operation!') 

            const password = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({fullName:req.body.fullName, email:req.body.email,password:password,
            phone: req.body.phone, role: 'patient'});
            const exists = await User.findOne({email: req.body.email})
            if(!exists) {
                
            await newUser.save()
            res.json("new user successfully added!")
            }else{res.json("This user already has an account!")
                
            }
        
    } catch (err) {
        next(err)
    }
})

module.exports = router;