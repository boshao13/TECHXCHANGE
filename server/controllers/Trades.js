const db = require('../db');

module.exports = {

  getInvolvedTrades: async function(req,res) {
    const userID = req.body.userID;

    try {
      const qString = `SELECT * from trades WHERE proposer_id=${userID} OR receiver_id=${userID};`;
      const conn = await db.getConnection();
      const [results] = await conn.query(qString);
      console.log('results', results);

      res.status(200).send(results);
    } catch (err) {
      res.status(500).send(err);
    }


  },
  updateTradeFromID: async function(req,res) {
    //tradeID/:newStatus
    const tradeID = req.params.tradeID;
    const newStatus = req.params.newStatus;
    console.log('updateTRADE:', tradeID, newStatus);
      try {
        const qString = `UPDATE trades SET status='${newStatus}' WHERE id=${tradeID};`;
        const conn = await db.getConnection();
        const [results] = await conn.query(qString);
        console.log('results', results);

        res.status(200).send('updated?');
      } catch (err) {
        res.status(500).send(err);
      }

  },
  createNewTrade: async (req, res) => {
    const { body: data } = req;
    try {
      let query = `INSERT INTO trades (proposer_id, proposer_device_id, receiver_id, receiver_device_id, status) VALUES (${data.proposer_id}, ${data.proposer_device_id}, ${data.receiver_id}, ${data.receiver_device_id}, "${data.status}");`;
      const conn = await db.getConnection();
      const [trade] = await conn.query(query);
      res.status(201).send('posted');
    } catch (err) {
      res.status(500).send(err);

  }

  }

};