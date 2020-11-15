import React from 'react';
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

import UserContext from '../contexts/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  reviewButton: {
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
  const [paper, setPaper] = React.useState(null);
  const [points, setPoints] = React.useState({
    exam: 0,
    paper: 0,
  });
  const userData = React.useContext(UserContext);

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
      .get(`/api/papers?user=${userData.user._id}&exam=${examId}`)
      .then((res) => {
        axios
          .get(`/api/papers/${res.data[0]._id}/details`)
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
  }, [userData.user._id, examId]);

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
                    <Typography>User: {paper.user.name}</Typography>
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
                  <Button
                    variant="outlined"
                    className={classes.reviewButton}
                    component={RouteLink}
                    to={`/exams/${examId}/review`}
                  >
                    Review
                  </Button>
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
