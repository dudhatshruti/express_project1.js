const express = require('express');
const adminRoutes = express.Router();

const { adminVerify } = require('../../helper/verify_token');
const { getUser, getAllUser } = require('../../controller/admin/admin.controller');

adminRoutes.get('/get-user/:id',adminVerify,getUser);
adminRoutes.get('/get-all-user',adminVerify,getAllUser);


module.exports = adminRoutes;