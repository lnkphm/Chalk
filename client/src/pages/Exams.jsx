import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import ExamList from '../components/ExamList';
import ExamOverview from '../components/ExamOverview';
import ExamPaper from '../components/ExamPaper';
import ExamResult from '../components/ExamResult';
import ExamReview from '../components/ExamReview';
import EditExam from '../components/EditExam';

export default function Exam(props) {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={ExamList} />
      <Route exact path={`${path}/:examId`} component={ExamOverview} />
      <Route exact path={`${path}/:examId/edit`} component={EditExam} />
      <Route exact path={`${path}/:examId/paper`} component={ExamPaper} />
      <Route exact path={`${path}/:examId/result`} component={ExamResult} />
      <Route exact path={`${path}/:examId/review`} component={ExamReview} />
    </Switch>
  );
}
