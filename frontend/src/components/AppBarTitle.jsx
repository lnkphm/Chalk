import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function AppBarTitle(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h6">{props.text}</Typography>
    </div>
  );
}
