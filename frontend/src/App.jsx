import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

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

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

function App() {
  const classes = useStyles();
  return (
    <Container>
      <Router>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
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
                path="/courses/:courseId/exams/:examId/papers/:paperId"
                exact
                component={ExamPaper}
              />
            </Switch>
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
