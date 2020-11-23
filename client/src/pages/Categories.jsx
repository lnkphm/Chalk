import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import CategoryList from '../components/Categories/CategoryList';

export default function Course(props) {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={CategoryList} />
    </Switch>
  );
}
