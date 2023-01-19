const db = require('../db');

module.exports = {

  getInvolvedTrades: async function(req,res) {
    var userID = req.body.userID;

    const qString = `SELECT * from trades WHERE proposer_id=${userID} OR receiver_id=${userID};`;
    db.query(qString, function(err, results) {
      if(err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
      res.status(200).send(results);
    })

    // try {
    //   const conn = await db.pool.getConnection();
    //   const [results] = await conn.query(qString);
    //   // console.log('results', results);

    //   res.status(200).send(results);
    // } catch (err) {
    //   res.status(500).send(err);
    // }


  },
  getTradeFromID: async function(req,res) {
    const tradeID = req.params.tradeID;

    const qString = `SELECT * from trades WHERE id=${tradeID}`;
    db.query(qString, function(err, results) {
      if(err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
      // console.log('promise style results\n', results);
      res.status(200).send(results);
    })
  },
  updateTradeFromID: async function(req,res) {
    //tradeID/:newStatus
    const tradeID = req.params.tradeID;
    const newStatus = req.params.newStatus;
    // console.log('updateTRADE:', tradeID, newStatus);


    const qString = `UPDATE trades SET status='${newStatus}' WHERE id=${tradeID};`;
    db.query(qString, function(err, results) {
      if(err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
      // console.log('promise style results\n', results);
      res.status(200).send(results);
    })

      // try {
      //   const conn = await db.pool.getConnection();
      //   const [results] = await conn.query(qString);
      //   // console.log('results', results);

      //   res.status(200).send('updated?');
      // } catch (err) {
      //   res.status(500).send(err);
      // }

  },
  createNewTrade: async (req, res) => {
    const { body: data } = req;
    let query = `INSERT INTO trades (proposer_id, proposer_device_id, receiver_id, receiver_device_id, status) VALUES (${data.proposer_id}, ${data.proposer_device_id}, ${data.receiver_id}, ${data.receiver_device_id}, "${data.status}");`;
    db.query(query, function(err, results) {
      if(err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }});
    res.status(201).send('posted');

  }

};