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

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <AppBarDrawer />
          <AppBarTitle text="Chalk" />
          <Switch>
            <Route
              path="/course/:courseId"
              exact
              render={(props) => <AppBarCourseNav {...props} value={0} />}
            />
            <Route
              path="/course/:courseId/users"
              exact
              render={(props) => <AppBarCourseNav {...props} value={1} />}
            />
            <Route
              path="/course/:courseId/grades"
              exact
              render={(props) => <AppBarCourseNav {...props} value={2} />}
            />
          </Switch>
          <AppBarAccount />
        </Toolbar>
      </AppBar>
    </div>
  );
}
