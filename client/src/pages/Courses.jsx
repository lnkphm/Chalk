import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import CourseList from '../components/Courses/CourseList';
import CourseOverview from '../components/Courses/CourseOverview';
import CourseUsers from '../components/Courses/CourseUsers';
import CourseGrades from '../components/Courses/CourseGrades';
import CourseExams from '../components/Courses/CourseExams';
import CreateCourse from '../components/Courses/CreateCourse';
import EditCourse from '../components/Courses/EditCourse';

export default function Course(props) {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={CourseList} />
      <Route exact path={`${path}/create`} component={CreateCourse} />
      <Route exact path={`${path}/:courseId`} component={CourseOverview} />
      <Route exact path={`${path}/:courseId/edit`} component={EditCourse} />
      <Route exact path={`${path}/:courseId/exams`} component={CourseExams} />
      <Route exact path={`${path}/:courseId/users`} component={CourseUsers} />
      <Route exact path={`${path}/:courseId/grades`} component={CourseGrades} />
    </Switch>
  );
}
