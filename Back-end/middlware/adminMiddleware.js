const groupService = require("../services/groupService.js");

exports.isAdmin = async (groupId, userId, next) => {
    try {
        
        const group = await groupService.findGroup(groupId);
        // const user = find(userId);

        if(!group.members.includes(userId)){
            throw new Error("this user is not an admin of this group.")
        }

        next()
        
    }catch(error){
        res.status(400).json({message : error.message})
    }
}