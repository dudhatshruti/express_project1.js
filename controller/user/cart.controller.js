const Cart = require('../../model/cart.model');
const Product = require('../../model/product.model');
const CartService = require('../../services/cart.service');
const cartService = new CartService();


exports.addCart = async(req,res)=>{
    try {
        let {cartItem} = req.body;
        let product = await Product.findById(cartItem);
        if (!product) {
           return res.json({message:"product is not found..."});
        }
        let cart = await cartService.cartFindOne({cartItem:req.body.cartItem,user:req.user._id});
        if (cart) {
            return res.json({message:"cart is already exist..."});
        }
        cart = await cartService.CartCreate({
            ...req.body,
            user:req.user._id,
        })
        cart.save();
        res.status(201).json({message:"cart is added",cart});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error..."});
    }
}

exports.updateCart = async (req, res) => {
    try {
      let id = req.params.id;
      let cart = await cartService.cartFindOne({ _id: id, user: req.user._id ,isDelete:false});
      if (!cart) {
        return res.json({ message: "cart is not available for this User" });
      }
      cart = await cartService.updateCartById(
        {_id:id},
        {...req.body}
    )
      cart.save();
      res.status(201).json({ message: "update cart success" ,cart});
    } 
    catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server Error" });
    }
};


exports.deleteCart = async(req,res)=>{
    try {
        let id = await req.params.id;
        let cart = await Cart.findOne({_id:id,user:req.user._id,isDelete:false});
        console.log(id);
        if (!cart) {
            return res.json({message:'user has does not any cart...'});
        }
        cart = await cartService.deleteCartById(
            {_id:id},
            {...req.body}
        )
        cart.save();
        res.json({message:'cart is deleted',cart});    
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error..."});
    }
}


exports.getCart = async(req,res)=>{
    try {
    let id =await req.params.id;
       let cart = await Cart.findOne({_id:id,user:req.user._id});
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
        let cart = await Cart.find({isDelete:false});
        if (!cart) {
           return res.json({message:"cart is not found..."});
        }
        res.status(201).json(cart);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error..."});
    }
}