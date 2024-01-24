const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    items:[{
        cartItem:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'products'
        },
        quantity:{
            type:Number,
            default:1
        },
    }],
    ship_address:[{
        fullName:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        phoneNo:{
            type:String,
            required:true,
            unique:true
        },
        zipCode:{
            type:Number,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        district:{
            type:String,
            required:true
        }
    }],
    status:{
        type:String,
        enum:['pending','shiped','deliverd','cancle'],
        default:'pending'
    },
    totalAmount:{
        type:Number
    },
    isDelete:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('orders',orderSchema);
