const router = require('express').Router();

const { createCategory, getCategory, getCategories } = require('../controllers/category');

router.post('/category', createCategory);
router.get('/category/:id', getCategory);
router.get('/category', getCategories);


module.exports = router;