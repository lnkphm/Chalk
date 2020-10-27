import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';

import Home from './components/Home';
import User from './components/User';
import AppBar from './components/AppBar';
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

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {}

  render() {
    const { classes } = this.props;

    return (
      <UserProvider>
        <Container>
          <Router>
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route>
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
              </Route>
            </Switch>
          </Router>
        </Container>
      </UserProvider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
