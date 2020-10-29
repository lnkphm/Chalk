import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  listItem: {
    width: 240,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function AppBarDrawer(props) {
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
          component="a"
          href={item.url}
          className={classes.listItem}
          key={index}
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
