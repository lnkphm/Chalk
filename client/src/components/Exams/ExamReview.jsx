import React, {useState} from 'react';
import {
  useParams,
  Link as RouteLink,
} from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
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
import TextField from '@material-ui/core/TextField';

import UserContext from '../../contexts/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4)
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
  correctAnswer: {
    color: "#dc004e",
  },
  answers: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  points: {
    marginTop: 'auto',
  }
}));

function QuestionList(props) {
  const classes = useStyles();
  const [data, setData] = useState(props.data);

  return (
    <div>
      <Grid container spacing={3}>
        {props.data.map((item, index) => {
          if (item.question.type === 'multiple_choice') {
            return (
              <Grid key={index} item xs={12}>
                <Card>
                  <CardHeader
                    title={`Question ${index + 1}`}
                    subheader={`points: ${item.points}/${item.question.points}`}
                  />
                  <Divider />
                  <CardContent>
                    <Typography variant="body1" component="p">
                      {item.question.text}
                    </Typography>
                    <div className={classes.answers}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Answers</FormLabel>
                        <RadioGroup
                          name={item._id}
                          value={data[index].answer}
                          id={item._id}
                        >
                          {item.question.answers.map((item, index) => {
                            if (item.correct) {
                              return (
                                <FormControlLabel
                                  className={classes.correctAnswer}
                                  key={index}
                                  value={item._id}
                                  control={<Radio />}
                                  label={item.text}
                                />
                              );
                            } else {
                              return (
                                <FormControlLabel
                                  key={index}
                                  value={item._id}
                                  control={<Radio />}
                                  label={item.text}
                                />
                              );
                            }
                          })}
                        </RadioGroup>
                      </FormControl>
                    </div>
                    <Typography>Feedback: {item.question.feedback}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          } else if (item.question.type === 'short_answer') {
            return (
              <Grid key={index} item xs={12}>
                <Card>
                  <CardHeader
                    title={`Question ${index + 1}`}
                    subheader={`points: ${item.points}/${item.question.points}`}
                  />
                  <Divider />
                  <CardContent>
                    <Typography variant="body1" component="p">
                      {item.question.text}
                    </Typography>
                    <div className={classes.answers}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        name={item._id}
                        value={data[index].answer}
                        label="Answer"
                      />
                    </div>
                    <Typography>Correct answers:</Typography>
                    {item.question.answers.map((item, index) => (
                      <Typography key={index}>{`• ${item.text}`}</Typography>
                    ))}
                    <Typography>Feedback: {item.question.feedback}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          } else {
            return <div />;
          }
        })}
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
          <Grid className={classes.nav} container spacing={1}>
            {props.paper.data.map((item, index) => (
              <Grid item xs={2} key={index}>
                <Paper className={classes.navItem}>
                  <Link color="inherit" href={`#${item._id}`}>
                    {index + 1}
                  </Link>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            component={RouteLink}
            to={`/exams/${examId}/result`}
            fullWidth
          >
            Back to result
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default function ExamReview() {
  const classes = useStyles();
  const { examId } = useParams();
  const userData = React.useContext(UserContext);
  const [paper, setPaper] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`/api/papers?user=${userData.user._id}&exam=${examId}`)
      .then((res) => {
        axios.get(`/api/papers/${res.data[0]._id}`).then((res) => {
          setPaper(res.data);
        });
      });
  }, []);

  return (
    <Container className={classes.root} maxWidth="md">
      {paper ? (
        <div>
          <Typography className={classes.title} variant="h4">
            {paper.exam.title}
          </Typography>
          <Divider />
          <Grid className={classes.main} container spacing={3}>
            <Grid item xs={12} sm={8}>
              <QuestionList data={paper.data} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <PaperNav paper={paper} />
            </Grid>
          </Grid>
        </div>
      ) : (
        <div />
      )}
    </Container>
  );
}
