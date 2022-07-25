import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import AddProductToCart from '../../../AddProductToCart/AddProductToCart';
import { Product as IProduct } from 'models/Product';
import { formatAsPrice } from '../../../../utils/utils';
import API_PATHS from '../../../../constants/apiPaths';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },

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
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Product() {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    axios.get(`${API_PATHS.products}/${id}`)
      .then(res => {

        setProduct(res.data.data)
      });
  }, [id])

  if (!product) {
    return <div>Sorry, this product was not found</div>
  }

  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={product.image}
          title="Product Image"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {product.title}
          </Typography>
          <Typography>
            {formatAsPrice(product.price)}
          </Typography>
        </CardContent>
        <CardActions>
          <AddProductToCart product={product}/>
        </CardActions>
      </Card>
    </div>
  );
}
