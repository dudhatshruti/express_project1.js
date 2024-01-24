const express = require('express');
const user = express.Router();

const userRoutes = require('./user.routes');
const productRoutes = require('./product.routes');
const cartRoutes = require('./cart.routes');
const favoriteRoutes = require('./favorite.routes');
const orderRoutes = require('./order.routes');

user.use('/user',userRoutes);
user.use('/product',productRoutes);
user.use('/cart',cartRoutes);
user.use('/favorite',favoriteRoutes);
user.use('/order',orderRoutes);





module.exports = user;