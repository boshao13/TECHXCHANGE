const router = require('express').Router();
const { Users, Trades, Shared } = require('./controllers');

router.get('/users/auth', Users.authUser);
router.get('/users/user/:id', Users.getUser);
router.post('/users', Users.createUser);

router.post('/trades/involved', Trades.getInvolvedTrades);//WORKING
router.get('/item/:itemID', Shared.getItemFromID);//WORKING
router.put('/trade/status/:tradeID/:newStatus', Trades.updateTradeFromID);//WORKING

module.exports = router;
