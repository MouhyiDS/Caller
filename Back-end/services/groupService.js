const Group = require("../models/Group");

exports.createGroup = async(req ,res) =>{

    let members = [];
    members.push(req.user._id);

    const group = await Group.create({
        name: req.name,
        creator: req.user._id,
        members,
        admins : members,
        groupImage : req.groupImage
    })

    return group
}

exports.find = async (groupId) =>{

    const group = Group.findById(groupId);
    if(!group){
        throw new Error("group not found !!")
    }

    return group
}


exports.addMember = async(groupId, userId) =>{
    const group = find(groupId);

    
}

exports.dropMember = async(req, res) =>{
    
}
exports.addAdmin = async(req, res) =>{
    
}

exports.dropAdmin = async(req, res) =>{
    
}


