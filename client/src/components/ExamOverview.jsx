import React from 'react';
import { useRouteMatch, useParams } from 'react-router-dom';
import axios from 'axios';
import { DateTime } from 'luxon';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  }
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
  }, []);

  return (
    <Container className={classes.root} maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h4">{exam.title}</Typography>
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
              .toLocaleString()}
          </Typography>
          <Typography>
            Close date:{' '}
            {DateTime.fromISO(exam.dateClose)
              .setLocale('vi-VN')
              .toLocaleString()}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Link color="inherit" href={`${url}/paper`}>
              Start
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
