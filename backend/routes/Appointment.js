const express = require('express');
const Farmer = require('../models/Appointment');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/farmers', async (req, res, next)=>{

   
    try{
        // console.log(req.body);
        const exists = await Farmer.findOne({name: req.body.name});
        // console.log(exists);
    if(exists){
       res.json("farmer already exists!");
    }else{
         const farmer = new Farmer({name:req.body.name, address: req.body.address, phone: req.body.phone});
    await farmer.save();
    res.json({success: 1})
        
    }
    
    }catch(err){
        next(err);
    }
})
router.get('/farmers', async(req, res, next)=>{
    try{
        const products = await Farmer.find();
    res.json({products: products});
    }catch(err){
        next(err);
    }
    
})
router.get('/farmers/:name', async(req, res, next)=>{
    try{
        const product = await Farmer.findOne({name: req.params.name});
        if(product) res.json({product: product})
        res.json("Product doesn't exist!")
    }catch(err){
        next(err);
    }
})
router.delete('/products/:name', async(req, res, next)=>{
    try{
        const product = await Farmer.findOne({name: req.params.name});
        if(!product) res.json("Product doesn't exist!")
        const prod = await Farmer.deleteOne({_id: product._id});
        console.log(prod);
        const products = await Farmer.find();
        res.json({products: products})
    }catch(err){
        next(err);
    }
})
router.get('/farmers/:name/products', async(req, res, next)=>{
    try{
        const farmer = await Farmer.findOne({name: req.params.name});
        if(farmer) res.json({name: farmer.name, products: farmer.products});
        res.json('Farmer does not exist!')
    }catch(err){
        next(err);
    }
})
router.post('/farmers/products', async(req, res, next)=>{
    try{
        const farmer = await Farmer.findOne({name: req.body.name});
        console.log(farmer);
        if(farmer){
            const product = await farmer.products.find(item=>{
                return item.productId===req.body.product.productId;
            })
            console.log(product);
            if(product){
                await Farmer.updateOne({_id: farmer._id, 'products.productId': product.productId},
                {
                    $set: {'products.$.count': product.count+ req.body.product.count}
                })
                res.json('count adjusted on existing product')
            }else{
                await Farmer.updateOne({_id:farmer._id}, {$push: {products:req.body.product}});
                res.json('new product added')
            }
        }else{
            let products = [];
            const prod = await new Farmer({name: req.body.name,address:req.body.address, phone: req.body.phone});
            prod.products.push(req.body.product);
            console.log(prod);
            await Farmer.insertMany(prod);
            res.json('new farmer added')
        }
        res.json('Farmer does not exist!')
    }catch(err){
        next(err);
    }
})
module.exports = router;