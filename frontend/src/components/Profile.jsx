import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserContext from '../contexts/UserContext';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default function Profile(props) {
  const classes = useStyles();
  return (
    <UserContext.Consumer>
      {(data) => {
        console.log(data.user);
        return (
          <Container maxWidth="md">
            <Typography className={classes.title} variant="h6">
              Hello, {!(_.isEmpty(data.user)) ? data.user.name : 'anon'}
            </Typography>
            <Button onClick={data.login}>Log In</Button>
            <Button onClick={data.logout}>Log Out</Button>
          </Container>
        );
      }}
    </UserContext.Consumer>
  );
}
