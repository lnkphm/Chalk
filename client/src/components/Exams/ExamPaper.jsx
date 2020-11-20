import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
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
  const [data, setData] = useState(props.data);

  const handleChange = (index) => (event) => {
    let newData = [...data];
    newData[index].answer = event.target.value;
    setData(newData);
    props.callback(newData);
  };

  return (
    <div>
      <Grid container spacing={3}>
        {props.data.map((item, index) => (
          <Grid key={index} item xs={12}>
            <Paper className={classes.paper}>
              <FormControl component="fieldset">
                <FormLabel component="legend">{item.question.text}</FormLabel>
                <RadioGroup
                  name={item._id}
                  value={data[index].answer}
                  id={item._id}
                  onChange={handleChange(index)}
                >
                  {item.question.answers.map((item, index) => (
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
  const [time, setTime] = React.useState(props.time * 60);
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
            {props.data.map((item, index) => (
              <Grid item xs={2} key={index}>
                {item.answer === '' ? (
                  <Paper className={classes.navItem}>
                    <Link color="inherit" href={`#${item._id}`}>
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
  const { user } = useContext(UserContext);
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchData = () => {
      axios.get(`/api/papers?user=${user._id}&exam=${examId}`).then((res) => {
        if (res.data.length !== 0) {
          axios.get(`/api/papers/${res.data[0]._id}`).then((res) => {
            setPaper(res.data);
            setLoading(false);
          });
        } else {
          axios.get(`/api/exams/${examId}`).then((res) => {
            const examData = res.data;
            const newPaper = {
              user: user._id,
              exam: examData._id,
              submitted: false,
              timeRemaining: examData.duration,
              data: examData.questions.map((item, index) => {
                return {
                  question: item,
                  answer: '',
                  points: 0,
                };
              }),
            };
            axios
              .post(`/api/papers`, newPaper)
              .then((res) => {
                axios.get(`/api/papers/${res.data._id}`).then((res) => {
                  setPaper(res.data);
                  setLoading(false);
                });
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (paper.timeRemaining !== 0) {
        updatePaper();
      } else {
        submitPaper();
      }
    }
  }, [paper, loading]);

  useEffect(() => {
    if (!loading) {
      const interval = setInterval(() => {
        setPaper((paper) => {
          return { ...paper, timeRemaining: paper.timeRemaining - 1 };
        });
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const updatePaper = () => {
    const data = {
      user: paper.user,
      exam: paper.exam._id,
      submitted: false,
      timeRemaining: paper.timeRemaining,
      data: paper.data.map((item, index) => {
        return {
          question: item.question._id,
          answer: item.answer,
          points: 0,
        };
      }),
    };
    axios.put(`/api/papers/${paper._id}`, data)
    .then(res => {
      console.log(`Paper updated!`);
    })
  };

  const submitPaper = () => {
    const data = {
      user: paper.user,
      exam: paper.exam._id,
      submitted: true,
      timeRemaining: paper.timeRemaining,
      data: paper.data.map((item, index) => {
        return {
          question: item.question._id,
          answer: item.answer,
          points: 0,
        };
      }),
    };
    axios.put(`/api/papers/${paper._id}`, data)
    .then(res => {
      history.push(`/exams/${examId}/result`);
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitPaper();
  };

  const questionListCallback = (data) => {
    setPaper({ ...paper, data: data });
  };

  return (
    <Container className={classes.root} maxWidth="md">
      {paper ? (
        paper.submitted ? (
          <Redirect to={`/exams/${examId}/result`} />
        ) : (
          <div>
            <Typography className={classes.title} variant="h4">
              {paper.exam.title}
            </Typography>
            <Divider />
            <form onSubmit={handleSubmit}>
              <Grid className={classes.main} container spacing={3}>
                <Grid item xs={12} sm={8}>
                  <QuestionList
                    data={paper.data}
                    callback={questionListCallback}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <PaperNav time={paper.timeRemaining} data={paper.data} />
                </Grid>
              </Grid>
            </form>
          </div>
        )
      ) : (
        <div />
      )}
    </Container>
  );
}
