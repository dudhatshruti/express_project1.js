const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/product_image')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname.replace(/\s+/g,"_")}`);
    }
})

const upload = multer({ storage: storage });


const ProductImageUpload = (req,res,next)=>{
    if (req.file) {
        req.product = `${req.file.path}`;
    }
    next();
}

module.exports = {upload, ProductImageUpload};