const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    rating:{
        type:Number,
        default:0,
        required:true,
    },
    comment:{
        type:String,
    },
    datePosted:{
        type:Date,
        default:Date.now
    },
    isDelete:{
        type:Boolean,
        default:false
    }
})


const productSchema = new mongoose.Schema({
   
    productImage:[{
        type:String,
    }],
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    categories:{
        type:String,
        required:true,
        enum:['chair','armchair','table','bed','lamp','desk']
    },
    colors:{
        type:String,
        required:true,
        enum:['black','brown','white','green']
    },
    price:{
        type:Number,
        required:true
    },
    reviews:[reviewSchema],
    numReviews:{
        type:Number,
        default:0
    },
    rating:{
        type:Number,
        default:0,
    },
    isDelete:{
        type:Boolean,
        default:false
    }

})

module.exports = mongoose.model('products',productSchema);