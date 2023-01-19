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

function getBookmarks (req, res) {
  console.log('req body in get bookmarks controller ', req.query.id);
  const queryString = `SELECT * FROM devices WHERE id IN (SELECT item_id FROM bookmarks WHERE user_id = ${req.query.id});`

  db.query(queryString, (err, result) => {
    if (err) {
      console.log('err in bookmarks controllers is ', err);
      res.status(404).send(err);
    } else {
      console.log('success in bookmarks get ', result);
      res.status(200).send(result);
    }
  });
}

module.exports = {saveBookmark, getBookmarks};