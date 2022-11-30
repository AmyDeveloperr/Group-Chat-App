const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const User = require('./models/user');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { serialize } = require('v8');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/user/signup', async (req, res, next) => {
   const {name, email, phone, password} = req.body;
   if (!name || !email || !phone || !password) {
    return res.status(403).json({sucess:false, message:'user already exists'})
   }
   try {
    const user = await User.findAll({where:{email}});

    if(user.lenght > 0) {
        return res.status(401).json({success: false, message:'user already exists'});
    } else {
        bcrypt.hash(password, 10, async(err, hash)=> {
            await User.create({name, email, phone, password:hash});
            res.status(201).json({success: true, message: 'user successfully created'});
        })
    }
   }catch (err) {
    res.status(500).json({message: 'something went wrong'});
   }
   
})

sequelize
  .sync({force:true})
  .then(result => {
    // console.log(result);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
