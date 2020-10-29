import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {

  },

}))

export default function ExamResult(props) {
  const classes = useStyles();
  const {match: {params}} = props;
  const url = `/courses/${params.courseId}/exams/${params.examId}/review`;

  return (
    <div className={classes.root}>
      <h1>Exam Result</h1>
      <Button variant="a" href={url}>
        Details
      </Button>
    </div>
  )
}
