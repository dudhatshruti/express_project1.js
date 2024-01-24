const express = require('express');
const userRoutes = express.Router();
const { userverify } = require('../../helper/verify_token');
const { signup, login, updateUser, deleteUser, resetPassword, forgetPassword } = require('../../controller/user/user.controller');
const { upload,ProfileImageUpload } = require('../../helper/profile_image');



userRoutes.post('/signup',upload.single('profileImage'),ProfileImageUpload,signup);
userRoutes.post('/login',login);
userRoutes.put('/update-user',userverify,updateUser);
userRoutes.delete('/delete-user',userverify,deleteUser);
userRoutes.put('/reset-password',userverify,resetPassword);
userRoutes.post('/forget-password',userverify,forgetPassword);




module.exports = userRoutes;