const express = require('express');
const cartRoutes = express.Router();
const {  userTokenVerify,userverify } = require('../../helper/verify_token');
const { addCart, updateCart, deleteCart, getCart, getAllCart }= require('../../controller/user/cart.controller');

cartRoutes.post('/add-cart',userTokenVerify,userverify,addCart)
cartRoutes.put('/update-cart/:id',userTokenVerify,userverify,updateCart);
cartRoutes.delete('/delete-cart/:id',userTokenVerify,userverify,deleteCart)
cartRoutes.get('/get-cart/:id',userTokenVerify,userverify,getCart);
cartRoutes.get('/get-all-cart',userTokenVerify,userverify,getAllCart);

module.exports = cartRoutes;