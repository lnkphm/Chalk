import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import HomeCourseList from './HomeCourseList';

const styles = (theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  title: {},
  paper: {
    padding: theme.spacing(5),
    textAlign: 'center',
  },
});

class Course extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth="md" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <HomeCourseList />
          </Grid>
          <Grid item xs={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>Upcoming</Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>Calendar</Paper>
                </Grid>
              </Grid>
          </Grid>
          
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Course);
