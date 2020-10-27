import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

import UserProvider from '../contexts/UserProvider';
import _ from 'lodash';
import { ListItemIcon, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default function AppBarAccount(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const userData = React.useContext(UserProvider.context);
  return (
    <div className={classes.root}>
      <IconButton edge="end" color="inherit" onClick={handleClick}>
        {_.isEmpty(userData) ? (
          <AccountCircle />
        ) : (
          <Avatar className={classes.avatar} src={userData.avatar} />
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
      >
        <MenuItem component="a" href="/profile">
          <ListItemIcon>
            {_.isEmpty(userData) ? (
              <AccountCircle />
            ) : (
              <Avatar className={classes.avatar} src={userData.avatar} />
            )}
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </div>
  );
}
