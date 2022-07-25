import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Product as IProduct } from 'models/Product';
import { formatAsPrice } from 'utils/utils';
import AddProductToCart from 'components/AddProductToCart/AddProductToCart';
import axios from 'axios';
import API_PATHS from 'constants/apiPaths';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  addProductToCart: {
    display: 'flex',
    alignItems: 'center',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Products() {
  const classes = useStyles();
  const history = useHistory();
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    axios.get(`${API_PATHS.products}`)
      .then(res => setProducts(res.data.data));
  }, []);

  return (
    <Grid container spacing={4}>
      {products.map((product: IProduct) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={product.image}
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {product.title}
              </Typography>
              <Typography>
                {formatAsPrice(product.price)}
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <div className={classes.addProductToCart}>
                <AddProductToCart product={product} />
              </div>
              <Button variant="outlined" color="primary" onClick={() => history.push(`${product.id}`)}>
                More Info
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
