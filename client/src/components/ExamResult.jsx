import React from 'react';
import { useParams, Link as RouteLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  reviewButton: {
    marginLeft: 'auto',
  },
}));

export default function ExamResult(props) {
  const classes = useStyles();
  const { examId } = useParams();
  return (
    <Container className={classes.root} maxWidth="md">
      <Typography className={classes.title} variant="h4">
        Exam result
      </Typography>
      <Card >
        <CardHeader title="Exam title" />
        <Divider />
        <CardContent>
          <div className={classes.examGrade}>
            <Typography>User: blahbloh</Typography>
            <Typography>Submitted: Time and date</Typography>
            <Typography>Points: 40/45</Typography>
            <Typography>Grade: 9</Typography>
          </div>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            variant="outlined"
            className={classes.reviewButton}
            component={RouteLink}
            to={`/exams/${examId}/review`}
          >
            Review
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}
