const db = require('../db');

module.exports.Users = require('./Users');
module.exports.Trades = require('./Trades');
module.exports.Bookmarks = require('./Bookmarks');
module.exports.Search = require('./Search');


module.exports.Shared = {

  insertDevice: function(req,res) {
    const userID = req.params.userID;
    const qString = `INSERT INTO devices (user_id, name, thumbnail_url, description, item_condition) VALUES (${userID}, '${req.body.name}', '${req.body.thumbnail_url}', '${req.body.description}', '${req.body.item_condition}');`;

    console.log('QString\n', qString);

    db.query(qString, function(err, results) {
      if(err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
      // console.log('promise style results\n', results);
      res.status(201).send('successfully inserted?');
    })

  },

  getItemFromID: async function(req,res) {
    const itemID = req.params.itemID;
    const qString = `SELECT * FROM devices WHERE id = ${itemID}`;
    // console.log(itemID);
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
    //   const connection = await db.pool.getConnection();
    //   const results = await connection.query(qString);
    //   const [[sendBack]] = results;
    //   res.status(200).json(sendBack);
    // } catch (error) {
    //   console.log(error);
    //   res.status(500).send('error:', error)
    // }

  },
  getItemsFromUserID: async function(req,res) {
    const userID = req.params.userID;
    const qString = `SELECT * FROM devices WHERE user_id = ${userID}`;
    // console.log(userID);
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
    //   const connection = await db.pool.getConnection();
    //   const results = await connection.query(qString);

    //   const [sendBack] = results;
    //   // console.log(sendBack);
    //   res.status(200).json(sendBack);
    // } catch (error) {
    //   console.log(error);
    //   res.status(500).send('error:', error)
    // }

  }





}
