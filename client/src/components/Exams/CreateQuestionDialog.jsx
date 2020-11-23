import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Grow from '@material-ui/core/Grow';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBox from '@material-ui/core/Checkbox';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  breadcrumbs: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginLeft: 'auto',
  },
  back: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
  },
  answerText: {
    display: 'flex',
    alignItems: 'center'
  }
}));

function Answers(props) {
  const [answers, setAnswers] = React.useState(props.answers);
  const classes = useStyles();

  const handleChangeText = (event, index) => {
    const newAnswers = answers;
    newAnswers[index].text = event.target.value;
    callback(newAnswers);
  };

  const handleChangeCheckbox = (event, index) => {
    const newAnswers = answers;
    newAnswers[index].correct = event.target.checked;
    callback(newAnswers);
  };

  const addAnswer = () => {
    const newAnswers = answers;
    newAnswers.push({
      text: 'New answer',
      correct: false,
    });
    callback(newAnswers);
  };

  const removeAnswer = (index) => {
    const newAnswers = answers;
    newAnswers.splice(index, 1);
    callback(newAnswers);
  };

  const callback = (newAnswers) => {
    setAnswers(newAnswers);
    props.callback(newAnswers);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>Answers</Typography>
      </Grid>
      {answers.map((item, index) => {
        if (props.type === 'multiple_choice') {
          return (
            <Grid item xs={12} key={index}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={10}>
                  <div className={classes.answerText}>
                    <div>
                      <IconButton
                        onClick={() => {
                          return removeAnswer(index);
                        }}
                      >
                        <ClearIcon />
                      </IconButton>
                    </div>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={item.text}
                      onChange={(event) => {
                        return handleChangeText(event, index);
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <FormControlLabel
                    control={
                      <CheckBox
                        name="correct"
                        checked={item.correct}
                        color="secondary"
                        onChange={(event) => {
                          return handleChangeCheckbox(event, index);
                        }}
                      />
                    }
                    label="Correct"
                  />
                </Grid>
              </Grid>
            </Grid>
          );
        } else if (props.type === 'short_answer') {
          return (
            <Grid item xs={12} key={index}>
              <div className={classes.answerText}>
                <div>
                  <IconButton
                    onClick={() => {
                      return removeAnswer(index);
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </div>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={item.text}
                  onChange={(event) => {
                    return handleChangeText(event, index);
                  }}
                />
              </div>
            </Grid>
          );
        } else {
          return <div />
        }
      })}
      <Grid item xs={12}>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={addAnswer}>
          Add answer
        </Button>
      </Grid>
    </Grid>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

export default function CreateQuestionDialog(props) {
  const classes = useStyles();
  const { examId } = useParams();
  const [open, setOpen] = React.useState(false);
  const initState = {
    text: 'Question',
    type: 'multiple_choice',
    feedback: 'No feedback',
    points: 1,
    answers: [
      {
        text: 'New answer',
        correct: false,
      },
    ],
    tags: [],
  }
  const [state, setState] = React.useState(initState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeValue = (event) => {
    const value = event.target.value;
    setState({ ...state, [event.target.name]: value });
  };

  const onSubmitQuestion = (event) => {
    event.preventDefault();
    axios
      .post(`/api/questions`, state)
      .then((res) => {
        const data = {
          questions: [],
        };
        data.questions.push(res.data._id);
        axios
          .post(`/api/exams/${examId}/questions`, data)
          .then((res) => {
            props.callback();
            setState(initState);
            handleClose();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const callbackAnswers = (answers) => {
    console.log(answers);
    setState({ ...state, answers: answers });
  };

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        color="primary"
        onClick={handleClickOpen}
      >
        Add new
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <form onSubmit={onSubmitQuestion}>
          <AppBar className={classes.appBar} color="default">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                New question
              </Typography>
              <Button autoFocus color="inherit" type="submit">
                Save
              </Button>
            </Toolbar>
          </AppBar>
          <Container className={classes.root} maxWidth="md">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="labelType">Type</InputLabel>
                  <Select
                    labelId="labelType"
                    label="Type"
                    name="type"
                    value={state.type}
                    onChange={onChangeValue}
                  >
                    <MenuItem value="multiple_choice">Multiple Choice</MenuItem>
                    <MenuItem value="short_answer">Short Answer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Text"
                  variant="outlined"
                  fullWidth
                  required
                  name="text"
                  multiline
                  rows={4}
                  value={state.text}
                  onChange={onChangeValue}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Feedback"
                  variant="outlined"
                  fullWidth
                  name="feedback"
                  value={state.feedback}
                  onChange={onChangeValue}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Points"
                  variant="outlined"
                  fullWidth
                  name="points"
                  type="number"
                  value={state.points}
                  onChange={onChangeValue}
                />
              </Grid>
              <Grid item xs={12}>
                <Answers
                  type={state.type}
                  answers={state.answers}
                  callback={callbackAnswers}
                />
              </Grid>
            </Grid>
          </Container>
        </form>
      </Dialog>
    </div>
  );
}
