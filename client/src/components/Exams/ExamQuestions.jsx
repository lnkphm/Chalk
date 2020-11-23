import React from 'react';
import { Link as RouteLink, useParams, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { DataGrid } from '@material-ui/data-grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import CreateQuestionDialog from './CreateQuestionDialog';
import DeleteQuestionDialog from './DeleteQuestionDialog';

import CheckRole from '../../utils/CheckRole';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  toolbar: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
  },
  table: {
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

function getQuestionRows(questions) {
  return questions.map((item, index) => ({
    id: index,
    text: item.text,
    points: item.points,
    action: item._id,
  }));
}

export default function QuestionList() {
  const classes = useStyles();
  const [state, setState] = React.useState(null);
  const { examId } = useParams();
  const { url } = useRouteMatch();

  const ActionButtons = (props) => {
    return (
      <div>
        <Grid container>
          <Grid item xs={6}>
            <IconButton
              component={RouteLink}
              to={`${url}/${props.questionId}/edit`}
            >
              <EditIcon />
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            <DeleteQuestionDialog
              callback={callbackDeleteQuestion}
              id={props.questionId}
            />
          </Grid>
        </Grid>
      </div>
    );
  };

  const columns = [
    { field: 'id', headerName: '#', width: 50 },
    { field: 'text', headerName: 'Question', width: 500 },
    { field: 'points', headerName: 'Points', width: 100 },
    {
      field: 'action',
      headerName: 'Actions',
      renderCell: (params) => <ActionButtons questionId={params.value} />,
    },
  ];

  const fetchData = () => {
    axios
      .get(`/api/exams/${examId}/details`)
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const callbackCreateQuestion = () => {
    fetchData();
  };

  const callbackDeleteQuestion = () => {
    fetchData();
  };

  if (!state) {
    return <CheckRole role="student" not={true} />;
  }

  return (
    <Container className={classes.root} maxWidth="md">
      <Typography className={classes.title} variant="h4">
        Questions
      </Typography>
      <div className={classes.toolbar}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          component={RouteLink}
          to={`/exams/${examId}`}
        >
          Back to exam
        </Button>
        <CreateQuestionDialog callback={callbackCreateQuestion} />
      </div>
      <Paper className={classes.paper} variant="outlined">
        <div className={classes.table}>
          <DataGrid
            rows={getQuestionRows(state.questions)}
            columns={columns}
            pageSize={10}
          />
        </div>
      </Paper>
    </Container>
  );
}
