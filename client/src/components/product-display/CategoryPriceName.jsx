import React, { useState, useEffect, useContext } from 'react';
import { Typography, CircularProgress } from '@material-ui/core';
import { AppContext } from '../../helpers/context';
import useStyles from './MaterialUi.jsx';

const CategoryPriceName = (props) => {
  const { product } = useContext(AppContext);
  const [dataIn, setDataIn] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    if (product.id !== -1) {
      setDataIn(true);
    }
  }, [product]);
  return (
    <div>
      {dataIn ? (
        <>
          <Typography variant="h6" color="textSecondary" component="p" align="left">
            {product.category}
          </Typography>
          <Typography variant="h4" color="textSecondary" component="p" align="left">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" align="left">
            {product.default_price}
          </Typography>
        </>
      ) : (
        <div className={classes.loadingSpinner}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default CategoryPriceName;
