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
    }).sort({ createdAt: 1 }).populate("sender", "username email").populate("receiver", "username email");
}
exports.deleteMessage = async ({msgId}) => {
        return await Message.deleteOne({ _id: msgId })
    }



