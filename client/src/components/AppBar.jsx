import React from 'react';
import { Route, Switch, Link as RouteLink, useParams } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';

import UserContext from '../contexts/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  nav: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  avatar: {},
  listItem: {
    width: 240,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function AppBarDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const items = [
    {
      text: 'Home',
      url: '/home',
    },
    {
      text: 'Courses',
      url: '/courses',
    },
    {
      text: 'Users',
      url: '/users',
    },
  ];

  const list = (
    <List>
      {items.map((item, index) => (
        <ListItem
          button
          component={RouteLink}
          to={item.url}
          className={classes.listItem}
          key={index}
          onClick={handleClose}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <IconButton
          className={classes.menuButton}
          edge="start"
          color="inherit"
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          variant="persistent"
          open={open}
          onClose={handleClose}
        >
          {list}
        </Drawer>
      </div>
    </ClickAwayListener>
  );
}

function CourseNav(props) {
  const classes = useStyles();
  const { courseId } = useParams();

  return (
    <div className={classes.nav}>
      <Tabs value={props.value}>
        <Tab
          component={RouteLink}
          to={`/courses/${courseId}`}
          label="Overview"
        />
        <Tab
          component={RouteLink}
          to={`/courses/${courseId}/exams`}
          label="Exams"
        />
        <Tab
          component={RouteLink}
          to={`/courses/${courseId}/users`}
          label="Users"
        />
        <Tab
          component={RouteLink}
          to={`/courses/${courseId}/grades`}
          label="Grades"
        />
      </Tabs>
    </div>
  );
}

function CourseNavRoutes() {
  return (
    <Switch>
      <Route
        path="/courses/:courseId"
        exact
        render={(props) => <CourseNav {...props} value={0} />}
      />
      <Route
        path="/courses/:courseId/exams"
        exact
        render={(props) => <CourseNav {...props} value={1} />}
      />
      <Route
        path="/courses/:courseId/users"
        exact
        render={(props) => <CourseNav {...props} value={2} />}
      />
      <Route
        path="/courses/:courseId/grades"
        exact
        render={(props) => <CourseNav {...props} value={3} />}
      />
    </Switch>
  );
}

function Title() {
  const classes = useStyles();
  return (
    <div className={classes.title}>
      <Typography variant="h6">
        <Link component={RouteLink} to="/home" color="inherit">
          Chalk
        </Link>
      </Typography>
    </div>
  );
}

function Account() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    axios.get('/api/auth/logout').then(() => {
      window.location = '/';
    });
  };
  const data = React.useContext(UserContext);
  return (
    <div>
      <IconButton edge="end" color="inherit" onClick={handleClick}>
        {_.isEmpty(data.user.avatar) ? (
          <AccountCircleIcon />
        ) : (
          <Avatar className={classes.avatar} src={data.user.avatar} />
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClick={handleClose}
      >
        <MenuItem component={RouteLink} to="/profile">
          Profile
        </MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <AppBarDrawer />
          <Title />
          <CourseNavRoutes />
          <Account />
        </Toolbar>
      </AppBar>
    </div>
  );
}
