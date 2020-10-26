import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {

  },

}))

export default function ExamResultDetails(props) {
  const classes = useStyles();
  const {match: {params}} = props;
  const url = `/courses/${params.courseId}/exams/${params.examId}/result`

  return (
    <div className={classes.root}>
      <h1>Exam Review</h1>
      <Button variant='a' href={url}>
        Back
      </Button>
    </div>
  )
}
