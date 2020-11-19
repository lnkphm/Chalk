import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import AddIcon from '@material-ui/icons/Add';

function SearchUser({ callback }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {
    axios.get(`/api/users`)
    .then((res) => {
      setOptions(res.data)
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <Autocomplete
      id="search-user"
      multiple
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        callback(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Users"
          variant="outlined"
        />
      )}
    />
  );
}

export default function AddUserDialog(props) {
  const [dialog, setDialog] = React.useState(false);
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const { courseId } = useParams();
  const handleClickOpen = () => {
    setDialog(true);
    setSelectedUsers([]);
  };

  const handleClose = () => {
    setDialog(false);
  };

  const callback = (value) => {
    setSelectedUsers(value);
  };

  const onClickSubmit = () => {
    const data = { users: [] };
    selectedUsers.forEach((item, index) => {
      data.users.push(item._id);
    });
    axios
      .post(`/api/courses/${courseId}/users`, data)
      .then((res) => {
        props.callback();
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Add Users
      </Button>
      <Dialog maxWidth="sm" fullWidth open={dialog} onClose={handleClose}>
        <DialogTitle>Add user</DialogTitle>
        <DialogContent>
          <SearchUser callback={callback} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onClickSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}