const groupService = require("../services/groupService");

exports.create = async (req ,res) =>{
    try{

        const group = await groupService.createGroup(req,res);
        res.status(220).json(group)
        
    }catch(e){
        res.status(400).res({message : e.message})
    }
}