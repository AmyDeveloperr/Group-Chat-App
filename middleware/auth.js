const jwt = require('jsonwebtoken');

const User = require('../models/user');



const authentication = async (req, res, next)=>{
    try{
        const token = req.header('Authorization');
    
        const user = jwt.verify(token, process.env.TOKEN_SECRET)
       

        const userFound = await User.findByPk(user.userId);  //return u id of the row in table id=1 like that
            console.log(JSON.stringify(user));
            req.user = userFound;  //global req object accross funcitons
            next();
    }
    catch(error)
    {
        console.log(error);
    }
}



module.exports = {authentication};