import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';

import AppBar from './components/AppBar';

import Landing from './pages/Landing';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Courses from './pages/Courses';
import Exams from './pages/Exams';
import Users from './pages/Users';

import UserContext from './contexts/UserContext';
import ProtectedRoute from './utils/ProtectedRoute';
import PublicRoute from './utils/PublicRoute';

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isAuthenticated: false,
      user: {},
    };
  }

  componentDidMount() {
    axios
      .get('/api/auth')
      .then((user) => {
        this.setState({
          isLoading: false,
          isAuthenticated: true,
          user: user.data,
        });
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          isAuthenticated: false
        })
        if (err.response) {
          console.log(err.response.status);
          console.log(err.response.data);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log(`Error: ${err.message}`);
        }
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <UserContext.Provider value={this.state}>
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
                <Route path="/profile" exact component={Profile} />
                <Route path="/courses" component={Courses} />
                <Route path="/exams" component={Exams} />
                <Route path="/users" exact component={Users} />
              </Switch>
            </ProtectedRoute>
          </Switch>
        </Router>
      </UserContext.Provider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
