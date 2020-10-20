import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {

  },

}))

export default function ExamResultDetails(props) {
  const classes = useStyles();

  return (
    <div>
      <h1>Result Details</h1>
    </div>
  )
}