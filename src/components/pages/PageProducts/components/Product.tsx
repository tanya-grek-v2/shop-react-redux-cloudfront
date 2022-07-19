import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { formatAsPrice } from '../../../../utils/utils';
import CardActions from '@material-ui/core/CardActions';
import AddProductToCart from '../../../AddProductToCart/AddProductToCart';
import Card from '@material-ui/core/Card';
import { Product as IProduct } from 'models/Product';

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

const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  openItem: { index: number; product: IProduct },
  setOpen:(item: { index: number; product: IProduct } | null) => void,
}

export default function Product({ openItem, setOpen }: Props) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(null);
  };

  console.log(openItem.index)

  return (
    <div>
      <Dialog
        fullScreen
        open={!!openItem}
        onClose={handleClose}
        // @ts-ignore
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {openItem.product.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={`https://source.unsplash.com/random?sig=${openItem.index}`}
            title="Image title"
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {openItem.product.title}
            </Typography>
            <Typography>
              {formatAsPrice(openItem.product.price)}
            </Typography>
          </CardContent>
          <CardActions>
            <AddProductToCart product={openItem.product}/>
          </CardActions>
        </Card>
      </Dialog>
    </div>
  );
}
