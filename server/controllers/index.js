const db = require('../db');

module.exports.Users = require('./Users');
module.exports.Trades = require('./Trades');


module.exports.Shared = {

  getItemFromID: function(req,res) {
    const itemID = req.params.itemID;
    /* Get relevant data from req


    models.getItemFromID(data)
    .(res => {

  } */

  },

  /*
  var getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};

module.exports = getConnection;
  */
  getUser: async function(req,res) {
    const qString = `SELECT * FROM users WHERE id = ${req.params.userID}`;

    try {
      const connection = await db.getConnection();
      const results = await connection.query(qString);
      const [[sendBack]]= results;
      console.log('Results in GETUSER-> ', sendBack);
      res.status(200).send(sendBack);

    } catch {
      res.status(500).send('error')
    }

    // const userID = req.params.userID;
    // console.log('userid', userID);
    // // console.log(db.query);
    // db.pool1.getConnection(function(err, connection) {
    //   // callback(err, connection);
    //   connection.query( //or CONNECTION.query
    //     'SELECT * FROM users WHERE id = ?',
    //     [userID],
    //     function(err, results, fields) {
    //       if(err) {
    //         console.error('error in getUser controller', err);
    //         res.status(500).send(err);
    //       }
    //       res.status(200).send(results);
    //     }
    //   )//end query

      // db.query( //or CONNECTION.query
      //   'SELECT * FROM users WHERE id = ?',
      //   [userID],
      //   function(err, results, fields) {
      //     if(err) {
      //       console.error('error in getUser controller', err);
      //       res.status(500).send(err);
      //     }
      //     res.status(200).send(results);
      //   }
      // )//end query



  },




}
