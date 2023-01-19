const db = require('../db')

function getAllDevices(req, res) {
  const queryString = `SELECT * FROM devices`;

  db.query(queryString, (err, result) => {
    if (err) {
      console.log('err in getDevices controller is ', err);
      res.status(404).send(err);
    } else {
      console.log('success in bookmarks post ', result);
      res.status(200).send(result);
    }
  });
}

module.exports = {getAllDevices};