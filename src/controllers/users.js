const User = require('../models/users');

module.exports.createUser = async (req, res, next) =>{
    const args = [req.user.uid, req.user.email]
    try {
        const createUser = await User.create(args)
        console.log(createUser)
        res.status(200).json({valid: true, message: 'User created'})
    } catch (err) {
        res.status(400).json({valid: false, message: err.message})
    }
}

