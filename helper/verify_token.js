const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

exports.userverify = async(req,res,next)=>{
    try {
    let token = req.headers["authorization"].split(" ")[1];
    let {userId} = jwt.verify(token,process.env.SECRET_KEY);
    // console.log(userId);
    req.user = await User.findById(userId);
    if (req.user) {
        next();
    }
    else
    {
        res.json({message:'user invalid'});
    }
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"invalid token..."});
    }
   
}

exports.adminVerify = async(req,res,next)=>{
    try{
    let token = req.headers["authorization"].split(" ")[1];
    let {userId} = jwt.verify(token,process.env.SECRET_KEY);
    const user = await User.findById(userId);
    if (user && user.role === 'admin') {
        req.user = user;
        next();
    } 
    else
    {
        res.json({message:' only admin access this process,plz enter valid token'});
    }
    }
   catch (error) {
    console.log(error);
    res.status(500).json({message:"invalid token..."});
    }
}   

exports.userTokenVerify = async(req,res,next)=>{
    try{
    let token = req.headers["authorization"].split(" ")[1];
    let {userId} = jwt.verify(token,process.env.SECRET_KEY);
    const user = await User.findById(userId);
    if (user && user.role === 'user') {
        req.user = user;
        next();
    } 
    else
    {
        res.json({message:'admin does not access this process'});
    }
    }
   catch (error) {
    console.log(error);
    res.status(500).json({message:"invalid token..."});
    }
}   