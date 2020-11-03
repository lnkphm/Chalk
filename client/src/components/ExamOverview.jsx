import React from 'react';
import { useRouteMatch, useParams, Link as RouteLink } from 'react-router-dom';
import axios from 'axios';
import { DateTime } from 'luxon';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

export default function ExamOverview(props) {
  const classes = useStyles();
  const [exam, setExam] = React.useState({});
  const { url } = useRouteMatch();
  const { examId } = useParams();

  React.useEffect(() => {
    axios
      .get(`/api/exams/${examId}`)
      .then((res) => {
        setExam(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [examId]);

  return (
    <Container className={classes.root} maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h4">
            {exam.title}
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Description</Typography>
          <Typography>{exam.description}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Open date:{' '}
            {DateTime.fromISO(exam.dateOpen)
              .setLocale('vi-VN')
              .toLocaleString(DateTime.DATETIME_SHORT)}
          </Typography>
          <Typography>
            Close date:{' '}
            {DateTime.fromISO(exam.dateClose)
              .setLocale('vi-VN')
              .toLocaleString(DateTime.DATETIME_SHORT)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="primary"
            component={RouteLink}
            to={`${url}/paper`}
          >
            Start
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
