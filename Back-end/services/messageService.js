const Message = require('../models/Message');

exports.sendMessage = async ({sender, receiver, group, content, type}) => {
    return await Message.create({
        sender,
        receiver,
        group,
        content,
        type
    })
}
exports.fetchMessages = async ({ currentUserId, userId, groupId}) => {

        if (groupId) {

        const group = await Group.findById(groupId);

        if (!group) throw new Error("Group not found");

        const isMember = group.members.includes(currentUserId);

        if (!isMember) {
            throw new Error("Not authorized to view this group");
        }

        return await Message.find({ group: groupId })
            .sort({ createdAt: 1 })
            .populate("sender", "username email")
            .populate("group", "name");
    }
    
    return await Message.find({ 
        $or: [
            { sender: currentUserId, receiver: userId },
            { receiver: currentUserId, sender: userId }
        ]
    }).sort({ createdAt: 1 })
    .populate("sender", "username email")
    .populate("receiver", "username email");
}
exports.deleteMessage = async ({msgId, userId}) => {
        const message = await Message.findById(msgId);

        if(!message){
            throw new Error("message not found");
        }

        if (message.group) {

            const group = await Group.findById(message.group);

            const isAdmin = group.admins.includes(userId);

            if (
                userId.toString() !== message.sender.toString() &&
                !isAdmin
            ) {
                throw new Error("Not authorized");
            }
        }

        await message.deleteOne();
        
        return {message : "message deleted!!"}
    }



