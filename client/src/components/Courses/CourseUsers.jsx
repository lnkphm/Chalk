import React from 'react';
import axios from 'axios';
import { useParams, Redirect } from 'react-router-dom';
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
import UserContext from '../../contexts/UserContext';

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
  const { user } = React.useContext(UserContext);

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

  const UserListItem = (item, index, role) => {
    if (item.role !== role) return;
    return (
      <ListItem key={index}>
        <ListItemAvatar>
          <Avatar src={item.avatar ? item.avatar : DefaultAvatar} />
        </ListItemAvatar>
        <ListItemText primary={item.name} />
        {user.role !== 'student' ? (
          <ListItemSecondaryAction>
            <RemoveUserDialog user={item} callback={removeUserCallback} />
          </ListItemSecondaryAction>
        ) : (
          <div />
        )}
      </ListItem>
    );
  };

  if (!user.courses.find(item => item._id === courseId)) {
    return <Redirect to='/home' />
  }

  return (
    <Container className={classes.root} maxWidth="md">
      {user.role !== 'student' ? (
        <AddUserDialog callback={addUserCallback} />
      ) : (
        <div />
      )}
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
