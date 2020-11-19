import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function ExamList(props) {
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth="md">
      <h1>List</h1>
    </Container>
  );
}