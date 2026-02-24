const Group = require("../models/Group");

exports.createGroup = async({ name, creatorId, groupImage }) =>{
    const members = [creatorId];
    const admins = [creatorId];

    const group = await Group.create({
        name,
        creator: creatorId,
        members,
        admins,
        groupImage,
    });

    return group;
}

exports.findGroup = async (groupId) =>{
    const group = await Group.findById(groupId)
        .populate("members", "username email")
        .populate("admins", "username email");

    if (!group) throw new Error("Group not found");
    return group;
}

exports.deleteGroup  = async(groupId) =>{
    const group = await findGroup(groupId);
    await group.deleteOne();

    return { message: "Group deleted successfully" };
}

exports.addMember = async(groupId, userId) =>{
    const group = await findGroup(groupId);

    if (!group.members.includes(userId)) group.members.push(userId);
    await group.save();

    return group.members;
}

exports.removeMember = async(groupId, userId) =>{
    const group = await findGroup(groupId);
    group.members = group.members.filter(id => id.toString() !== userId.toString());
    group.admins = group.admins.filter(id => id.toString() !== userId.toString());
    await group.save()

    return group.members
}
exports.addAdmin = async(groupId, userId) =>{
    const group = await findGroup(groupId);
    if(!group.members.includes(userId)) throw new Error("User must be a member to be an admin.");
    if(!group.admins.includes(userId)) group.admins.push(userId);
    group.admins.push(userId);
    await group.save()

    return group.admins;
}

exports.removeAdmin = async(groupId, userId) =>{  
    const group = await findGroup(groupId);
    group.admins = group.admins.filter(id => id.toString() !== userId.toString());
    await group.save();

    return group.admins;
}

exports.deleteGroup = async(groupId, userId) =>{ 
    const group = await findGroup(groupId);
    if(userId.toString() !== group.creator.toString()){
        throw new Error (`user ${userId} not auth to delete group ${group._id}`)
    }
    await group.deleteOne()
    return {message : `group ${group.name} is deleted`}
};    

exports.leaveGroup = async(groupId, userId, userName) =>{ 
    const group = await findGroup(groupId);
    group.members = group.members.filter(id => id.toString() !== userId.toString());
    group.members = group.admins.filter(id => id.toString() !== userId.toString());
    await group.save();

    return {message : `user ${userName} left ${group.name}`}
};
