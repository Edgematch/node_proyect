const Category = require('../models/category');


module.exports.createCategory = async (req, res, next)=>{
    const args = [req.body.description, req.body.category_type];
    try{
        const createCategory = await Category.create(args)
        res.status(200).json({valid: true, data: createCategory.rows})
    }catch(err){
        res.status(400).json({valid: false, error: err})
    }
}
module.exports.getCategory = async (req, res, next)=>{
    const args = [Number(req.params.id)];
    try{
        const getCategory = await Category.findById(args);
        res.status(200).json({valid: true, data: getCategory.rows})
    }catch(err){
        res.status(400).json({valid: false, error: err})
    }
}

module.exports.getCategories = async (req, res, next)=>{
    try{
        const getAccountTypes = await Category.fetchAll();
        res.status(200).json({valid: true, data: getAccountTypes.rows})
    }catch(err){
        res.status(400).json({valid: false, error: err})
    }
}