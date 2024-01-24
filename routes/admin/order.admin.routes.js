const express = require('express');
const orderRoutes = express.Router();

const { adminVerify } = require('../../helper/verify_token');
const { getOrder, getAllOrder, updateStatus } = require('../../controller/admin/admin.order.controller');

orderRoutes.get('/get-order/:id',adminVerify,getOrder);
orderRoutes.get('/get-all-order',adminVerify,getAllOrder);
orderRoutes.put('/update-status',adminVerify,updateStatus);


module.exports = orderRoutes;