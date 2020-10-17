import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5),
    '&:hover': {},
  },
}));

export default function HomeCourseListItem(props) {
  const classes = useStyles();
  return (
    <Container>
      <Paper elevation={1} className={classes.paper}>
        <Link color="inherit" href={props.url}>{props.name}</Link>
      </Paper>
    </Container>
  );
}
