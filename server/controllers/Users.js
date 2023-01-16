const bcrypt = require('bcrypt');
const db = require('../db');

module.exports = {
  authUser: async (req, res) => {
    const { body: data } = req;

    try {
      const conn = await db.getConnection();
      const [[user]] = await conn.query(`SELECT * FROM users WHERE email = "${data.email}";`);
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

      let query = `INSERT INTO users (name, email, password, description, street, zip_code) VALUES ("${data.name}", "${data.email}", "${hash}", "${description}", "${data.street}", "${data.zip_code}");`;
      const conn = await db.getConnection();
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
    const { params: { id } } = req;
    console.log('GETTING USER');
    try {
      const query = `SELECT * FROM users WHERE id = ${id};`;
      const conn = await db.getConnection();
      const [[user]] = await conn.query(query);

       res.status(200).send(user);
      // res.status(200).json(user ?? null);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
