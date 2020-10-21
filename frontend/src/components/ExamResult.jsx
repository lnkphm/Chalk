import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {

  },

}))

export default function ExamResult(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Result</h1>
      <Button variant="a" href={window.location.href + "/details"}>
        Details
      </Button>
    </div>
  )
}
