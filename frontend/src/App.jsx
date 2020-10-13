import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';

import Home from './components/Home';
import Course from './components/Course';
import User from './components/User';
import Role from './components/Role';
import AppBar from './components/AppBar';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar
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
              <Route path="/home" component={Home} />
              <Route path="/course" component={Course} />
              <Route path="/user" component={User} />
              <Route path="/role" component={Role} />
            </Switch>
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
