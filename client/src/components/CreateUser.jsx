import React from 'react';
import { Link as RouteLink, useHistory } from 'react-router-dom';
import axios from 'axios';
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

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
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
}));

export default function CreateUser(props) {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    role: 'student',
  });

  const onChangeValue = (event) => {
    const value = event.target.value;
    setState({ ...state, [event.target.name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      username: state.username,
      email: state.email,
      name: state.name,
      password: state.password,
      role: state.role,
      avatar: '',
    };

    axios
      .post(`/api/users`, newUser)
      .then((res) => {
        history.push(`/users`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className={classes.root} maxWidth="md">
      <Card>
        <form onSubmit={onSubmit}>
          <CardHeader title="Create New User" />
          <Divider />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField
                  label="Fullname"
                  variant="outlined"
                  fullWidth
                  required
                  name="name"
                  value={state.name}
                  onChange={onChangeValue}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="labelRole">Role</InputLabel>
                  <Select
                    labelId="labelRole"
                    label="Role"
                    name="role"
                    value={state.role}
                    onChange={onChangeValue}
                  >
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="teacher">Teacher</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  required
                  name="username"
                  value={state.username}
                  onChange={onChangeValue}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  name="email"
                  type="email"
                  value={state.email}
                  onChange={onChangeValue}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                  name="password"
                  type="password"
                  value={state.password}
                  onChange={onChangeValue}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  required
                  name="confirmPassword"
                  type="password"
                  value={state.confirmPassword}
                  onChange={onChangeValue}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
          <Button
              className={classes.submitButton}
              variant="outlined"
              component={RouteLink}
              to="/users"
            >
              Cancel
            </Button>
            <Button
              className={classes.submitButton}
              type="submit"
              variant="outlined"
              color="primary"
            >
              Create
            </Button>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
}
