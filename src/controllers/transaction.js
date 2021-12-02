const Transaction = require('../models/transaction');
const {v4: uuidv4 } = require('uuid');



module.exports.createTransaction = async (req, res, next) =>{
    const args = [
        uuidv4(), 
        Number(req.body.amount), 
        req.body.category_id, 
        req.body.account_id, 
        req.user.uid,
        req.body.transaction_date
    ];

    try{
        const createTransaction = await Transaction.create(args);
        res.status(200).json({valid: true, message: 'Transaction created'});
    }catch(err){
        res.status(400).json({valid: false, message: err.message})
    }
}


module.exports.getTransaction = async (req, res, next)=>{
    const args = [req.params.id, req.user.uid];
    try{
        const getTransaction = await Transaction.findById(args);
        res.status(200).json({valid: true, data: getTransaction.rows})
    }catch(err){
        res.status(400).json({valid: false, message: err.message});
    }
}

module.exports.getTransactions = async (req, res, next) =>{
    const args = [req.user.uid];
    try {
        const getTransactions = await Transaction.fetchAll(args);
        res.status(200).json({valid: true, data: getTransactions.rows});
    } catch (err) {
        res.status(400).json({valid: false, message: err.message})
    }
}

module.exports.deleteTransaction = async (req, res, next) =>{
    const args = [req.params.id, req.user.uid];
    try{
        const deleteTransaction = await Transaction.delete(args);
        res.status(200).json({valid: true, message: 'Transaction Deleted'});
    }catch(err){
        res.status(400).json({valid: false, message: err.message});
    }

}