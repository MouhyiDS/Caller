const User = require("../models/User")

exports.find = async (userId) =>{

    const user = User.findById(userId);
    if(!user){
        throw new Error("user not found !!")
    }

    return user
}