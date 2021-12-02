const router = require('express').Router();

const {
  createTransaction,
  getTransaction,
  getTransactions,
  deleteTransaction,
} = require('../controllers/transaction');

router.post('/transaction', createTransaction);
router.get('/transaction/:id', getTransaction);
router.get('/transaction', getTransactions);
router.delete('/transaction/:id', deleteTransaction);

module.exports = router;
