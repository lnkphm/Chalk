import React from 'react';
import { Link as RouteLink, useHistory, Redirect } from 'react-router-dom';
import axios from 'axios';
import LuxonUtils from '@date-io/luxon';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBox from '@material-ui/core/Checkbox';

import UserContext from '../../contexts/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
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

export default function CreateCourse(props) {
  const classes = useStyles();
  const history = useHistory();
  const [categories, setCategories] = React.useState([]);
  const initState = {
    name: '',
    description: '',
    dateStart: new Date(),
    dateEnd: new Date(),
    public: true,
    password: '',
    category: '',
  };
  const [state, setState] = React.useState(initState);
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    axios
      .get(`/api/categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChangeValue = (event) => {
    const value = event.target.value;
    setState({ ...state, [event.target.name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`/api/courses`, state)
      .then((res) => {
        setState(initState);
        history.push(`/courses`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (user.role !== 'admin') {
    return <Redirect to="/home" />;
  }

  return (
    <MuiPickersUtilsProvider utils={LuxonUtils}>
      <Container className={classes.root} maxWidth="md">
        <form onSubmit={onSubmit}>
          <Card>
            <CardHeader title="Create New Course" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={8} sm={9} md={10}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    required
                    autoFocus
                    name="name"
                    value={state.name}
                    onChange={onChangeValue}
                  />
                </Grid>
                <Grid className={classes.checkbox} item xs={4} sm={3} md={2}>
                  <FormControlLabel
                    control={
                      <CheckBox
                        name="public"
                        checked={state.public}
                        onChange={(event) => {
                          setState({ ...state, public: event.target.checked });
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
                    label="Date Start"
                    inputVariant="outlined"
                    name="dateStart"
                    fullWidth
                    ampm={false}
                    value={state.dateStart}
                    onChange={(value) => {
                      setState({ ...state, dateStart: value });
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DateTimePicker
                    label="Date End"
                    inputVariant="outlined"
                    name="dateEnd"
                    fullWidth
                    ampm={false}
                    value={state.dateEnd}
                    onChange={(value) => {
                      setState({ ...state, dateEnd: value });
                    }}
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
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="labelRole">Category</InputLabel>
                    <Select
                      labelId="labelRole"
                      label="Category"
                      name="category"
                      required
                      value={state.category}
                      onChange={onChangeValue}
                    >
                      {categories.map((item, index) => (
                        <MenuItem key={index} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                className={classes.submitButton}
                variant="outlined"
                component={RouteLink}
                to="/courses"
              >
                Cancel
              </Button>
              <Button
                className={classes.submitButton}
                type="submit"
                variant="contained"
                color="primary"
              >
                Create
              </Button>
            </CardActions>
          </Card>
        </form>
      </Container>
    </MuiPickersUtilsProvider>
  );
}
