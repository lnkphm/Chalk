import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import DefaultAvatar from '../assets/images/avatar.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  card: {
    marginTop: theme.spacing(2),
  },
}));

function SearchUser({ callback }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await axios.get(`/api/users`);
      const users = response.data;

      if (active) {
        setOptions(users);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

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
      loading={loading}
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
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default function CourseUsers() {
  const classes = useStyles();
  const { courseId } = useParams();
  const [dialog, setDialog] = React.useState(false);
  const [courseUsers, setCourseUsers] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const callback = (value) => {
    setSelected(value);
  };

  React.useState(() => {
    axios
      .get(`/api/courses/${courseId}/users`)
      .then((res) => {
        setCourseUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [courseId]);

  const handleClickOpen = () => {
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };

  const onClickSubmit = () => {
    const data = { users: [] };
    selected.forEach((item, index) => {
      data.users.push(item._id);
    });
    axios
      .put(`/api/courses/${courseId}/users`, data)
      .then(() => {
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className={classes.root} maxWidth="md">
      <ButtonGroup>
        <Button color="primary" onClick={handleClickOpen}>
          Add Users
        </Button>
        <Button color="secondary">Remove Users</Button>
      </ButtonGroup>

      <Card className={classes.card}>
        <CardHeader title="Teacher" />
        <Divider />
        <CardContent>
          <List>
            {courseUsers.map((item, index) =>
              item.role === 'teacher' ? (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar src={item.avatar ? item.avatar : DefaultAvatar} />
                  </ListItemAvatar>
                  <ListItemText primary={item.name} />
                </ListItem>
              ) : (
                ''
              )
            )}
          </List>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardHeader title="Student" />
        <Divider />
        <CardContent>
          <List>
            {courseUsers.map((item, index) =>
              item.role === 'student' ? (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar src={item.avatar ? item.avatar : DefaultAvatar} />
                  </ListItemAvatar>
                  <ListItemText primary={item.name} />
                </ListItem>
              ) : (
                ''
              )
            )}
          </List>
        </CardContent>
      </Card>
      <Dialog maxWidth="sm" fullWidth open={dialog} onClose={handleClose}>
        <DialogTitle>Add user</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <SearchUser callback={callback} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onClickSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
