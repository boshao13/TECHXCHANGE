const router = require('express').Router();
const { Users, Trades, Shared } = require('./controllers');

router.get('/users/auth', Users.authUser);
router.get('/users/user/:id', Users.getUser);
router.post('/users', Users.createUser);

router.get('/user/:userID', Shared.getUser);//

router.post('/get/trades/involved', Trades.getInvolvedTrades);//
router.get('/item/:itemID', Shared.getItemFromID);//
router.get('/trade/status/:tradeID/:newStatus', Trades.updateTradeFromID);

module.exports = router;
