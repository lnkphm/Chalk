import React, { useContext, useState } from 'react';
import { useParams, Link as RouteLink } from 'react-router-dom';
import axios from 'axios';
import { DateTime } from 'luxon';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import UserContext from '../../contexts/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  actionButtons: {
    '& > *': {
      marginLeft: theme.spacing(1),
    },
    marginLeft: 'auto',
  },
  result: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 400,
  },
}));

export default function ExamResult(props) {
  const classes = useStyles();
  const { examId } = useParams();
  const [paper, setPaper] = useState(null);
  const [points, setPoints] = useState({
    exam: 0,
    paper: 0,
  });
  const { user } = useContext(UserContext);

  const calcPaper = (paper) => {
    let paperPoints = 0;
    let examPoints = 0;
    paper.data.forEach((item, index) => {
      examPoints += item.question.points;
      paperPoints += item.points;
    });
    return { paper: paperPoints, exam: examPoints };
  };

  React.useEffect(() => {
    axios
      .get(`/api/papers?user=${user._id}&exam=${examId}`)
      .then((res) => {
        axios
          .get(`/api/papers/${res.data[0]._id}`)
          .then((res) => {
            console.log(res.data);
            setPaper(res.data);
            setPoints(calcPaper(res.data));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container className={classes.root} maxWidth="md">
      {paper ? (
        <div>
          <Typography className={classes.title} variant="h4">
            Exam result
          </Typography>
          <Divider />
          <Grid container className={classes.result}>
            <Grid item xs={false} sm={1} md={2}></Grid>
            <Grid item xs={12} sm={10} md={8}>
              <Card>
                <CardHeader title={paper.exam.title} />
                <Divider />
                <CardContent>
                  <div className={classes.examGrade}>
                    <Typography>User: {user.name}</Typography>
                    <Typography>
                      Submitted:{' '}
                      {DateTime.fromISO(paper.updatedAt).toLocaleString(
                        DateTime.DATETIME_MED
                      )}
                    </Typography>
                    <Typography>
                      Points: {`${points.paper} / ${points.exam}`}
                    </Typography>
                    <Typography>
                      Grade:{' '}
                      {((points.paper / points.exam) * 10).toFixed(2) +
                        ' / 10.00'}
                    </Typography>
                  </div>
                </CardContent>
                <Divider />
                <CardActions>
                  <div className={classes.actionButtons}>
                    <Button
                      variant="outlined"
                      component={RouteLink}
                      to={`/courses/${paper.exam.course}`}
                    >
                      Back to course
                    </Button>
                    <Button
                      variant="outlined"
                      component={RouteLink}
                      to={`/exams/${examId}/review`}
                    >
                      Review
                    </Button>
                  </div>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={false} sm={1} md={2}></Grid>
          </Grid>
        </div>
      ) : (
        <div />
      )}
    </Container>
  );
}
