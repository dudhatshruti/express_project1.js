// const User = require('../../model/user.model');
const UserService = require('../../services/user.service');
const userService = new UserService();

exports.getUser = async(req,res)=>{
    try {
        let user = await userService.getUserById(req.params.id);
        if (!user) {
            res.json({message:"user is not exist..."});
        }
        user.save();
        res.status(201).json(user);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error..."});
    }
}

exports.getAllUser = async(req,res)=>{
    try {
        let user = await userService.getAllUser();
        res.status(201).json(user);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error..."});
    }
}