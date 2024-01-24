const Order = require('../../model/order.model');
const Cart = require('../../model/cart.model');
const Orderservice = require('../../services/order.service');
const orderService = new Orderservice();

exports.addOrder = async(req,res)=>{
    try {
        let {fullName,address,phoneNo,zipCode,country,city,district} = req.body;
        let cartItem = await Cart.find({user:req.user._id,isDelete:false}).populate('cartItem');
        console.log(cartItem);
        // if (cartItem.items == null) {
        //    return res.json({message:"user have not any cart..."});
        // }
        let order = cartItem.map((item)=>({
            cartItem : item.cartItem._id,
            quantity: item.quantity,
            price: item.cartItem.price
        }))
        console.log(order);
        let totalPrice  = order.reduce(((total,item)=>total+=(item.quantity * item.price)),0);
        console.log(totalPrice);

        let newOrder = await Order.create({
           user:req.user._id,
           items:order,
           totalAmount : totalPrice,
           ship_address:{
            fullName,address,phoneNo,zipCode,country,city,district
           }
        })
        newOrder.save();
        await Cart.updateMany({user:req.user._id},{isDelete:true});
        res.status(201).json({order:newOrder, message:'order placed'});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

exports.updateOrder = async(req, res) => {
    let { fullName, address,phoneNo, zipCode, country, district, city } = req.body;
    try {
        let order = await Order.findOne({user:req.user._id,isDelete:false});
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.ship_address = {
            fullName: fullName,
            address: address,
            phoneNo:phoneNo,
            zipCode: zipCode,
            country: country,
            district: district,
            city: city
        };
       await order.save();
        res.status(200).json({ order, message: 'Shipping address updated successfully' });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteOrder = async(req ,res)=>{
    try {
        let id = req.params.id;
        let order = await Order.findById(id);
        order = await Order.findOneAndUpdate(
            {_id:id},
            {$set:{isDelete:true}},
            {new:true}
        )
        res.json({message:"deleted",order})
    } 
    catch (error) {
         console.error(error);
         res.status(500).json({ message: 'Internal server error' });
     }
}