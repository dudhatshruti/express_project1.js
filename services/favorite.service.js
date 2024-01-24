const Favorite = require('../model/favorite.model');

module.exports = class favoriteService {
    favCreate = async(body) =>{
        return await Favorite.create(body);
    }

    // get specific user
    favFindOne = async(body)=>{
        return await Favorite.findOne(body);
    }
    
}
