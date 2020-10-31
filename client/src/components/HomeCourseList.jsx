import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import HomeCourseListItem from './HomeCourseListItem';
import UserProvider from '../contexts/UserProvider';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function renderCourses(arr) {
  if (arr) {
    return arr.map((course, index) => (
      <Grid item xs={12}>
        <HomeCourseListItem
          name={course.data.name}
          url={`/courses/${course.data._id}`}
        />
      </Grid>
    ))
  }
}

export default function HomeCourseList(props) {
  const [courses, setCourses] = React.useState([{}]);
  const user = React.useContext(UserProvider.context);

  React.useEffect(() => {
    const fetchData = async() => {
      const result = await axios.get(`/api/users/${user.data._id}/courses`);
      setCourses(result);
      console.log(result);
    }
    fetchData();
  })

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {/* {renderCourses(courses)} */}

        <Grid item xs={12}>
          <HomeCourseListItem name="Course 2" url="/courses/2" />
        </Grid>
        <Grid item xs={12}>
          <HomeCourseListItem name="Course 3" url="/courses/3" />
        </Grid>
      </Grid>
    </div>
  );
}
