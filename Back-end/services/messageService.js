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
    if(groupId){
        return await Messsage.find({ group: groupId }).sort({ createdAt: 1 }).populate("sender", "username email").populate("group", "name");
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

        if(userId.toString() != message.sender.toString()){
            throw new Error("user not auth to delete the message")
        }

        await message.deleteOne();
        
        return {message : "message deleted!!"}
    }



