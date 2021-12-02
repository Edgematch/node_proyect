const AccountType = require('../models/account_type');


module.exports.createAccountType = async (req, res, next)=>{
    const args = [req.body.description];
    try{
        const createAccountType = await AccountType.create(args)
        res.status(200).json({valid: true, data: createAccountType.rows})
    }catch(err){
        res.status(400).json({valid: false, error: err})
    }
}
module.exports.getAccountType = async (req, res, next)=>{
    const args = [Number(req.params.id)];
    try{
        const getAccountType = await AccountType.findById(args);
        res.status(200).json({valid: true, data: getAccountType.rows})
    }catch(err){
        res.status(400).json({valid: false, error: err})
    }
}

module.exports.getAccountTypes = async (req, res, next)=>{
    try{
        const getAccountTypes = await AccountType.fetchAll();
        res.status(200).json({valid: true, data: getAccountTypes.rows})
    }catch(err){
        res.status(400).json({valid: false, error: err})
    }
}