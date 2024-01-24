const Cart = require('../../model/cart.model');

exports.getCart = async(req,res)=>{
    try {
    let id =await req.params.id;
       let cart = await Cart.findOne({_id:id});
       if (!cart) {
           return  res.json({message:"user has does not any cart..."})
       }
       res.status(201).json(cart);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error..."});
    }
}

exports.getAllCart = async(req,res)=>{
    try {
        let cart = await Cart.find({isDelete:true});
        if (!cart) {
           return res.json({message:"cart is not found..."});
        }
        cart.save();
        res.status(201).json(cart);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error..."});
    }
}