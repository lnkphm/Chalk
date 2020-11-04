import React from 'react';
import { useParams, Link as RouteLink } from 'react-router-dom';
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
  const [value, setValue] = React.useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  }
  return (
    <Paper className={classes.paper}>
      <FormControl component="fieldset">
        <FormLabel component="legend">{props.question.text}</FormLabel>
        <RadioGroup name={props.question._id} value={value} onChange={handleChange}>
          {
            props.question.answers.map((item, index) => (
              <FormControlLabel key={index} value={item._id} control={<Radio />} label={item.text} />
            ))
          }
        </RadioGroup>
      </FormControl>   
    </Paper>
  );
}

function QuestionList(props) {
  const classes = useStyles();
  const questions = props.questions;
  console.log(questions);
  return (
    <div>
      <Grid container spacing={3}>
        {
          questions.map((item, index) => (
            <Grid key={index} item xs={12}>
              <Question question={item} />
            </Grid>
          ))
        }
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
        </CardContent>
        <CardActions>
          <Button type="submit" fullWidth>
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
  const [questions, setQuestions] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`/api/exams/${examId}/questions`)
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [examId]);
  return (
    <Container className={classes.root} maxWidth="md">
      <Typography variant="h4">Exam Paper</Typography>
      <Divider />
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <QuestionList questions={questions} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <PaperNav />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
