import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

export default function RemoveUserDialog(props) {
  const { courseId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [dialog, setDialog] = React.useState(false);

  const handleClickOpen = () => {
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };

  const onClickRemove = () => {
    axios
      .delete(`/api/courses/${courseId}/users/${props.user._id}`)
      .then((res) => {
        props.callback();
        enqueueSnackbar('User removed!')
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <IconButton
        edge="end"
        onClick={() => {
          handleClickOpen();
        }}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={dialog}
        onClose={handleClose}
      >
        <DialogTitle>Remove {props.user.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="secondary" onClick={onClickRemove}>Remove</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
