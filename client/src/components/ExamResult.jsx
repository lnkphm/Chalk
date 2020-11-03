import React from 'react';
import { useParams, Link as RouteLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function ExamResult(props) {
  const classes = useStyles();
  const { examId } = useParams();
  return (
    <Container className={classes.root} maxWidth="md">
      <h1>Exam Result</h1>
      <Button variant="outlined" component={RouteLink} to={`/exams/${examId}/review`}>
        Review
      </Button>
    </Container>
  );
}
