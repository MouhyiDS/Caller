const groupService = require("../services/groupService.js");

exports.adminMiddleware = async (req, res, next) => {
    try {
        
        const group = await groupService.findGroup(req.params.groupId);
        const id = req.user._id.toString(); 

        if(!group.members.map(id => id.toString()).includes(id)){
            return  res.status(403).json({ message: "User is not an admin of this group",
                user: id,
                group: req.params.groupId
             });
        }

        next()
    }catch(error){
        res.status(400).json({message : error.message})
    }
}