import React from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import axios from 'axios';
import LuxonUtils from '@date-io/luxon';
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

import SaveIcon from '@material-ui/icons/Save';
import UserContext from '../../contexts/UserContext';

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
  const {user} = React.useContext(UserContext);
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
        setState(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [examId]);

  const onChangeValue = (event) => {
    const value = event.target.value;
    setState({ ...state, [event.target.name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
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

  if (user.role === 'student') {
    return <Redirect to="/home" />
  }

  return (
    <MuiPickersUtilsProvider utils={LuxonUtils}>
      <Container className={classes.root} maxWidth="md">
        <form onSubmit={onSubmit}>
          <Card>
            <CardHeader title="Edit Exam" />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={10}>
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
                <Grid className={classes.checkbox} item xs={2}>
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
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={5}
                    name="description"
                    value={state.description}
                    onChange={onChangeValue}
                  />
                </Grid>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
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

                <Grid item xs={10}>
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
                <Grid className={classes.checkbox} item xs={2}>
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
                  onClick={onClickCancel}
                >
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
    </MuiPickersUtilsProvider>
  );
}
