const Currency = require('../models/currency');

module.exports.createCurrency = async (req, res, next)=>{
    const args = [req.body.description];
    try {
        const createCurrency = await Currency.create(args);
        consol.log(createCurrency);
        res.status(200).json({ valid: true, message: 'Currency created!',  });
    }catch(err) {
        res.status(400).json({ valid: false, message: err })
    }
    
}

module.exports.getCurrency = async (req, res, next)=>{
    const args = [Number(req.params.id)];
     
    try{
        const getCurrency = await Currency.findById(args);
        res.status(200).json({valid: true, data: getCurrency.rows})
    }catch(err){
        res.status(400).json({valid: false, message: err})
    }
}

module.exports.getCurrencies = async (req, res, next)=>{
    try{
        const getCurrencies = await Currency.fetchAll();
        res.status(200).json({valid: true, data: getCurrencies.rows})
    }catch(err){
        res.status(400).json({valid: false, message: err})
    }
}