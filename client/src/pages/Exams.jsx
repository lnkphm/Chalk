import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import ExamList from '../components/Exams/ExamList';
import ExamOverview from '../components/Exams/ExamOverview';
import ExamPaper from '../components/Exams/ExamPaper';
import ExamResult from '../components/Exams/ExamResult';
import ExamReview from '../components/Exams/ExamReview';
import EditExam from '../components/Exams/EditExam';
import ExamQuestions from '../components/Exams/ExamQuestions';

export default function Exam(props) {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={ExamList} />
      <Route exact path={`${path}/:examId`} component={ExamOverview} />
      <Route exact path={`${path}/:examId/edit`} component={EditExam} />
      <Route exact path={`${path}/:examId/questions`} component={ExamQuestions} />
      <Route exact path={`${path}/:examId/paper`} component={ExamPaper} />
      <Route exact path={`${path}/:examId/result`} component={ExamResult} />
      <Route exact path={`${path}/:examId/review`} component={ExamReview} />
    </Switch>
  );
}
