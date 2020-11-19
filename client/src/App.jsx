import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

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

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

export default function App() {
  const classes = useStyles();
  const [state, setState] = useState({
    loading: true,
    auth: false,
    user: {},
  })

  useEffect(() => {
    axios.get(`/api/auth`)
    .then((res) => {
      setState({
        loading: false,
        auth: true,
        user: res.data
      })
    })
    .catch((err) => {
      setState({
        loading: false,
      });
    })
  }, [])

  return (
    <UserContext.Provider value={state}>
      <Router>
        <Switch>
          <PublicRoute path="/" exact>
            <Landing />
          </PublicRoute>
          <ProtectedRoute>
            <CssBaseline />
            <AppBar />
            <div className={classes.toolbar} />
            <Switch>
              <Route path="/home" exact component={Home} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/courses" component={Courses} />
              <Route path="/exams" component={Exams} />
              <Route path="/users" component={Users} />
            </Switch>
          </ProtectedRoute>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}
