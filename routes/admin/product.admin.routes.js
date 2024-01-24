const express = require('express');
const productRoutes = express.Router();

const { adminVerify } = require('../../helper/verify_token');
const { upload,ProductImageUpload } = require('../../helper/product_image');
const { addNewProducts, updateProduct, deleteProduct, getProduct, getALLProduct } = require('../../controller/admin/admin.product.controller');
const { getAllReview, getReview } = require('../../controller/admin/admin.product.controller');

productRoutes.post('/add-product',upload.array('productImage',5),ProductImageUpload,adminVerify,addNewProducts);
productRoutes.put('/update-product/:id',adminVerify,updateProduct);
productRoutes.delete('/delete-product/:id',adminVerify,deleteProduct);
productRoutes.get('/get-product/:id',adminVerify,getProduct);
productRoutes.get('/get-all-product',adminVerify,getALLProduct);

productRoutes.get('/:id/get-all-review',adminVerify,getAllReview);






module.exports = productRoutes;