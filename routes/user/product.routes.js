const express = require('express');
const productRoutes = express.Router();
const {userverify, userTokenVerify}  = require('../../helper/verify_token');
const { getProduct, getALLProduct, addReview, getReview, getAllReview, updateReview, productCategory, deleteReview  } = require('../../controller/user/product.controller');

productRoutes.get('/get-product/:id',userverify,getProduct);
productRoutes.get('/get-all-product',userverify,getALLProduct);
productRoutes.get('/get-categories/:categories',userverify,productCategory);



productRoutes.post('/:id/add-review',userTokenVerify,userverify,addReview);
productRoutes.get('/:id/get-review',userTokenVerify,userverify,getReview);
productRoutes.get('/:id/get-all-review',userTokenVerify,userverify,getAllReview);
productRoutes.put('/:id/update-review',userTokenVerify,userverify,updateReview);
productRoutes.delete('/:id/delete-review',userTokenVerify,userverify,deleteReview);





module.exports = productRoutes;
