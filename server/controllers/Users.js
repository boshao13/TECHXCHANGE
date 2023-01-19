const bcrypt = require('bcrypt');
const db = require('../db');

module.exports = {
  authUser: async (req, res) => {
    const { body: data } = req;

    try {
      const query = `SELECT * FROM users WHERE email = "${data.email}";`;
      const conn = db.promise();
      const [[user]] = await conn.query(query);
      if (!user) {
        res.status(200).json(null);
        return;
      }

      const match = await bcrypt.compare(data.password, user.password);

      delete user.password;

      res.status(200).json(match ? user : null);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  createUser: async (req, res) => {
    const { body: data } = req;
    const description = data.description ?? null;

    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(data.password, salt);

      let query = `INSERT INTO users (name, email, password, description, street, city, state, latitude, longitude) VALUES ("${data.name}", "${data.email}", "${hash}", "${description}", "${data.street}", "${data.city}", "${data.state}", ${data.latitude}, ${data.longitude});`;
      const conn = db.promise();
      await conn.execute(query);

      query = `SELECT * FROM users WHERE email = "${data.email}"`;
      const [[user]] = await conn.query(query);

      delete user.password;

      res.status(201).json(user);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getUser: async (req, res) => {
    const userID = req.params.id;
    // const { params: { id } } = req;
    console.log('GETTING USER with id of', userID);

    const qString = `SELECT * FROM users WHERE id = ${userID};`;

    db.query(qString, function (err, results) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
      // console.log('promise style results\n', results);
      res.status(200).send(results);
    });
  },

  getAllUsers: async (req, res) => {
    // console.log('GETTING All users');

    const qString = `SELECT * FROM users;`;

    db.query(qString, function (err, results) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
      // console.log('promise style results\n', results);
      res.status(200).send(results);
    });
  },
};
