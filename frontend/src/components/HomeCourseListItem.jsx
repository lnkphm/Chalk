import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
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
        <Paper elevation={1} className={classes.paper}>
          <Link href={this.props.url}>
            {this.props.name}
          </Link>
        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles, {withTheme: true})(HomeCourseListItem);