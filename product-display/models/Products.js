/* eslint-disable no-console */
// const { Sequelize } = require('sequelize');
// const { config } = require('./config');
const { pool } = require('./index');

const getAllProducts = (cb) => {
  const queryString = 'SELECT * FROM products LIMIT 5;';
  pool.query(queryString, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
      console.log('results', results);
    }
  });
};

module.exports = {
  getAllProducts
};
