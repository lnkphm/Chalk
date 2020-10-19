import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import HomeCourseListItem from './HomeCourseListItem';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function HomeCourseList(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <HomeCourseListItem name="Course 1" url="/courses/1" />
        </Grid>
        <Grid item xs={12}>
          <HomeCourseListItem name="Course 2" url="/courses/2" />
        </Grid>
        <Grid item xs={12}>
          <HomeCourseListItem name="Course 3" url="/courses/3" />
        </Grid>
      </Grid>
    </div>
  );
}
