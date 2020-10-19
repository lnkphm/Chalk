import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {

  }
}))

export default function CourseOverview (props){
    const classes = useStyles();
    const {match: {params}} = props;
    return (
      <div className={classes.root}>
        <h1>Course Overview {params.courseId}</h1>
      </div>
    );
  }
