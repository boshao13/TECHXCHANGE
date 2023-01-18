const db = require('../db')

function saveBookmark (req, res) {
  console.log('data is ', req.body);
  const queryString = `INSERT INTO bookmarks (user_id, item_id) VALUES (${req.body.userID}, ${req.body.itemID});`;

  db.query(queryString, (err, result) => {
    if (err) {
      console.log('err in bookmarks controllers is ', err);
      res.status(404).send(err);
    } else {
      console.log('success in bookmarks post ', result);
      res.status(201).send(result);
    }
  });
}

module.exports = {saveBookmark};