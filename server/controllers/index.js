const db = require('../db');

module.exports.Users = require('./Users');
module.exports.Trades = require('./Trades');


module.exports.Shared = {

  getItemFromID: async function(req,res) {
    const itemID = req.params.itemID;
    const qString = `SELECT * FROM devices WHERE id = ${itemID}`;

    try {
      const connection = await db.getConnection();
      const results = await connection.query(qString);
      const [[sendBack]] = results;
      res.status(200).send(sendBack);

    } catch {
      res.status(500).send('error')
    }

  },




}
