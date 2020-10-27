import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
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
  return (
    <Container maxWidth="md">
      <Typography className={classes.title} variant="h6">
        Hello, {userData.isAuthenticated ? userData.user.name:''}
      </Typography>
    </Container>
  );
}
