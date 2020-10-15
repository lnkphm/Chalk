import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import HomeCourseListItem from './HomeCourseListItem';

const styles = (theme) => ({
})

class HomeCourseList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <HomeCourseListItem name="Course 1" />
          </Grid>
          <Grid item xs={12}>
            <HomeCourseListItem name="Course 2" />
          </Grid>
          <Grid item xs={12}>
            <HomeCourseListItem name="Course 3" />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles, {withTheme: true})(HomeCourseList);