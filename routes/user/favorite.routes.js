const express = require('express');
const favoriteRoutes = express.Router();
const {  userTokenVerify,userverify } = require('../../helper/verify_token');
const { addFavorite, deleteFavorite } = require('../../controller/user/favorite.controller');

favoriteRoutes.post('/add-favorite',userTokenVerify,userverify,addFavorite)
favoriteRoutes.delete('/delete-favorite/:id',userTokenVerify,userverify,deleteFavorite)

module.exports = favoriteRoutes;