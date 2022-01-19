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
        
        const {firstName, lastName, gender, birthDate, email, password, phone, address, city, state, zipCode } = req.body
        if(!firstName || !email || !lastName || !gender || !birthDate || !password || !phone || !address || !city || !state || !zipCode ){
            res.json('Fill out the blank spaces please');
        }
        
        const exists = await User.findOne({ email: req.body.email });
        console.log("exists "+exists)
        if (exists) res.json('User already Exists')
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({ ...req.body, password: hashedPassword , role: 'patient'});// assuming the input will have all the attributes of User Object with the hashed password
        await user.save();
        res.json({ success: 1 , data: user});
    } catch (err) {
        next(err);
    }
    // insert user
    // log
})
router.post('/login', async (req, res, next) => {
    console.log(req.body)
    try {
        
        // console.log(req.body);
        const user = await User.findOne({ email: req.body.email } )
        console.log(user);
        // console.log("1234 bbbbbbbbb" )
        const match = await bcrypt.compare(req.body.password, user.password);
        console.log(match);
        // console.log("1234567ccccc")
        if (!match) throw new Error("Invalid Passowrd");

        const token = jwt.sign({
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            birthDate: user.birthDate,
            email: user.email,
            phone: user.phone,
            address: user.address,
            city: user.city,
            state: user.state,
            zipCode: user.zipCode,
            role: user.role
        }, config.secret)

// console.log(token);
        res.json({ success: 1,token: token });
    } catch (err) {
        next(err);
    }
})

// admin user can list out all other users
router.get('/users',auth, async (req, res, next)=>{
    try {
        const user = await User.findOne({email: req.token.email});
        console.log(user)
        if(user.role === 'admin'){
            const users = await User.find({_id: {$nin: [user._id]}}).select({password: 0});
            res.json({success: 1, data: users})
        }
        res.json({error: 'User does not have permission'})
    } catch (err) {
        next(err)
    }
})
// admin can search the specific user using id
router.get('/users/:id',auth, async (req, res, next)=>{
    try {
        const user = await User.findOne({email: req.token.email});
        console.log(user)
        if(user.role === 'admin'){
            const user = await User.find({_id: new Object(req.params.id)});
            res.json({success: 1, data: user})
        }
        res.json({error: 'User does not exist'})
    } catch (err) {
        next(err)
    }
})
// admin can search the specific user using email
router.get('/users/:email',auth, async (req, res, next)=>{
    try {
        const user = await User.findOne({email: req.token.email});
        console.log(user)
        if(user.role === 'admin'){
            const user = await User.find({email: req.params.email});
            res.json({success: 1, data: user})
        }
        res.json({error: 'User does not exist'})
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
// admin can delete another user by id
router.delete('/users/:id',auth, async (req, res, next)=>{
    try {
        const adminUser = await User.findOne({email: req.token.email});
        console.log(adminUser)
        if(adminUser.role === 'admin'){
            const user = await User.deleteOne({_id: new Object(req.params.id)});
            if(user.deletedCount === 0) res.json({errMsg: 'User does not exist'})
            res.json({success: 1, data: user})
        }
        
    } catch (err) {
        next(err)
    }
})
router.patch('/users/:id',auth, async (req, res, next)=>{
    try {
        const adminUser = await User.findOne({email: req.token.email});
        console.log(adminUser)
        if(adminUser.role === 'admin'){
            const user = await User.updateOne({_id: new Object(req.params.id)},
            {
                $set: { firstName: req.body.firstName, lastName: req.body.lastName,
             gender: req.body.gender, birthDate: req.body.birthDate, email: req.body.email, password: req.body.password, 
            phone: req.body.phone, address: req.body.address, city: req.body.city, state: req.body.state, zipCode: req.body.zipCode }
            });
            const updatedUser = await User.findOne({_id: new Object(req.params.id)}).select({_id: 0})
            // if(user.matchedCount === 1) res.json({error: 'User does not exist'})
            res.json({success: 1, data: updatedUser})
        }
        
    } catch (err) {
        next(err)
    }
})

module.exports = router;