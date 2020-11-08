import React from 'react';
import {
  useParams,
  Link as RouteLink,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';
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
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
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
  const { url } = useRouteMatch();
  const { courseId } = useParams();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [linkDialog, setLinkDialog] = React.useState(false);
  const [deleteDialog, setDeleteDialog] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openLinkDialog = () => {
    setLinkDialog(true);
    handleClose();
  };

  const closeLinkDialog = () => {
    setLinkDialog(false);
  };

  const openDeleteDialog = () => {
    setDeleteDialog(true);
    handleClose();
  };

  const closeDeleteDialog = () => {
    setDeleteDialog(false);
  };

  const deleteCourse = () => {
    axios
      .delete(`/api/courses/${courseId}`)
      .then((res) => {
        history.push('/courses');
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        <MenuItem onClick={openLinkDialog}>Copy link</MenuItem>
        <MenuItem
          component={RouteLink}
          to={`${url}/edit`}
          onClick={handleClose}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={openDeleteDialog}>Delete</MenuItem>
      </Menu>
      <Dialog
        open={linkDialog}
        onClose={closeLinkDialog}
        fullWidth={true}
        maxWidth="sm"
      >
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
          <Button onClick={closeLinkDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteDialog}
        onClose={closeDeleteDialog}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Delete Course</DialogTitle>
        <DialogContent>Are you sure?</DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteCourse} color="primary">
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
        <CardHeader title={course.name} action={<SettingMenu />} />
        <Divider />
        <CardContent>
          <Typography>{course.description}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
