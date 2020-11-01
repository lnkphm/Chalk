import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

export default function Exam(props) {
  const {url, path} = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={} />
      <Route exact path={`${path}/exams`} component={} />
      <Route exact path={`${path}/users`} component={} />
      <Route exact path={`${path}/grades`} component={} />
    </Switch>
  );
}
