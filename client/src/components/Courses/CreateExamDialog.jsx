import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import LuxonUtils from '@date-io/luxon';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
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

import SaveIcon from '@material-ui/icons/Save';
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
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

export default function CreateExamDialog(props) {
  const classes = useStyles();
  const { courseId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
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
    course: courseId,
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

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`/api/exams`, state)
      .then((res) => {
        props.callback();
        enqueueSnackbar(`Exam ${res.data.title} created!`, {
          variant: 'success',
        });
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Create Exam
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <form onSubmit={onSubmit}>
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
                  Create new exam
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  type="submit"
                >
                  Save
                </Button>
              </Toolbar>
            </AppBar>
            <Container className={classes.root} maxWidth="md">
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
            </Container>
          </form>
        </MuiPickersUtilsProvider>
      </Dialog>
    </div>
  );
}
