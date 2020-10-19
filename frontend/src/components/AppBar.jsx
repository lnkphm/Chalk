import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

import AppBarDrawer from './AppBarDrawer';
import AppBarAccount from './AppBarAccount';
import AppBarTitle from './AppBarTitle';
import AppBarCourseNav from './AppBarCourseNav';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function AppBarCourseNavRoutes() {
  return (
    <Router>
      <Switch>
        <Route
          path="/courses/:courseId"
          exact
          render={(props) => <AppBarCourseNav {...props} value={0} />}
        />
        <Route
          path="/courses/:courseId/exams"
          exact
          render={(props) => <AppBarCourseNav {...props} value={1} />}
        />
        <Route
          path="/courses/:courseId/users"
          exact
          render={(props) => <AppBarCourseNav {...props} value={2} />}
        />
        <Route
          path="/courses/:courseId/grades"
          exact
          render={(props) => <AppBarCourseNav {...props} value={3} />}
        />
      </Switch>
    </Router>
  );
}

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <AppBarDrawer />
          <AppBarTitle text="Chalk" />
          <AppBarCourseNavRoutes />
          <AppBarAccount />
        </Toolbar>
      </AppBar>
    </div>
  );
}
