import React from 'react';
import axios from 'axios';
import { Link as RouteLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  buttonSearch: {
    marginLeft: 'auto',
  },
}));

export default function CourseList(props) {
  const classes = useStyles();
  const [courses, setCourses] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`/api/courses`)
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container className={classes.root} maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Card>
            <CardHeader title="Courses" />
            <CardActions>
              <Button
                variant="outlined"
                color="primary"
                component={RouteLink}
                to={`/courses/create`}
              >
                Create new course
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardHeader title="Search" />
            <Divider />
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField label="Search" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Category" variant="outlined" fullWidth />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                className={classes.buttonSearch}
                color="primary"
                variant="outlined"
              >
                Search
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid container spacing={2}>
            {courses.map((item, index) => (
              <Grid key={index} item xs={12}>
                <Card>
                  <CardHeader
                    title={
                      <Link component={RouteLink} to={`/courses/${item._id}`}>
                        {item.name}
                      </Link>
                    }
                    action={
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    <Typography>{item.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
