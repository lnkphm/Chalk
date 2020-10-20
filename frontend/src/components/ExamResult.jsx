import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {

  },

}))

export default function ExamResult(props) {
  const classes = useStyles();

  return (
    <div>
      <h1>Result</h1>
    </div>
  )
}