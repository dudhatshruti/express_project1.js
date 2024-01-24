const Product = require('../../model/product.model');
const ProductService = require('../../services/product.service');
const productService = new ProductService();

exports.addNewProducts = async(req,res)=>{
    try {
       
        let product = await productService.productFindOne({title:req.body.title});
        if (product) {
            return res.json({message:"product is already available..."});
        }
        product = await productService.productCreate({
            ...req.body
        });
        if (req.file) {
            user.productImage = req.file.path;
        }
        res.json({message:'product is added.',product})
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

exports.updateProduct = async(req,res)=>{
    try {
        let id = req.params.id;
        let product =await productService.getProductById(id);
        if (!product) {
           return res.json({message:"product is not available"});
        }
        product = await Product.findByIdAndUpdate(
            { _id : id},
            {$set:{...req.body}},
            {new:true}
        ) 
        product.save();
        res.status(201).json({message:"product is updated...",product});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

exports.deleteProduct = async(req,res)=>{
    try {
        let product = await productService.getProductById(req.params.id);
        if (!product) {
           return res.json({message:"product is not available..."});
        }
        product = await productService.deleteProduct(
            product._id,
        )
        product.save();
        res.status(201).json({message:"product is deleted...",product});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

exports.getProduct = async(req,res)=>{
    try {
        let product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.status({message:"product is not available"});
        }
        res.status(201).json(product);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

exports.getALLProduct = async(req,res)=>{
    try {
        let product = await productService.AllProduct();
        if (!product) {
            return res.status({message:"product is not available"});
        }
        res.status(201).json(product);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}




exports.getAllReview = async(req,res)=>{
    try {
        let product = await Product.findById(req.params.id);
        const allReview = product.reviews;
        return res.json({message:"all users review",allReview});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}