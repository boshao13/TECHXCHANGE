require('dotenv').config();
const path = require('path');

const express = require('express');

const app = express();
// app.disable('etag');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const gzip = require('express-static-gzip');

app.use(gzip(path.join(__dirname, '../client/dist')));
// app.use(express.static(path.join(__dirname, '../client/dist')));

const cors = require('cors');

app.use(cors());

const morgan = require('morgan');

app.use(morgan('dev'));

const router = require('./routes');

app.use(router);

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${PORT}`);
});
