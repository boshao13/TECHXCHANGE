// get the client
require('dotenv').config();
const mysql = require('mysql2');
// console.log('passowrd', process.env.DB_PASSWORD, 'host', process.env.DB_HOST)
//
// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.log("Database Connection Failed..\n", err);
  } else {
    console.log("connected to Database");
  }
});

module.exports = connection;