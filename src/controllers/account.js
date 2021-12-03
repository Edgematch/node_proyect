const Account = require('../models/account');
const {v4: uuidv4 } = require('uuid');



module.exports.createAccount = async (req, res, next) =>{
    const args = [
        uuidv4(), 
        req.body.description, 
        req.body.account_type_id, 
        req.body.currency_id, 
        Number(req.body.amount), 
        req.user.uid
    ];

    try{
        const createAccount = await Account.create(args);
        res.status(200).json({valid: true, message: 'Account created'});
    }catch(err){
        res.status(400).json({valid: false, message: err.message})
    }
}


module.exports.getAccount = async (req, res, next)=>{
    const args = [req.params.id, req.user.uid];
    try{
        const getAccount = await Account.findById(args);
        res.status(200).json({valid: true, data: getAccount.rows})
    }catch(err){
        res.status(400).json({valid: false, message: err.message});
    }
}

module.exports.getAccounts = async (req, res, next) =>{
    const args = [req.user.uid];
    try {
        const getAccounts = await Account.fetchAll(args);
        res.status(200).json({valid: true, data: getAccounts.rows});
    } catch (err) {
        res.status(400).json({valid: false, message: err.message})
    }
}

module.exports.deleteAccount = async (req, res, next) =>{
    const args = [req.params.id, req.user.uid];
    try{
        const deleteAccount = await Account.delete(args);
        res.status(200).json({valid: true, message: 'Account Deleted'});
    }catch(err){
        res.status(400).json({valid: false, message: err.message});
    }

}

module.exports.updateAccount = async (req, res, next) =>{
    const args = [req.body.id, Number(req.body.amount), req.user.uid];
    try{
        const updateAccount = await Account.update(args);
        res.status(200).json({valid: true, message: 'Account Updated'});
    }catch(err){
        res.status(400).json({valid: false, message: err.message});
    }

}

module.exports.transferAccount = async (req, res, next) =>{
    const args = [req.body.from_account_id, req.body.to_account_id, Number(req.body.amount), req.user.uid];
    try{
        const fromAccount = await Account.findById([req.body.from_account_id, req.user.uid]);
        const debit = await Number(fromAccount.rows[0].amount) - Number(req.body.amount);
        const updateFormAccount = await Account.update([req.body.from_account_id, debit, req.user.uid]);
        const to_USD = await Number(req.body.amount) / Number(fromAccount.rows[0].rate);
        const toAccount = await Account.findById([req.body.to_account_id, req.user.uid]);       
        const to_NAT = to_USD * Number(toAccount.rows[0].rate);
        const credit = await Number(toAccount.rows[0].amount) + to_NAT
        const updateToAccount = await Account.update([req.body.to_account_id, credit, req.user.uid]);
        res.status(200).json({valid: true, message: 'Transfer Complete'});
    }catch(err){
        res.status(400).json({valid: false, message: err.message});
    }

}
