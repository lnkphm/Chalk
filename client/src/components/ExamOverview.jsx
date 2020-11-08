import React from 'react';
import {
  useRouteMatch,
  useParams,
  Link as RouteLink,
  useHistory,
} from 'react-router-dom';
import axios from 'axios';
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
        <MenuItem component={RouteLink} to={`${url}/edit`}>Edit</MenuItem>
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
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteExam} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function ExamOverview(props) {
  const classes = useStyles();
  const [exam, setExam] = React.useState({});
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

  return (
    <Container className={classes.root} maxWidth="md">
      <Card>
        <CardHeader
          title={exam.title}
          action={<SettingMenu courseId={exam.course} />}
        />
        <Divider />
        <CardContent>
          <Typography>Description: {exam.description}</Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            className={classes.buttonStart}
            variant="outlined"
            color="primary"
            component={RouteLink}
            to={`${url}/paper`}
          >
            Start
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}
