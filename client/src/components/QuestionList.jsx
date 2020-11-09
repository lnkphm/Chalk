import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { DataGrid } from '@material-ui/data-grid';

import CreateQuestionDialog from './CreateQuestionDialog';
import DeleteQuestionDialog from './DeleteQuestionDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  toolbar: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  table: {
    marginTop: theme.spacing(2),
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

function ActionButtons(props) {
  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <DeleteQuestionDialog id={props.questionId} />
        </Grid>
      </Grid>
    </div>
  );
}

function getQuestionRows(questions) {
  return questions.map((item, index) => ({
    id: index,
    text: item.text,
    points: item.points,
    action: item._id,
  }));
}

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

export default function UserList(props) {
  const classes = useStyles();
  const [state, setState] = React.useState(null);
  const { examId } = useParams();

  React.useEffect(() => {
    axios
      .get(`/api/exams/${examId}/details`)
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [examId]);

  return (
    <Container className={classes.root} maxWidth="md">
      <Typography className={classes.title} variant="h4">
        Question
      </Typography>
      <Grid className={classes.toolbar} container>
        <Grid item xs>
          <CreateQuestionDialog />
        </Grid>
        <Grid item>
          <ButtonGroup>
            <Button>Import</Button>
            <Button>Export</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Paper className={classes.paper} variant="outlined">
        <div className={classes.table}>
          {state ? (
            <DataGrid
              rows={getQuestionRows(state.questions)}
              columns={columns}
              pageSize={10}
            />
          ) : (
            <div />
          )}
        </div>
      </Paper>
    </Container>
  );
}
