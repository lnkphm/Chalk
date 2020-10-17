import React from 'react';
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
      <div>
        <h1>Course {params.courseId}</h1>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Course);