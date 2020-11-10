import React from 'react';
import { useParams, Link as RouteLink, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import UserContext from '../contexts/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(3),
  },
}));

function Question(props) {
  const classes = useStyles();
  const [state, setState] = React.useState(props.question);
  const [answer, setAnswer] = React.useState('');

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  return (
    <Paper className={classes.paper}>
      <FormControl component="fieldset">
        <FormLabel component="legend">{state.text}</FormLabel>
        <RadioGroup name={state._id} value={answer} onChange={handleChange}>
          {state.answers.map((item, index) => (
            <FormControlLabel
              key={index}
              value={item._id}
              control={<Radio />}
              label={item.text}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Paper>
  );
}

function QuestionList(props) {
  const questions = props.questions;
  return (
    <div>
      <Grid container spacing={3}>
        {questions.map((item, index) => (
          <Grid key={index} item xs={12}>
            <Question question={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

function PaperNav(props) {
  const classes = useStyles();
  const { examId } = useParams();

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography>Exam Navigation</Typography>
          <Typography>Time Remaining: {props.time}</Typography>
        </CardContent>
        <CardActions>
          <Button
            type="submit"
            fullWidth
            component={RouteLink}
            to={`/exams/${examId}/result`}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default function ExamPaper(props) {
  const classes = useStyles();
  const { examId } = useParams();
  const userData = React.useContext(UserContext);
  const [exam, setExam] = React.useState(null);
  const [paper, setPaper] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`/api/exams/${examId}/details`)
      .then((res) => {
        const examData = res.data;
        setExam(res.data)
        axios.get(`/api/papers?user=${userData.user._id}`).then((res) => {
          const paperData = res.data;
          if (paperData.length !== 0) {
            setPaper(paperData[0]);
          } else {
            const paper = {
              user: userData.user._id,
              exam: examData._id,
              submitted: false,
              timeRemaining: examData.duration,
              data: examData.questions.map((item, index) => {
                return {
                  question: item,
                  answers: [],
                };
              }),
            };
            axios
              .post(`/api/papers`, paper)
              .then((res) => {
                setPaper(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [examId, userData.user._id]);

  console.log(paper);
  return (
    <Container className={classes.root} maxWidth="md">
      <Typography variant="h4">Exam Paper</Typography>
      <Divider />
      {paper ? (
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <QuestionList questions={exam.questions} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <PaperNav time={paper.timeRemaining} />
            </Grid>
          </Grid>
        </form>
      ) : (
        <div />
      )}
    </Container>
  );
}
