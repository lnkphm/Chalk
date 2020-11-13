import React from 'react';
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
    paddingTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: 'center',
  },
}));

export default function Home() {
  const data = React.useContext(UserContext);
  const courses = data.user.courses;
  const [date, setDate] = React.useState(new Date());
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Courses</Typography>
              <Divider />
            </Grid>
            {courses.length > 0 ? (
              courses.map((item, index) => (
                <Grid key={index} item xs={12}>
                  <Card>
                    <CardHeader
                      title={
                        <Link component={RouteLink} to={`/courses/${item._id}`}>
                          {item.name}
                        </Link>
                      }
                    />
                    <Divider />
                    <CardContent>
                      <Typography noWrap>{item.description}</Typography>
                    </CardContent>
                  </Card>
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
                <CardHeader title="Upcoming" />
                <Divider />
                <CardContent>
                  <Typography>There is no upcoming</Typography>
                </CardContent>
              </Card>
            </Grid>
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
