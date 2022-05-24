const User = require('../model/client.model');

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
    }
    const result = await user.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getUser = async (req, res) => {
    if (!req?.params?.email) return res.status(400).json({ "message": 'User Email required' });
    const user = await User.findOne({ email: req.params.email }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User Email ${req.params.email} not found` });
    }
    res.json(user);
}


const updateBalance = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;
    if (!req?.body?.email) {
        return res.status(400).json({ 'message': 'Authorized Account Email is required.' });
    }
    const sessionUser = await User.findOne({ email: req.body.email }).exec();
    if (!sessionUser) {
        return res.status(204).json({ "message": `No ${req.body.email} found.` });
    }
    if (req.body?.balance) sessionUser.balance = req.body.balance;
    const result = await sessionUser.save();
    res.json(result);
}

module.exports = {
    getAllUsers,
    deleteUser,
    getUser,
    updateBalance,

}