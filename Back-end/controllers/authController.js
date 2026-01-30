const authService = require('../services/authService');

exposts.register = async (req, res) => {
    try {
        const userData = await authService.register(req.body);
        res.status(201).json(userData);    
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exposts.login = async (req, res) => {
    try {
        const userData = await authService.login(req.body);
        res.status(200).json(userData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}