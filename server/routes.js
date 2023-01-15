const router = require('express').Router();
const { Users } = require('./controllers');

router.get('/users/auth', Users.authUser);
router.get('/users/user/:id', Users.getUser);
router.post('/users', Users.createUser);

module.exports = router;
