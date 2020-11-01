import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function ExamReview(props) {
  const classes = useStyles();
  const { examId } = useParams();
  return (
    <Container className={classes.root} maxWidth="md">
      <h1>Exam Review</h1>
      <Button variant="a" href={`/exams/${examId}/result`}>
        Back
      </Button>
    </Container>
  );
}