import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  listItem: {
    width: 240,
  },
  title: {
    flexGrow: 1,
  },
});

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawer: false,
      menu: null,
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  toggleDrawer() {
    this.setState({
      drawer: !this.state.drawer,
    });
  }

  toggleMenu = (event) => {
    this.setState({
      menu: event.currentTarget,
    });
  };

  handleClose() {
    this.setState({
      drawer: false,
      menu: null,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <ClickAwayListener onClickAway={this.handleClose}>
        <div className={classes.root}>
          <AppBar>
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                edge="start"
                color="inherit"
                onClick={this.toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Chalk
              </Typography>
              <div>
                <IconButton color="inherit" onClick={this.toggleMenu}>
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={this.state.menu}
                  keepMounted
                  open={Boolean(this.state.menu)}
                  onClose={this.handleClose}
                >
                  <MenuItem component="a" href="/profile">Profile</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer variant="persistent" open={this.state.drawer}>
            <List>
              <ListItem
                button
                component="a"
                href="/home"
                className={classes.listItem}
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem
                button
                component="a"
                href="/courses"
                className={classes.listItem}
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Courses" />
              </ListItem>
              <ListItem
                button
                component="a"
                href="/user"
                className={classes.listItem}
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="User" />
              </ListItem>
            </List>
          </Drawer>
        </div>
      </ClickAwayListener>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NavBar);
