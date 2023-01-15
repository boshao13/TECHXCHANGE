const db = require('../db');

module.exports = {

  getInvolvedTrades: function(req,res) {
    const userID = req.body.userID;


  },
  updateTradeFromID: function(req,res) {
    //tradeID/:newStatus
    const tradeID = req.body.tradeID;
    const newStatus = req.body.newStatus;

    return new Promise((resolve, reject) => {

      db.query(
        'SELECT * FROM Questions WHERE product_id = ?',
        [product_id],
        function(err, results, fields) {
          if(err) {
            reject('error in models', err);
          }
          resolve(results); // results contains rows returned by server
        }
      )//end query
    });//end PROMISE

  },



};