import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  description: {
    marginTop: theme.spacing(1),
  },
}));

export default function CourseOverview(props) {
  const classes = useStyles();
  const { courseId } = useParams();
  const [course, setCourse] = React.useState([]);

  React.useEffect(() => {
    axios.get(`/api/courses/${courseId}`).then((res) => {
      setCourse(res.data);
    });
  }, [courseId]);

  return (
    <Container className={classes.root} maxWidth="md">
      <Typography variant="h4" className={classes.title}>
        {course.name}
      </Typography>
      <Divider />
      <Typography className={classes.description}>
        {course.description}
      </Typography>
    </Container>
  );
}
