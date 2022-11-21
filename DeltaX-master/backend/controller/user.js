const User = require('../model/user');
const bcrypt = require('bcryptjs');

exports.read = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log(req.user)
        const user = await User.findById(userId).select('-password');
        if (user) {
            res.status(200).json({
                user
            })
        }
        else {
            res.status(400).json({
                error: 'User not found'
            })
        }
    } catch (error) {
        res.status(404).json({ error })
    }
}

