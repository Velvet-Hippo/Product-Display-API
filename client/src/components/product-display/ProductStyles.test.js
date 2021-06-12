import Axios from 'axios';

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

const { GITHUB_API_KEY } = process.env;

const getProductStyles = (productId) => {
  if (productId > 0) {
    Axios
      .get(`/api/display/products/${productId}/styles`)
      .then((response) => {
        return response.data;
        done();
      })
      .catch((err) => {
        return err;
        done();
      });
  }
};

describe('Product API Calls', () => {
  test('Gets data from api and returns a object with the data', () => {
    function getProductStyles(productId) {
      if (productId > 0) {
        Axios
          .get(`/api/display/products/${productId}/styles`)
          .then((response) => {
            expect(response).toEqual({ product_id: productId, results: Array(6) });
            done();
          })
          .catch((err) => {
            return err;
            done();
          });
      }
    }
    // expect(getProductStyles(18078)).toEqual({});
  });
});
