import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Product from "components/pages/PageProduct/components/Product";
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3, 0, 3),
  },
}));

export default function PageProduct() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.content}>
      <Button onClick={() => history.goBack()}>Back</Button>
      <Product/>
    </div>
  );
}
