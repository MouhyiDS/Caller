const groupService = require("../services/groupService");

exports.create = async (req ,res) =>{
    try{

        const group = await groupService.createGroup(req,res);
        res.status(220).json(group)
        
    }catch(e){
        res.status(400).res({message : e.message})
    }
}

exports.deleteGroup = async (req ,res) =>{
    try{

        const group = await groupService.deleteGroup(req.groupId);
        res.status(220).json(group)
        
    }catch(e){
        res.status(400).res({message : e.message})
    }
}

exports.find = async (req ,res) =>{
    try{

        const group = await groupService.findGroup(req.groupId);
        res.status(220).json(group)
        
    }catch(e){
        res.status(400).res({message : e.message})
    }
}

exports.addMember = async (req ,res) =>{
    try{

        const group = await groupService.addMember(req.groupId, req.userId);
        res.status(220).json(group)

    }catch(e){
        res.status(400).res({message : e.message})
    }
}

exports.dropMember = async (req ,res) =>{
    try{

        const group = await groupService.dropMember(req.groupId,req.userId);
        res.status(220).json(group)
        
    }catch(e){
        res.status(400).res({message : e.message})
    }
}

exports.addAdmin = async (req ,res) =>{
    try{

        const group = await groupService.addAdmin(req.groupId, req.userId);
        res.status(220).json(group)

    }catch(e){
        res.status(400).res({message : e.message})
    }
}

exports.dropAdmin = async (req ,res) =>{
    try{

        const group = await groupService.dropAdmin(req.groupId,req.userId);
        res.status(220).json(group)
        
    }catch(e){
        res.status(400).res({message : e.message})
    }
}