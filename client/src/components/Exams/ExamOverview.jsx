import React from 'react';
import {
  useRouteMatch,
  useParams,
  Link as RouteLink,
  useHistory,
  Redirect
} from 'react-router-dom';
import axios from 'axios';
import { DateTime } from 'luxon';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import UserContext from '../../contexts/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(3),
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  buttonStart: {
    marginLeft: 'auto',
  },
}));

function SettingMenu(props) {
  const { url } = useRouteMatch();
  const { examId } = useParams();
  const history = useHistory();
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
  };

  const handleCloseDialog = () => {
    setDialog(false);
  };

  const deleteExam = () => {
    axios
      .delete(`/api/exams/${examId}`)
      .then((res) => {
        history.push(`/courses/${props.courseId}`);
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
        <MenuItem component={RouteLink} to={`${url}/questions`}>
          Questions
        </MenuItem>
        <MenuItem component={RouteLink} to={`${url}/edit`}>
          Edit
        </MenuItem>
        <MenuItem onClick={handleClickDialog}>Delete</MenuItem>
      </Menu>
      <Dialog
        open={dialog}
        onClose={handleCloseDialog}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Delete Exam</DialogTitle>
        <DialogContent>
          <Typography>Are you sure?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={deleteExam} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function StartButton(props) {
  const classes = useStyles();
  const { url } = useRouteMatch();
  let currentDate = new Date();
  let openDate = new Date(props.exam.dateOpen);
  let closeDate = new Date(props.exam.dateClose);
  if (
    currentDate.getTime() < openDate.getTime() ||
    currentDate.getTime() > closeDate.getTime()
  ) {
    return (
      <Button
        className={classes.buttonStart}
        variant="contained"
        disabled
      >
        Start
      </Button>
    );
  } else {
    return (
      <Button
        className={classes.buttonStart}
        variant="contained"
        color="primary"
        component={RouteLink}
        to={`${url}/paper`}
      >
        Start
      </Button>
    );
  }

}

export default function ExamOverview(props) {
  const classes = useStyles();
  const { user } = React.useContext(UserContext);
  const [exam, setExam] = React.useState(null);
  const [submitted, setSummited] = React.useState(false);

  const { url } = useRouteMatch();
  const { examId } = useParams();

  React.useEffect(() => {
    axios
      .get(`/api/exams/${examId}`)
      .then((res) => {
        setExam(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [examId]);

  React.useEffect(() => {
    axios
      .get(`/api/papers?user=${user._id}&exam=${examId}`)
      .then((res) => {
        if (res.data.length !== 0) {
          setSummited(res.data[0].submitted);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!exam) {
    return <div />
  } else if (!user.courses.find(item => item._id === exam.course)) {
    return <Redirect to='/home' />
  }

  return (
    <Container className={classes.root} maxWidth="md">
      <Card>
        <CardHeader
          title={exam.title}
          action={
            user.role !== 'student' ? (
              <SettingMenu courseId={exam.course} />
            ) : (
              <div />
            )
          }
        />
        <Divider />
        <CardContent>
          <Typography>
            <strong>Open Date:</strong>{' '}
            {DateTime.fromISO(exam.dateOpen).toLocaleString(
              DateTime.DATETIME_MED
            )}
          </Typography>
          <Typography>
            <strong>Close Date:</strong>{' '}
            {DateTime.fromISO(exam.dateClose).toLocaleString(
              DateTime.DATETIME_MED
            )}
          </Typography>
          <Typography>
            <strong>Duration:</strong> {exam.duration} minutes
          </Typography>
          <Typography>
            <strong>Description:</strong>
            <br />
            {exam.description}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions>
          {submitted ? (
            <Button
              className={classes.buttonStart}
              variant="contained"
              color="primary"
              component={RouteLink}
              to={`${url}/result`}
            >
              Result
            </Button>
          ) : (
            <StartButton exam={exam} />
          )}
        </CardActions>
      </Card>
    </Container>
  );
}
