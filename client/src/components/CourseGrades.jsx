import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function CourseGrades(props) {
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth="md">
      <h1>Grades</h1>
    </Container>
  );
}
