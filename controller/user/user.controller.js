const User = require('../../model/user.model');
const Randomstring = require('../../helper/node_mailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserService = require('../../services/user.service');
const userService = new UserService();
const crypto = require('crypto');

exports.signup = async(req,res)=>{
    try {
        let user = await userService.userFindOne({email:req.body.email,isDelete:false});
        if (user) {
            return res.json({message:"user is already exists..."});
        }
        let hashpassword = await bcrypt.hash(req.body.password,10);
        user = await userService.userCreate({
            ...req.body,
            password:hashpassword,
        })
        if (req.file) {
            user.profileImage = req.file.path;
        }
        user.save();
        res.status(201).json({message:"user is added",user});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error..."});
    }
}

exports.login = async(req,res)=>{
    try {
        let user =await userService.userFindOne({email:req.body.email});
        if (!user) {
            return res.json({message:"user is not found..."});
        }
        let checkPassword = await bcrypt.compare(req.body.password,user.password);
        if (!checkPassword) {
            return res.json({message:"password is not match..."});
        }
        let payload = {
            userId : user._id
        }
        let token = await jwt.sign(payload,process.env.SECRET_KEY);
        res.status(200).json({token,message:'login sucess'});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error..."});
    }
}

exports.updateUser = async(req,res)=>{
    try {
       let user = await userService.updateUserById(
           req.user._id,
          { ...req.body}
        )
        user.save();
        res.status(201).json({message:"user is updated",user});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error..."});
    }
}

exports.deleteUser = async(req, res)=>{
    try {
       let user = await userService.deleteUserById(
        req.user._id,
        {...req.body}
        )
        res.status(201).json({message:"user is deleted...",user});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

exports.resetPassword = async(req,res)=>{
    try {
        let {curr_password,new_password,confirm_password} = req.body;
        let checkPassword = await bcrypt.compare(curr_password,req.user.password);
        if (!checkPassword) {
            res.json({message:"password is incorrect..."});
        }
        if (new_password != confirm_password) {
            res.json({message:"not confirm password..."})
        }
        let hashPassword = await bcrypt.hash(new_password,10);
        new_password = await User.findByIdAndUpdate(
            req.user._id,
            {$set:{password:hashPassword}}
        )
        res.json({message:"password is changed",new_password});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}





exports.forgetPassword = async (req, res) => 
{
  try
  {
   const {email}=req.body;
   const user=await User.findOne({email:email});
   if(user)
   {
    const randomstring = Randomstring.generate();
    let data = await User.findByIdAndUpdate({email:email},{$set:{resetToken:randomString}})
    sendResetPasswordMail(user.fname,user.email,randomstring)
   }
  }
  catch(error)
  {
    console.log(error)
    res.json({message:'internal server error'})
  }
  

}