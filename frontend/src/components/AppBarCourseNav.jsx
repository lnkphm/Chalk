import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function AppBarCourseNav(props) {
  const classes = useStyles();
  const {
    match: { params },
  } = props;

  return (
    <div className={classes.root}>
      <Tabs value={props.value}>
        <Tab
          component="a"
          href={`/course/${params.courseId}`}
          label="Overview"
        />
        <Tab
          component="a"
          href={`/course/${params.courseId}/exams`}
          label="Exams"
        />
        <Tab
          component="a"
          href={`/course/${params.courseId}/users`}
          label="Users"
        />
        <Tab
          component="a"
          href={`/course/${params.courseId}/grades`}
          label="Grades"
        />
      </Tabs>
    </div>
  );
}
