import React from 'react';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({

})

class Course extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const {match: {params}} = this.props;
    return (
      <Container>
        <h1>Course {params.courseId}</h1>
      </Container>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Course);