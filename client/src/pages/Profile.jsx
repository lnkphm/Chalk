import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import UserContext from '../contexts/UserContext';
import DefaultAvatar from '../assets/images/avatar.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  save: {
    marginLeft: 'auto',
  },
}));

function UpdatePassword(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const onChangeValue = (event) => {
    const value = event.target.value;
    setState({ ...state, [event.target.name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const password = {
      currentPassword: state.currentPassword,
      newPassword: state.newPassword,
    };
    axios
      .put(`/api/users/${props.userId}/password`, password)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card>
      <form onSubmit={onSubmit}>
      <CardHeader title="Change password" />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Current password"
              variant="outlined"
              fullWidth
              name="currentPassword"
              type="password"
              value={state.currentPassword}
              onChange={onChangeValue}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="New password"
              variant="outlined"
              fullWidth
              name="newPassword"
              type="password"
              value={state.newPassword}
              onChange={onChangeValue}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm password"
              variant="outlined"
              fullWidth
              type="password"
              name="confirmPassword"
              value={state.confirmPassword}
              onChange={onChangeValue}
            />
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          className={classes.save}
          variant="outlined"
          type="submit"
        >
          Update password
        </Button>
      </CardActions>
      </form>
    </Card>
  );
}

export default function Profile(props) {
  const classes = useStyles();
  const userData = React.useContext(UserContext);
  const [state, setState] = React.useState(null);

  React.useEffect(() => {
    setState(userData.user);
  }, [userData.user]);

  const onChangeValue = (event) => {
    const value = event.target.value;
    setState({ ...state, [event.target.name]: value });
  };

  const onClickSave = (event) => {
    event.preventDefault();
    axios
      .put(`/api/users/${state._id}`, state)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className={classes.root} maxWidth="md">
      {state ? (
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent className={classes.content}>
                  <Avatar className={classes.avatar} src={DefaultAvatar} />
                  <Typography variant="h4">{userData.user.name}</Typography>
                  <Typography>{userData.user.email}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card>
                    <CardHeader title="Profile" />
                    <Divider />
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                          <TextField
                            label="ID"
                            variant="outlined"
                            fullWidth
                            name="_id"
                            disabled
                            value={state._id}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            name="name"
                            value={state.name}
                            onChange={onChangeValue}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            name="email"
                            value={state.email}
                            onChange={onChangeValue}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <Button
                        color="primary"
                        className={classes.save}
                        variant="outlined"
                        onClick={onClickSave}
                      >
                        Save changes
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <UpdatePassword userId={state._id} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div />
      )}
    </Container>
  );
}
