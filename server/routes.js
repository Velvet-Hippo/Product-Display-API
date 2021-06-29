/* eslint-disable no-console */
const express = require('express');
const dbQueries = require('../product-display/models/index');

const router = express.Router();

router.get('/products', (req, res) => {
  dbQueries.getAllProducts((err, data) => {
    if (err) {
      res.status(404).send(err);
      console.log('err getting products', err);
    } else {
      res.status(200).send(data);
    }
  });
});

router.get('/products/:product_id', (req, res) => {
  dbQueries.getProductData(parseInt(req.params.product_id, 10), (err, data) => {
    if (err) {
      res.status(404).send(err);
      console.log('err getting product data', err);
    } else {
      res.status(200).send(data);
    }
  });
});

router.get('/products/:product_id/styles', (req, res) => {
  console.log(parseInt(req.params.product_id, 10));
  dbQueries.getProductStyle(parseInt(req.params.product_id, 10), (err, data) => {
    if (err) {
      res.status(404).send(err);
      console.log('err getting product styles', err);
    } else {
      res.status(200).send(data);
    }
  });
});

module.exports = router;
