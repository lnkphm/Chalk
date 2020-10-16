import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

import AppBarDrawer from './AppBarDrawer';
import AppBarAccount from './AppBarAccount';
import AppBarTitle from './AppBarTitle';

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
          <AppBarAccount />
        </Toolbar>
      </AppBar>
    </div>
  );
}
