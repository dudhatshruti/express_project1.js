const Cart = require('../model/cart.model');

module.exports = class userService {
    CartCreate = async(body) =>{
        return await Cart.create(body);
    }

    // get specific user
    cartFindOne = async(body)=>{
        return await Cart.findOne(body);
    }

    // get specific user by id
    getCartById = async (id) =>{
        return await Cart.findById(id);
    }

    // get all user
    getAllCart = async (query) =>{
        return await Cart.find(query);

    }

    //  update user
    updateCartById = async ( id, body) =>{
        return await Cart.findByIdAndUpdate( id,{$set: body},{new:true});
    }

    // delete user
    deleteCartById = async ( id) =>{
        return await Cart.findByIdAndUpdate( id,{$set:{isDelete:true}},{new:true});
    }
    
}
