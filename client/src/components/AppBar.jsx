import React from 'react';
import { Route, Switch, Link as RouteLink, useParams } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Divider from '@material-ui/core/Divider';
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
import Collapse from '@material-ui/core/Collapse';

import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import FolderIcon from '@material-ui/icons/Folder';
import ClassIcon from '@material-ui/icons/Class';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CategoryIcon from '@material-ui/icons/Category';
import LabelIcon from '@material-ui/icons/Label';

import UserContext from '../contexts/UserContext';

import DefaultAvatar from '../assets/images/avatar.jpg';

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
  avatar: {

  },
  listItem: {
    width: 240,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function DrawerList(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const {user} = React.useContext(UserContext);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <List>
        <ListItem
          button
          component={RouteLink}
          to="/home"
          className={classes.listItem}
          onClick={props.handleClose}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          button
          component={RouteLink}
          to="/courses"
          className={classes.listItem}
          onClick={props.handleClose}
        >
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItem>
        {user.courses.map((item, index) => (
          <ListItem
            button
            key={index}
            component={RouteLink}
            to={`/courses/${item._id}`}
            className={classes.nested}
            onClick={props.handleClose}
          >
            <ListItemIcon>
              <ClassIcon />
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {user.role === 'admin' ? (
        <List>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="System" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={RouteLink}
                to="/users"
                className={classes.nested}
                onClick={props.handleClose}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
              {/* <ListItem
                button
                component={RouteLink}
                to="/categories"
                className={classes.nested}
                onClick={props.handleClose}
              >
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Categories" />
              </ListItem>
              <ListItem
                button
                component={RouteLink}
                to="/tags"
                className={classes.nested}
                onClick={props.handleClose}
              >
                <ListItemIcon>
                  <LabelIcon />
                </ListItemIcon>
                <ListItemText primary="Tags" />
              </ListItem> */}
            </List>
          </Collapse>
        </List>
      ) : (
        <div />
      )}
    </div>
  );
}

function AppBarDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          {<DrawerList handleClose={handleClose} />}
        </Drawer>
      </div>
    </ClickAwayListener>
  );
}

function CourseNav(props) {
  const classes = useStyles();
  const { courseId } = useParams();
  const {user} = React.useContext(UserContext);

  if (user.role !== "student") {
    return (
      <div className={classes.nav}>
        <Tabs value={props.value} indicatorColor="primary">
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
  
  } else {
    return (
      <div className={classes.nav}>
        <Tabs value={props.value} indicatorColor="primary">
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
        </Tabs>
      </div>
    );
  
  }
}

function CourseNavRoutes() {
  return (
    <Switch>
      <Route
        path="/courses/create"
        exact
        render={() => <div />}
      />
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
          <Avatar className={classes.avatar} src={DefaultAvatar} />
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
      <AppBar color="default">
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
