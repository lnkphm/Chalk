import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import AddUserDialog from './AddUserDialog';
import RemoveUserDialog from './RemoveUserDialog';
import DefaultAvatar from '../../assets/images/avatar.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  card: {
    marginTop: theme.spacing(2),
  },
}));

export default function CourseUsers() {
  const classes = useStyles();
  const { courseId } = useParams();
  const [users, setUsers] = React.useState([]);

  const fetchData = () => {
    axios
      .get(`/api/courses/${courseId}`)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addUserCallback = () => {
    fetchData();
  };

  const removeUserCallback = () => {
    fetchData();
  };

  const UserListItem = (user, index, role) => {
    if (user.role !== role) return;
    return (
      <ListItem key={index}>
        <ListItemAvatar>
          <Avatar src={user.avatar ? user.avatar : DefaultAvatar} />
        </ListItemAvatar>
        <ListItemText primary={user.name} />
        <ListItemSecondaryAction>
          <RemoveUserDialog user={user} callback={removeUserCallback} />
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  return (
    <Container className={classes.root} maxWidth="md">
      <AddUserDialog callback={addUserCallback} />
      {['Teacher', 'Student'].map((role, index) => (
        <Card className={classes.card} key={index}>
          <CardHeader title={role} />
          <Divider />
          <CardContent>
            <List>
              {users.map((item, index) =>
                UserListItem(item, index, role.toLocaleLowerCase())
              )}
            </List>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
