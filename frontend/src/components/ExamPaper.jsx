import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import ExamPaperQuestionList from './ExamPaperQuestionList';
import ExamPaperNav from './ExamPaperNav';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

export default function ExamPaper(props) {
  const classes = useStyles();
  const {match: {params}} = props;

  return (
    <Container className={classes.root} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h3">Exam Paper</Typography>
          <Divider />
        </Grid>
        <Grid item xs={9}>
          <ExamPaperQuestionList />
        </Grid>
        <Grid item xs={3}>
          <ExamPaperNav course={params.courseId} exam={params.examId} />
        </Grid>
      </Grid>
    </Container>
  )
}
