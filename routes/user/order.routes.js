const express = require('express');
const orderRoutes = express.Router();
const {  userTokenVerify,userverify } = require('../../helper/verify_token');
const { addOrder, updateOrder, deleteOrder,  }= require('../../controller/user/order.controller');

orderRoutes.post('/add-order',userTokenVerify,userverify,addOrder);
orderRoutes.put('/update-order',userTokenVerify,userverify,updateOrder);
orderRoutes.delete('/delete-order/:id',userTokenVerify,userverify,deleteOrder);


module.exports = orderRoutes;
