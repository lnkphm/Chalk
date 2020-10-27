import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import UserProvider from '../contexts/UserProvider';

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default function Profile(props) {
  const classes = useStyles();
  const userData = React.useContext(UserProvider.context);
  console.log(userData);
  return (
    <Container maxWidth="md">
      <Typography className={classes.title} variant="h6">
        Hello, {!_.isEmpty(userData) ? userData.name : 'anon'}
      </Typography>
      <Button>Log In</Button>
      <Button>Log Out</Button>
    </Container>
  );
}
