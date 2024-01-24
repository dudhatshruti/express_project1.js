const Product = require('../model/product.model');


module.exports = class productService {
    productCreate = async(body) =>{
        return await Product.create(body);
    }

    // get specific product
    productFindOne = async(body)=>{
        return await Product.findOne(body);
    }

    // get specific product by id
    getProductById = async (id) =>{
        return await Product.findById(id);
    }

    // get all product
    AllProduct = async (query) =>{
        return await Product.find(query);

    }

    //  update product
    updateProduct = async ( id, body) =>{
        return await Product.findByIdAndUpdate( id,{$set: body},{new:true});
    }

    // delete user
    deleteProduct = async ( id) =>{
        return await Product.findByIdAndUpdate( id,{$set:{isDelete:true}},{new:true});
    }
    
}
