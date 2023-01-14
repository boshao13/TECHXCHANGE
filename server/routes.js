const router = require('express').Router();
const { Users } = require('./controllers');

router.get('/users/auth', Users.authUser);
router.post('/users', Users.createUser);

module.exports = router;
