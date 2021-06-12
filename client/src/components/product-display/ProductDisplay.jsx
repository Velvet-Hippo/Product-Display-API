import React, { useState, useEffect, useContext } from 'react';
import {
  Grid, Typography, Card, CardContent
} from '@material-ui/core';
import Axios from 'axios';
import { AppContext } from '../../helpers/context';
import CategoryPriceName from './CategoryPriceName.jsx';
import useStyles from './MaterialUi.jsx';
import StyleThumbs from './StyleThumbs.jsx';
import Selectors from './Selectors.jsx';
import ProductDescription from './ProductDescription.jsx';
import ImageGallery from './ImageGallery.jsx';

const ProductDisplay = () => {
  const [productStyles, setProductStyles] = useState({
    product_id: '',
    results: []
  });
  const [photosArr, setPhotos] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);

  const classes = useStyles();

  const getStylePhotos = (styleId) => {
    if (productStyles.results.length > 0) {
      const allStylePhotos = [];
      productStyles.results.forEach((style) => {
        if (style.style_id === styleId) {
          style.photos.forEach((photos) => {
            allStylePhotos.push(photos.url);
          });
        }
      });
      setPhotos(allStylePhotos);
    }
  };

  const getProductStyles = (productId) => {
    if (productId > 0) {
      Axios
        .get(`/api/display/products/${productId}/styles`)
        .then((response) => {
          setProductStyles(response.data);
        })
        .catch(() => {
          console.log('Id not found');
        });
    }
  };

  const { product } = useContext(AppContext);

  // Gets data for individual products
  useEffect(() => {
    getProductStyles(product.id);
  }, [product]);

  // For Carousel to render photos on load
  useEffect(() => {
    if (productStyles.results.length > 0) {
      getStylePhotos(productStyles.results[0].style_id);
    }
  }, [productStyles]);

  return (
    <Grid className={classes.grid} item xs={12} container>

      <Grid className={classes.grid} item xs={6} container>

        <ImageGallery photosArr={photosArr} />

      </Grid>

      <Grid className={classes.grid} item xs={6} container direction="column">
        <Card>
          <CardContent>

            <Typography variant="body2" color="textSecondary" component="p" align="left">
              *Stars*
              <u>View All Reviews</u>
            </Typography>

            <CategoryPriceName />

            <Typography variant="body2" color="textSecondary" component="p" align="left">
              <b>Style &gt; </b>
              *Select Style*
            </Typography>
            <StyleThumbs
              productDetails={productStyles.results}
              thumbnails={thumbnails}
              setThumbnails={setThumbnails}
              getStylePhotos={getStylePhotos}
            />

            <Selectors
              productDetails={productStyles.results}
              thumbnails={thumbnails}
            />

          </CardContent>
        </Card>
      </Grid>
      <Grid className={classes.grid} item xs={12} container>
        <ProductDescription />
      </Grid>
    </Grid>
  );
};

export default ProductDisplay;
