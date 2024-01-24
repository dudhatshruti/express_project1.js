const Order = require('../../model/order.model');

exports.getOrder = async(req,res)=>{
    try {
        let id = req.params.id;
        let order = await Order.findById(id);
        if (!order) {
            return res.json({message:"user is not found..."});
        }
        res.json(order);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

exports.getAllOrder = async(req,res)=>{
    try {
        let order = await Order.find();
        if (!order) {
            res.json({message:"no any order"});
        }
        res.json(order);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

exports.updateStatus = async(req,res)=>{
    try {
        let {status} = req.body;
        let id = await req.params.id;
        let order = await Order.findById(id);
        if (!order) {
            res.json({message:"not found order"})
        }
        order.status = {
            status:status
        } 
        order.save();
        res.status(201).json({message:"status updated",order});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}