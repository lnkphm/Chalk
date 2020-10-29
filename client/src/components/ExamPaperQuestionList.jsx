import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  paper: {
    padding: theme.spacing(3),
  }
}))

export default function ExamPaperQuestionList(props) {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Test Question</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Test Question</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Test Question</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Test Question</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Test Question</Paper>
        </Grid>
      </Grid>
    </div>
  )
}