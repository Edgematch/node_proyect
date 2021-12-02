const router = require('express').Router();

const {createAccount, getAccount, getAccounts, deleteAccount, updateAccount, transferAccount} = require('../controllers/account')

router.put('/account', updateAccount);
router.put('/transfer', transferAccount);
router.post('/account', createAccount);
router.get('/account/:id', getAccount);
router.get('/account', getAccounts)
router.delete('/account/:id', deleteAccount);


module.exports = router;
