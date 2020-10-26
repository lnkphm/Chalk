import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

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

import UserContext from './contexts/UserContext';

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {}

  login() {
    axios
      .get('/api/auth')
      .then((res) => {
        this.setState({
          user: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  logout() {
    this.setState({
      user: {},
    });
  }

  render() {
    const { classes } = this.props;

    const value = {
      user: this.state.user,
      login: this.login,
      logout: this.logout
    }

    return (
      <UserContext.Provider value={value}>
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
      </UserContext.Provider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
