import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
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
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import SaveIcon from '@material-ui/icons/Save';

import CheckRole from '../../utils/CheckRole';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
  },
  answerText: {
    display: 'flex',
    alignItems: 'center',
  },
  actions: {
    marginLeft: 'auto',
  },
  saveButton: {
    marginLeft: theme.spacing(1),
  },
}));

function Answers(props) {
  const [answers, setAnswers] = useState(props.answers);
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
          return <div />;
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

export default function EditQuestion(props) {
  const classes = useStyles();
  const { examId, questionId } = useParams();
  const history = useHistory();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/questions/${questionId}`)
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [questionId]);

  const onChangeValue = (event) => {
    const value = event.target.value;
    setQuestion({ ...question, [event.target.name]: value });
  };

  const handleSubmitQuestion = (event) => {
    event.preventDefault();
    axios
      .put(`/api/questions/${questionId}`, question)
      .then(() => {
        history.push(`/exams/${examId}/questions`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const callbackAnswers = (answers) => {
    setQuestion({ ...question, answers: answers });
  };

  const handleClickCancel = () => {
    history.push(`/exams/${examId}/questions`);
  };

  if (!question) {
    return <CheckRole role="student" not={true} />;
  }

  return (
    <Container className={classes.root} maxWidth="md">    
      <form onSubmit={handleSubmitQuestion}>
        <Card>
          <CardHeader title="Edit question" />
          <Divider />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="labelType">Type</InputLabel>
                  <Select
                    labelId="labelType"
                    label="Type"
                    name="type"
                    value={question.type}
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
                  value={question.text}
                  onChange={onChangeValue}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Feedback"
                  variant="outlined"
                  fullWidth
                  name="feedback"
                  value={question.feedback}
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
                  value={question.points}
                  onChange={onChangeValue}
                />
              </Grid>
              <Grid item xs={12}>
                <Answers
                  type={question.type}
                  answers={question.answers}
                  callback={callbackAnswers}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <div className={classes.actions}>
              <Button variant="outlined" onClick={handleClickCancel}>
                Cancel
              </Button>
              <Button
                className={classes.saveButton}
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                type="submit"
              >
                Save
              </Button>
            </div>
          </CardActions>
        </Card>
      </form>
    </Container>
  );
}
