const User = require("../models/User")

exports.searchUser = async (userId) =>{

    const user = User.findById(userId);
    if(!user){
        throw new Error("user not found !!")
    }

    return user
}