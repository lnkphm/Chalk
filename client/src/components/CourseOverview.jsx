import React from 'react';
import { useParams, Link as RouteLink, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { Card, CardHeader, IconButton, CardContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2)
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  description: {
    marginTop: theme.spacing(1),
  },
}));

function SettingMenu() {
  const {path, url} = useRouteMatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dialog, setDialog] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickDialog = () => {
    setDialog(true);
    handleClose();
  }

  const handleCloseDialog = () => {
    setDialog(false);
  }

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClickDialog}>Copy link</MenuItem>
        <MenuItem component={RouteLink} to={`${url}/edit`} onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
      <Dialog open={dialog} onClose={handleCloseDialog} fullWidth={true} maxWidth="sm">
        <DialogTitle>Copy Link</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="link"
            label="Link"
            value={`${window.location.host}${url}`}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function CourseOverview(props) {
  const classes = useStyles();
  const { courseId } = useParams();
  const [course, setCourse] = React.useState([]);

  React.useEffect(() => {
    axios.get(`/api/courses/${courseId}`).then((res) => {
      setCourse(res.data);
    });
  }, [courseId]);

  return (
    <Container className={classes.root} maxWidth="md">
      <Card>
        <CardHeader
          title={course.name}
          action={
            <SettingMenu />
          }
        />
        <Divider />
        <CardContent>
          <Typography>
            {course.description}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
