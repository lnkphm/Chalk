import React from 'react';
import { Link as RouteLink, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
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

export default function EditUser(props) {
  const classes = useStyles();
  const history = useHistory();
  const { userId } = useParams();
  const [state, setState] = React.useState({
    username: '',
    name: '',
    email: '',
    role: 'student',
    password: '',
    confirmPassword: '',
  });

  React.useEffect(() => {
    axios.get(`/api/users/${userId}`)
      .then((res) => {
        const data = res.data;
        setState({...state,
          username: data.username,
          name: data.name,
          email: data.email,
          role: data.role
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }, [state, userId])

  const onChangeValue = (event) => {
    const value = event.target.value;
    setState({ ...state, [event.target.name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const updatedUser = {
      username: state.username,
      email: state.email,
      name: state.name,
      role: state.role,
      avatar: '',
    };

    axios
      .put(`/api/users/${userId}`, updatedUser)
      .then((res) => {
        history.push(`/users`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className={classes.root} maxWidth="md">
      <Link className={classes.back} component={RouteLink} to="/users">
        <ArrowBackIcon />
        <Typography>Back to users page</Typography>
      </Link>
      <Card>
        <form onSubmit={onSubmit}>
          <CardHeader title="Edit User" />
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
              type="submit"
              variant="outlined"
              color="primary"
            >
              Update User
            </Button>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
}
