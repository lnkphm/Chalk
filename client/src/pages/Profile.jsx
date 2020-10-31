import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import UserContext from '../contexts/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default function Profile(props) {
  const classes = useStyles();
  const data = React.useContext(UserContext);
  return (
    <Container maxWidth="md">
      <Typography className={classes.title} variant="h6">
        Hello, {data.user.name}
      </Typography>
    </Container>
  );
}
