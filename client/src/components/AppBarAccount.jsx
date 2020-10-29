import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

import UserProvider from '../contexts/UserProvider';
import _ from 'lodash';

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
  const [redirect, setRedirect] = React.useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    axios.get('/api/auth/logout')
    .then(() => {
      setRedirect(true);
    });
  };
  const user = React.useContext(UserProvider.context);
  if (redirect) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className={classes.root}>
        <IconButton edge="end" color="inherit" onClick={handleClick}>
          {_.isEmpty(user.data.avatar) ? (
            <AccountCircle />
          ) : (
            <Avatar className={classes.avatar} src={user.data.avatar} />
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
            Profile
          </MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}
