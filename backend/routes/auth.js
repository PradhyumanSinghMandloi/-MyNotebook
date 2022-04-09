const express =require('express');
const router= express.Router();
const User= require('../models/User');
const {body , validationResult } = require(`express-validator`);

//create a User using :POST "/api/auth". Doesnt require auth
router.post('/createuser',[
    body(`name`, `Enter a valid name`).isLength( {min :3}),
    body(`email`, `Enter a valid email`).isEmail(),
    body(`password`, `password must be atleast 5 characters`).isLength({min :5}),

] , async (req, res)=>{
//if there are errors , return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check for unique email before creating email
   try{

   
   
    let user = await  User.findOne({email : req.body.email});
    if (user) {
        return  res.status(400).json({error : "Sorry a user with this email already exists"})
    }
    
    user = await  User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      })
      
   
      res.json({"Nice" : "nice" })

    }
    catch(error){
        console.log(error.message);
        res.status(500).send("some error occured");
    }
      })

 



module.exports= router 