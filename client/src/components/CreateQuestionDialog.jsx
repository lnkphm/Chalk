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
    marginTop: theme.spacing(3),
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
  flex: {
    display: 'flex',
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
  }
}));

function Answers(props) {
  const [state, setState] = React.useState(props.answers);
  const classes = useStyles();

  const handleChangeText = (event, index) => {
    const newState = state;
    newState[index].text = event.target.value;
    props.callback(newState);
  };

  const handleChangeCheckbox = (event, index) => {
    const newState = state;
    newState[index].correct = event.target.checked;
    props.callback(newState);
  };

  const addAnswer = () => {
    const newState = state;
    newState.push({
      text: 'New answer',
      correct: false,
    });
    props.callback(newState);
  };

  const removeAnswer = (index) => {
    const newState = state;
    newState.splice(index, 1);
    props.callback(newState);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>Answers</Typography>
      </Grid>
      {state.map((item, index) => (
        <Grid item xs={12} key={index}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={10}>
              <div className={classes.flex}>
                <IconButton
                  onClick={() => {
                    return removeAnswer(index);
                  }}
                >
                  <ClearIcon />
                </IconButton>
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
      ))}
      <Grid item xs={12}>
        <Button variant="outlined" onClick={addAnswer}>
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
  const [state, setState] = React.useState({
    text: 'Question',
    type: 'multiple_choice',
    shuffle: true,
    feedback: 'No feedback',
    points: 1,
    answers: [
      {
        text: 'New answer',
        correct: false,
      },
    ],
    tags: [],
  });

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
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const callbackAnswers = (newAnswers) => {
    setState({ ...state, answers: newAnswers });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
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
          <Container className={classes.root}>
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
              <Grid item xs={11}>
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
              <Grid className={classes.checkbox} item xs={1}>
                <FormControlLabel
                  control={
                    <CheckBox
                      name="shuffle"
                      checked={state.shuffle}
                      onChange={(event) => {
                        setState({
                          ...state,
                          shuffle: event.target.checked,
                        });
                      }}
                      color="secondary"
                    />
                  }
                  label="Shuffle"
                />
              </Grid>
              <Grid item xs={12}>
                <Answers answers={state.answers} callback={callbackAnswers} />
              </Grid>
            </Grid>
          </Container>
        </form>
      </Dialog>
    </div>
  );
}
