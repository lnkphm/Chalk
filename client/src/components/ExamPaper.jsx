import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(3),
  }
}));

function QuestionList(props) {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Test Question</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Test Question</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Test Question</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Test Question</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Test Question</Paper>
        </Grid>
      </Grid>
    </div>
  )
}

function PaperNav(props) {
  const classes = useStyles();
  const { examId } = useParams();

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography>Exam Navigation</Typography>
        </CardContent>
        <CardActions>
          <Button variant="a" href={`/exams/${examId}/result`}>Submit</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default function ExamPaper(props) {
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth="md">
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <h1>Exam Paper</h1>
        <Divider />
      </Grid>
      <Grid item xs={8}>
        <QuestionList />
      </Grid>
      <Grid item xs={4}>
        <PaperNav />
      </Grid>
    </Grid>
  </Container>
  );
}
