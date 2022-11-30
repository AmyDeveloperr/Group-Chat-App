const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.signunp = async (req, res, next) => {
    const {name, email, phone, password} = req.body;
    if (!name || !email || !phone || !password) {
     return res.status(403).json({sucess:false, message:'user already exists'})
    }
    try {
     const user = await User.findAll({where:{email}});
 
     if(user.length > 0) {
         return res.status(207).json({success: false, message:'user already exists'});
     } else {
         bcrypt.hash(password, 10, async(err, hash)=> {
             await User.create({name, email, phone, password:hash});
             res.status(201).json({success: true, message: 'signed up successfully'});
         })
     }
    }catch (err) {
     res.status(500).json({message: 'something went wrong'});
    }
    
 }