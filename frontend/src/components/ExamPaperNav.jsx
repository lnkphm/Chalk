import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  card: {
  }
}))

export default function ExamPaperQuestionList(props) {
  const classes = useStyles();
  const url = `/courses/${props.course}/exams/${props.exam}/result`;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography>Exam Navigation</Typography>
        </CardContent>
        <CardActions>
          <Button variant="a" href={url}>Submit</Button>
        </CardActions>
      </Card>
    </div>
  )
}