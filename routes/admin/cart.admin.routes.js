const express = require('express');
const cartRoutes = express.Router();

const { adminVerify } = require('../../helper/verify_token');
const { getCart, getAllCart } = require('../../controller/admin/admin.cart.controller')

cartRoutes.get('/get-cart/:id',adminVerify,getCart);
cartRoutes.get('/get-all-cart',adminVerify,getAllCart);


module.exports = cartRoutes;




