const router = require('express').Router();

const {createAccountType, getAccountType, getAccountTypes} = require('../controllers/account_type')

router.post('/account-type', createAccountType)
router.get('/account-type/:id', getAccountType)
router.get('/account-type', getAccountTypes)


module.exports = router;