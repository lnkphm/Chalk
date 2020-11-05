import React from 'react';
import { Link as RouteLink, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import { DateTime } from 'luxon';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';

import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  toolbar: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  table: {
    marginTop: theme.spacing(2),
    width: '100%',
    height: 640,
  },
  paper: {
    padding: theme.spacing(2),
  },
  formControl: {
    minWidth: 200,
  },
}));

function EditButton(props) {
  const { url, path } = useRouteMatch();
  return (
    <IconButton component={RouteLink} to={`${path}/${props.user}/edit`}>
      <EditIcon />
    </IconButton>
  );
}

export default function User(props) {
  const classes = useStyles();
  const [users, setUsers] = React.useState([]);
  const [role, setRole] = React.useState('all');
  const { url, path } = useRouteMatch();

  const onChangeRole = (event) => {
    setRole(event.target.value);
  };

  const columns = [
    { field: 'id', headerName: '#', width: 50 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 150 },
    {
      field: 'action',
      headerName: 'Actions',
      renderCell: (params) => <EditButton user={params.value} />,
    },
  ];

  React.useEffect(() => {
    axios
      .get(`/api/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getUserRows = (users, role) => {
    const rows = [];
    users.forEach((item, index, array) => {
      if (role == 'all' || item.role == role) {
        rows.push({
          id: index,
          username: item.username,
          name: item.name,
          email: item.email,
          role: item.role,
          action: item._id,
        });
      }
    });
    return rows;
  };

  return (
    <Container className={classes.root} maxWidth="md">
      <Typography className={classes.title} variant="h4">
        Users
      </Typography>
      <Grid className={classes.toolbar} container>
        <Grid item xs>
          <ButtonGroup>
            <Button>Import</Button>
            <Button>Export</Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            component={RouteLink}
            to={`${path}/create`}
          >
            Create new user
          </Button>
        </Grid>
      </Grid>
      <Paper className={classes.paper} variant="outlined">
        <Grid container>
          <Grid item xs>
            <TextField id="search" label="Search" variant="outlined" />
          </Grid>
          <Grid item>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                value={role}
                onChange={onChangeRole}
                labelId="role-label"
                id="role"
                label="Role"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <div className={classes.table}>
          <DataGrid
            rows={getUserRows(users, role)}
            columns={columns}
            pageSize={10}
            checkboxSelection
          />
        </div>
      </Paper>
    </Container>
  );
}
