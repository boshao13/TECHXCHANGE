const db = require('../db');

module.exports.Users = require('./Users');
module.exports.Trades = require('./Trades');


module.exports.Shared = {

  getItemFromID: async function(req,res) {
    const itemID = req.params.itemID;
    console.log('ITEM ID', itemID);
    const qString = `SELECT * FROM devices WHERE id = ${itemID}`;

    try {
      const connection = await db.getConnection();
      const results = await connection.query(qString);
      const [sendBack]= results;
      console.log('Results in getItems-> ', sendBack);
      res.status(200).send(sendBack);

    } catch {
      res.status(500).send('error')
    }

  },




}
