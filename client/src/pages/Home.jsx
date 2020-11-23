import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouteLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import UserContext from '../contexts/UserContext';
import Typography from '@material-ui/core/Typography';

import Calendar from 'react-calendar';
import '../assets/css/Calendar.css';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: 'center',
  },
}));

function CourseItem(props) {
  const [exams, setExams] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      axios.get(`/api/exams?course=${props.course._id}`).then((res) => {
        setExams(res.data);
      });
    }
    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader
        title={
          <Link component={RouteLink} to={`/courses/${props.course._id}`}>
            {props.course.name}
          </Link>
        }
      />
      <Divider />
      <CardContent>
        <Typography>Current exams</Typography>
        <ul>
          {exams.map((item, index) => {
            const current = new Date();
            const examOpen = new Date(item.dateOpen);
            const examClose = new Date(item.dateClose);
            if (
              current.getTime() > examOpen.getTime() &&
              current.getTime() < examClose.getTime()
            ) {
              return (
                <li key={index}>
                  <Link
                    component={RouteLink}
                    color="inherit"
                    to={`/exams/${item._id}`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            } else {
              return
            }
          })}
        </ul>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const { user } = React.useContext(UserContext);
  const [date, setDate] = React.useState(new Date());
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <Grid container spacing={2}>
            {user.courses.length > 0 ? (
              user.courses.map((item, index) => (
                <Grid key={index} item xs={12}>
                  <CourseItem course={item} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography>There is no course.</Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Calendar" />
                <Divider />
                <CardContent>
                  <Calendar value={date} onChange={setDate} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
