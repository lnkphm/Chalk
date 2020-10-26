import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function AppBarTitle(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h6">
        <Link href='/home' color='inherit'>
          {props.text}
        </Link>
      </Typography>
    </div>
  );
}
