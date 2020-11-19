import React from 'react';
import {
  useParams,
  useHistory,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';
import { Duration } from 'luxon';
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
import Link from '@material-ui/core/Link';

import UserContext from '../../contexts/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
  },
  main: {
    marginTop: theme.spacing(1),
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  nav: {
    marginBottom: theme.spacing(1),
  },
  navItem: {
    padding: theme.spacing(1),
    textAlign: 'center',
  },
  navItemChecked: {
    padding: theme.spacing(1),
    textAlign: 'center',
    backgroundColor: '#dc004e',
  },
  linkChecked: {
    color: '#FFF',
  },
  timeRemaining: {
    marginTop: theme.spacing(1),
  },
}));

function QuestionList(props) {
  const classes = useStyles();
  const [answers, setAnswers] = React.useState(props.answers);

  const handleChange = (type, index) => (event) => {
    let newAnswers = [...answers];
    if (type === 'single') {
      newAnswers[index].answers = [event.target.value];
    }
    setAnswers(newAnswers);
    props.callback(answers);
  };

  return (
    <div>
      <Grid container spacing={3}>
        {props.questions.map((item, index) => (
          <Grid key={index} item xs={12}>
            <Paper className={classes.paper}>
              <FormControl component="fieldset">
                <FormLabel component="legend">{item.text}</FormLabel>
                <RadioGroup
                  name={item._id}
                  value={answers[index].answers[0]}
                  id={item._id}
                  onChange={handleChange('single', index)}
                >
                  {item.answers.map((item, index) => (
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
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

function PaperNav(props) {
  const [time, setTime] = React.useState(props.paper.timeRemaining * 60);
  const classes = useStyles();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const displayTime = (time) => {
    return Duration.fromObject({ seconds: time }).toFormat('mm:ss');
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Grid className={classes.nav} container spacing={1}>
            {props.paper.data.map((item, index) => (
              <Grid item xs={2} key={index}>
                {item.answers[0] === '' ? (
                  <Paper className={classes.navItem}>
                    <Link color="inherit" href={`#${item.question}`}>
                      {index + 1}
                    </Link>
                  </Paper>
                ) : (
                  <Paper className={classes.navItemChecked}>
                    <Link
                      className={classes.linkChecked}
                      href={`#${item.question}`}
                    >
                      {index + 1}
                    </Link>
                  </Paper>
                )}
              </Grid>
            ))}
          </Grid>
          <Divider />
          <Typography className={classes.timeRemaining}>
            Time Remaining: {displayTime(time)}
          </Typography>
        </CardContent>
        <Divider />
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
  const history = useHistory();
  const userData = React.useContext(UserContext);
  const [exam, setExam] = React.useState(null);
  const [paper, setPaper] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`/api/exams/${examId}/details`)
      .then((res) => {
        const examData = res.data;
        setExam(res.data);
        axios
          .get(`/api/papers?user=${userData.user._id}&exam=${examData._id}`)
          .then((res) => {
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
                    answers: [''],
                    points: 0,
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

  const updatePaper = () => {
    axios
      .put(`/api/papers/${paper._id}`, paper)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitPaper = () => {
    const data = {
      ...paper,
      submitted: true,
    };

    axios
      .put(`/api/papers/${paper._id}`, data)
      .then((res) => {
        history.push(`/exams/${examId}/result`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    if (!paper) {
      return;
    } else {
      const interval = setInterval(() => {
        setPaper({ ...paper, timeRemaining: paper.timeRemaining - 1 });
        if (paper.timeRemaining > 0) {
          updatePaper();
        } else {
          submitPaper();
        }
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [paper]);

  const handleSubmit = (event) => {
    event.preventDefault();
    submitPaper();
  };

  const questionCallback = (data) => {
    setPaper({ ...paper, data: data });
  };

  return (
    <Container className={classes.root} maxWidth="md">
      {exam ? (
        <Typography className={classes.title} variant="h4">
          {exam.title}
        </Typography>
      ) : (
        <div />
      )}
      <Divider />
      {paper ? (
        paper.submitted ? (
          <Redirect to={`/exams/${examId}/result`} />
        ) : (
          <form onSubmit={handleSubmit}>
            <Grid className={classes.main} container spacing={3}>
              <Grid item xs={12} sm={8}>
                <QuestionList
                  questions={exam.questions}
                  answers={paper.data}
                  callback={questionCallback}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <PaperNav paper={paper} />
              </Grid>
            </Grid>
          </form>
        )
      ) : (
        <div />
      )}
    </Container>
  );
}
