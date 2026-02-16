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

exports.deleteGroup  = async(groupId) =>{

    const group = await findGroup(groupId);
    await group.delete();

    return {message : "Group deleted!!"}
}

exports.findGroup = async (groupId) =>{

    const group = Group.findById(groupId);
    if(!group){
        throw new Error("group not found !!")
    }

    return group
}


exports.addMember = async(groupId, userId) =>{

    const group = await findGroup(groupId);
    group.members.push(userId);
    await group.save()

    return group.members
}

exports.dropMember = async(groupId, userId) =>{
        
    const group = await findGroup(groupId);
    group.members.delete(userId);
    await group.save()

    return group.members
}
exports.addAdmin = async(groupId, userId) =>{
    
    const group = await findGroup(groupId);
    group.admins.push(userId);
    await group.save()

    return group.admins
}

exports.dropAdmin = async(groupId, userId) =>{
        
    const group = await findGroup(groupId);
    group.admins.delete(userId);
    await group.save()

    return group.admins
}


