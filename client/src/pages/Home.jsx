import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import UserContext from '../contexts/UserContext';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: 'center',
  },
}));

export default function Home() {
  const data = React.useContext(UserContext);
  const courses = data.user.courses;
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>Upcoming</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>Calendar</Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={2}>
            {courses.map((item, index) => (
              <Grid key={index} item xs={12}>
                <Paper className={classes.paper}>
                  <Link component={RouteLink} to={`/courses/${item._id}`}>
                    {item.name}
                  </Link>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
