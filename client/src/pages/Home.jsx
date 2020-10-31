import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: 'center',
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>Upcoming</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>Calendar</Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>Course 1</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>Course 2</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>Course 3</Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
