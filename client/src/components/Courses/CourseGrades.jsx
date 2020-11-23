import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { DataGrid } from '@material-ui/data-grid';

import CheckRole from '../../utils/CheckRole';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  table: {
    width: '100%',
    height: 640,
  },
}));

function ExamSelect(props) {
  const classes = useStyles();
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/api/exams?course=${props.courseId}`);
      setExams(result.data);
    };
    fetchData();
  }, [props.courseId]);

  const handleChange = (event) => {
    setSelectedExam(event.target.value);
    props.callback(event.target.value);
  };

  return (
    <div>
      {exams ? (
        <FormControl
          variant="outlined"
          fullWidth
          className={classes.formControl}
        >
          <InputLabel id="exam-label">Exam</InputLabel>
          <Select
            labelId="exam-label"
            id="exam"
            value={selectedExam}
            onChange={handleChange}
            label="Exam"
          >
            <MenuItem value="" disabled>
              Choose an exam
            </MenuItem>
            {exams.map((item, index) => (
              <MenuItem key={index} value={item._id}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <div />
      )}
    </div>
  );
}

function GradeTable(props) {
  const classes = useStyles();

  const columns = [
    { field: 'id', headerName: '#', width: 50 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'points', headerName: 'Points', width: 150 },
    { field: 'grade', headerName: 'Grade / 10.00', width: 150 },
  ];

  const getExamPoints = (exam) => {
    let total = 0;
    exam.questions.forEach((item) => {
      total += item.points;
    });
    return total;
  };

  const getPaperPoints = (paper) => {
    let total = 0;
    paper.data.forEach((item) => {
      total += item.points;
    });
    return total;
  };

  const getPaperRows = (exam, papers, users) => {
    const examPoints = getExamPoints(exam);

    const rows = users.map((item, index) => {
      const paper = papers.find(paper => paper.user._id === item._id)
      const paperPoints = (paper) ? (getPaperPoints(paper)) : 0;
      return {
        id: index,
        username: item.username,
        name: item.name,
        points: `${paperPoints} / ${examPoints}`,
        grade: ((paperPoints / examPoints) * 10).toFixed(2),
      };
    })

    // const rows = papers.map((item, index) => {
    //   const paperPoints = getPaperPoints(item);
    //   return {
    //     id: index,
    //     username: item.user.username,
    //     name: item.user.name,
    //     points: `${paperPoints} / ${examPoints}`,
    //     grade: ((paperPoints / examPoints) * 10).toFixed(2),
    //   };
    // });

    return rows;
  };

  return (
    <div className={classes.table}>
      <DataGrid
        rows={getPaperRows(props.exam, props.papers, props.users)}
        columns={columns}
        pageSize={10}
      />
    </div>
  );
}

export default function CourseGrades(props) {
  const classes = useStyles();
  const { courseId } = useParams();
  const [exam, setExam] = useState(null);
  const [papers, setPapers] = useState(null);
  const [course, setCourse] = useState(null);

  const examSelectCallback = (examId) => {
    const getData = async () => {
      const exam = await axios.get(`/api/exams/${examId}/details`);
      setExam(exam.data);
      const papers = await axios.get(`/api/papers?exam=${examId}`);
      setPapers(papers.data);
      const course = await axios.get(`/api/courses/${courseId}`);
      setCourse(course.data);
    };
    getData();
  };

  return (
    <Container className={classes.root} maxWidth="md">
      <CheckRole role="student" not="true" />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ExamSelect courseId={courseId} callback={examSelectCallback} />
        </Grid>
        <Grid item xs={12}>
          {course && exam && papers ? (
            <GradeTable exam={exam} papers={papers} users={course.users} />
          ) : (
            <div />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
