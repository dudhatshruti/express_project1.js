const Order = require('../model/order.model');

module.exports = class orderService {
    orderCreate = async(body) =>{
        return await Order.create(body);
    }

    // get specific user
    orderFindOne = async(body)=>{
        return await Order.findOne(body);
    }
    
}
