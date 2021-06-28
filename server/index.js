const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');
const products = require('./routes');

const port = 3000;
const app = express();

// app.use(express.static(path.join(_dirname, '..', 'public')));
app.use(bodyParser.json());

app.use('/', products);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${port}`);
});
