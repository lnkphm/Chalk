import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(5),
    '&:hover': {
    }
  },
})


class HomeCourseListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <Container>
        <Paper elevation={1} className={classes.paper}>{this.props.name}</Paper>
      </Container>
    );
  }
}

export default withStyles(styles, {withTheme: true})(HomeCourseListItem);