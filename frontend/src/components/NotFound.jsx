import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import img404 from '../images/404.jpg';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
    maxHeight: 350
  }
}));

export default function NotFound() {
  const classes = useStyles
  return (
    <Container className={classes.root}>
      <div className={classes.toolbar} />
      <Card>
        <CardMedia component="img" image={img404} />
      </Card>
    </Container>
  )
}