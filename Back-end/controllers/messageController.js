const messageService = require("../services/messageService");

exports.sendMessage = async (req, res) => {
    try{
        const messageData = await messageService.sendMessage(req.body);
        res.status(201).json(messageData);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
}

exports.fetchMessages = async (req, res) => {
    try{
        const { userId, groupId } = req.query;
        const currentUserId = req.user._id;

        const messages = await messageService.fetchMessages({
            currentUserId,
            userId,
            groupId
        });

        res.status(200).json(messages);
    }catch(error){ 
        res.status(400).json({ message: error.message });
    }
}

exports.deleteMessage = async (req, res) => {
    try{
        const message = await messageService.deleteMessage({
            msgId : req.params.id,
            userId : req.user._id
        });

        res.status(200).json(message);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
}