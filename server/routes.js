const express = require('express');
const dbQueries = require('../product-display/models/index');

const router = express.Router();

router.get('/products', (req, res) => {
  dbQueries.getAllProducts((err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

router.get('/products/:product_id', (req, res) => {
  dbQueries.getProductData(req.params.product_id, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

module.exports = router;
