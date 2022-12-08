
const Group = require('../models/group');
const User = require('../models/user');



exports.createGroup = async (req, res) => {
    try {
        const {name, isAdmin} = req.body;
       
        //const group = await req.user.createGroup({name});
        // const groupuser = await UserGroup.update({isAdmin},{where:{groupId:group.id}});

        const group = await Group.create({name});
        res.status(201).json({message:'created successfully', group});
    }catch(err) {
        res.status(500).json({message: 'server error'});
    }
}

exports.getGroups = (req, res) => {
    
   Group.findAll({attributes:['id','name']})
        .then(groups => {
            res.status(200).json({success:true,groups});
        }).catch(err => {
            console.log(err);
            res.status(500).json({ message: 'server error' });
        })
}