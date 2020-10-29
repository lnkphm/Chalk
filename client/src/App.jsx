import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Landing from './pages/Landing';
import AppBar from './components/AppBar';
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';
import CourseOverview from './components/CourseOverview';
import CourseExams from './components/CourseExams';
import CourseUsers from './components/CourseUsers';
import CourseGrades from './components/CourseGrades';
import Exam from './components/Exam';
import ExamPaper from './components/ExamPaper';
import ExamResult from './components/ExamResult';
import ExamReview from './components/ExamReview';

import UserProvider from './contexts/UserProvider';
import ProtectedRoute from './utils/ProtectedRoute';
import PublicRoute from './utils/PublicRoute';

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
});

class App extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <UserProvider>
        <Router>
          <Switch>
            <PublicRoute path="/" exact>
              <Landing />
            </PublicRoute>
            <ProtectedRoute>
              <AppBar />
              <div className={classes.toolbar} />
              <Switch>
                <Route path="/home" exact component={Home} />
                <Route path="/user" exact component={User} />
                <Route path="/profile" exact component={Profile} />
                <Route
                  path="/courses/:courseId"
                  exact
                  component={CourseOverview}
                />
                <Route
                  path="/courses/:courseId/exams"
                  exact
                  component={CourseExams}
                />
                <Route
                  path="/courses/:courseId/users"
                  exact
                  component={CourseUsers}
                />
                <Route
                  path="/courses/:courseId/grades"
                  exact
                  component={CourseGrades}
                />
                <Route
                  path="/courses/:courseId/exams/:examId"
                  exact
                  component={Exam}
                />
                <Route
                  path="/courses/:courseId/exams/:examId/paper"
                  exact
                  component={ExamPaper}
                />
                <Route
                  path="/courses/:courseId/exams/:examId/result"
                  exact
                  component={ExamResult}
                />
                <Route
                  path="/courses/:courseId/exams/:examId/review"
                  exact
                  component={ExamReview}
                />
              </Switch>
            </ProtectedRoute>
          </Switch>
        </Router>
      </UserProvider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
