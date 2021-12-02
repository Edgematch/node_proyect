const router = require('express').Router();

const {createUser} = require('../controllers/users')

router.post('/user', createUser);

module.exports = router;