/* eslint-disable quotes */
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
      console.log('results', results.rows);
    }
  });
};

const getProductData = (product_id, cb) => {
  // eslint-disable-next-line quotes
  const queryString = `SELECT products.id, name, slogan, description, category, default_price, jsonb_agg(json_build_object('feature', features.feature_name, 'value', features.value)) AS features FROM products JOIN features on features.product_id = products.id WHERE products.id = $1 GROUP BY products.id;`;
  pool.query(queryString, [product_id], (err, results) => {
    if (err) {
      cb(err, null);
      console.log('err getting product data', err);
    } else {
      cb(null, results.rows);
    }
  });
};

const getProductStyle = (product_id, cb) => {
  // eslint-disable-next-line quotes
  const queryString = `SELECT styles.style_id, style_name, sale_price, original_price, default_style, jsonb_agg(json_build_object('thumbnail_url', photos.thumbnail_url, 'url', photos.url)) AS photos, json_object_agg('skus_id', json_build_object('quantity', skus.quantity, 'size', skus.size)) AS skus FROM styles JOIN photos ON photos.style_id = styles.style_id JOIN skus ON skus.style_id = styles.style_id WHERE styles.product_id = $1 GROUP BY styles.style_id`;
  pool.query(queryString, [product_id], (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results.rows);
    }
  });
};

const getRelated = (product_id, cb) => {
  const queryString = `SELECT jsonb_agg(related.related_product_id) AS related FROM related WHERE product_id = $1`;
  pool.query(queryString, [product_id], (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results.rows);
    }
  });
};

module.exports = {
  getAllProducts, getProductData, getProductStyle, getRelated
};
