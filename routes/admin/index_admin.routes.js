const express = require('express');
const admin = express.Router();

const adminRoutes = require('./admin.routes');
const productRoutes = require('./product.admin.routes');
const orderRoutes = require('./order.admin.routes');
const cartRoutes = require('./cart.admin.routes');

admin.use('/admin',adminRoutes);
admin.use('/admin-product',productRoutes);
admin.use('/admin-cart',cartRoutes);
admin.use('/admin-order',orderRoutes);
admin.use('/admin-order',orderRoutes);




module.exports = admin;
