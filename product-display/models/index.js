/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const { Pool } = require('pg');
const { config } = require('./config');

const pool = new Pool(config);

pool.connect((err) => {
  if (err) {
    console.log('cannot connect db', err);
  } else {
    console.log('connected to db');
  }
});

const getAllProducts = (cb) => {
  const queryString = 'SELECT * FROM products LIMIT 5';
  pool.query(queryString, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
      console.log('results', results);
    }
  });
};

const getProductData = (product_id, cb) => {
  const queryString = 'SELECT products.id, name, slogan, description, category, default_price, json_agg(json_build_object("feature", features.feature_name, "value", features.value)) as features from products join features on features.product_id = products.id WHERE products.id = $1 group by products.id';
  pool.query(queryString, [product_id], (err, results) => {
    if (err) {
      cb(err, null);
      console.log('err getting product data', err);
    } else {
      cb(null, results);
    }
  });
};

module.exports = {
  getAllProducts, getProductData
};
