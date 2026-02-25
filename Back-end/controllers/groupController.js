const groupService = require("../services/groupService");

exports.createGroup = async (req ,res) =>{
    try{
        const { name , imageGroupe} = req.body;
        const group = await groupService.createGroup({
            name,
            creator: req.user._id,
            imageGroupe
        }
        );
        
        res.status(201).json(group)
    }catch(e){
        res.status(400).json({message : e.message})
    }
}

exports.getGroup = async (req ,res) =>{
    try{

        const group = await groupService.findGroup(req.params.groupId);
        res.json(group)
        
    }catch(e){
        res.status(404).json({message : e.message})
    }
}

exports.deleteGroup = async (req ,res) =>{
    try{
        const group = await groupService.deleteGroup(req.params.groupId, req.user._id);
        res.json(group)
    }catch(e){
        res.status(400).json({message : e.message})
    }
}


exports.addMember = async (req ,res) =>{
    try{
        const members = await groupService.addMember(req.params.groupId, req.body.userId);
        res.json({members})
    }catch(e){
        res.status(400).json({message : e.message})
    }
}

exports.removeMember = async (req ,res) =>{
    try{
        const members = await groupService.removeMember(req.params.groupId,req.params.userId);
        res.json({members})
    }catch(e){
        res.status(400).json({message : e.message})
    }
}

exports.addAdmin = async (req ,res) =>{
    try{
        const admins = await groupService.addAdmin(req.params.groupId, req.body.userId);
        res.json({admins})
    }catch(e){
        res.status(400).json({message : e.message})
    }
}

exports.removeAdmin = async (req ,res) =>{
    try{
        const admins = await groupService.removeAdmin(req.params.groupId,req.params.userId);
        res.json({admins})
    }catch(e){
        res.status(400).json({message : e.message})
    }
}

exports.leaveGroup = async (req ,res) =>{
    try{
        const result = await groupService.leaveGroup(req.params.groupId, req.user._id);
        res.json(result)
    }catch(e){
        res.status(400).json({message : e.message})
    }
}