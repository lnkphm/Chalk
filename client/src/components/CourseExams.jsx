import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionAction from '@material-ui/core/AccordionActions';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  detail: {
    display: 'block',
  },
  action: {
    justifyContent: 'flex-start',
  },
}));

const data = [
  {
    name: 'Test 1',
    description: 'Description 1',
    courseId: '1',
    examId: '1',
  },
  {
    name: 'Test 2',
    description: 'Description 2',
    courseId: '1',
    examId: '2',
  },
  {
    name: 'Test 3',
    description: 'Description 3',
    courseId: '1',
    examId: '3',
  },
];

function ExamAccordion(props) {
  const classes = useStyles();
  const url = `/exams/${props.examId}`;
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{props.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{props.description}</Typography>
      </AccordionDetails>
      <Divider />
      <AccordionAction className={classes.action}>
        <Button component="a" href={url}>
          View Exam
        </Button>
      </AccordionAction>
    </Accordion>
  );
}

export default function CourseExams(props) {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.root}>
      <h1>Exams</h1>
      {data.map((item, index) => (
        <ExamAccordion
          name={item.name}
          description={item.description}
          courseId={item.courseId}
          examId={item.examId}
        />
      ))}
    </Container>
  );
}
