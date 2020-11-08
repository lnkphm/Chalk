import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';

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
    marginBottom: theme.spacing(2),
  },
  breadcrumbs: {
    marginBottom: theme.spacing(2),
  },
  action: {
    marginLeft: 'auto',
  },
  back: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  checkbox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  saveButton: {
    marginLeft: theme.spacing(1),
  }
}));

export default function EditExam() {
  const classes = useStyles();
  const { examId } = useParams();
  const history = useHistory();
  const [state, setState] = React.useState({
    title: '',
    description: '',
    dateOpen: new Date(),
    dateClose: new Date(),
    duration: '0',
    shuffle: false,
    gradingMethod: 'normal',
    public: false,
    password: '',
    course: '',
  });

  React.useEffect(() => {
    axios
      .get(`/api/exams/${examId}`)
      .then((res) => {
        const exam = res.data;
        setState({
          title: exam.title,
          description: exam.description,
          dateOpen: exam.dateOpen,
          dateClose: exam.dateClose,
          duration: exam.duration,
          shuffle: exam.shuffle,
          gradingMethod: exam.gradingMethod,
          public: exam.public,
          password: exam.password,
          course: exam.course,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [examId]);

  const onChangeValue = (event) => {
    const value = event.target.value;
    setState({ ...state, [event.target.name]: value });
  };

  const onClickSave = () => {
    axios
      .put(`/api/exams/${examId}`, state)
      .then((res) => {
        history.push(`/exams/${examId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickCancel = () => {
    history.push(`/exams/${examId}`);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Container className={classes.root}>
        <Card>
          <CardHeader title="Edit Exam" />
          <Divider />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  required
                  name="title"
                  value={state.title}
                  onChange={onChangeValue}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  name="description"
                  value={state.description}
                  onChange={onChangeValue}
                />
              </Grid>
              <Grid className={classes.checkbox} item xs={12}>
                <FormControlLabel
                  control={
                    <CheckBox
                      name="public"
                      checked={state.public}
                      onChange={(event) => {
                        setState({
                          ...state,
                          public: event.target.checked,
                        });
                      }}
                      color="secondary"
                    />
                  }
                  label="Public"
                />
              </Grid>
              <Grid item xs={12}>
                <DateTimePicker
                  label="Date Open"
                  inputVariant="outlined"
                  name="dateOpen"
                  fullWidth
                  ampm={false}
                  value={state.dateOpen}
                  onChange={(value) => {
                    setState({ ...state, dateOpen: value });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <DateTimePicker
                  label="Date Close"
                  inputVariant="outlined"
                  name="dateClose"
                  fullWidth
                  ampm={false}
                  value={state.dateClose}
                  onChange={(value) => {
                    setState({ ...state, dateClose: value });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Duration"
                  variant="outlined"
                  fullWidth
                  name="duration"
                  type="number"
                  value={state.duration}
                  onChange={onChangeValue}
                />
              </Grid>
              <Grid className={classes.checkbox} item xs={12}>
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
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="labelMethod">Grading Method</InputLabel>
                  <Select
                    labelId="labelMethod"
                    label="Grading Method"
                    name="gradingMethod"
                    value={state.gradingMethod}
                    onChange={onChangeValue}
                  >
                    <MenuItem value="normal">Normal</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  name="password"
                  value={state.password}
                  onChange={onChangeValue}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <div className={classes.action}>
              <Button
                variant="outlined"
                type="submit"
                onClick={onClickCancel}
              >
                Cancel
              </Button>
              <Button
                className={classes.saveButton}
                variant="outlined"
                color="primary"
                type="submit"
                onClick={onClickSave}
              >
                Save
              </Button>
            </div>
          </CardActions>
        </Card>
      </Container>
    </MuiPickersUtilsProvider>
  );
}
