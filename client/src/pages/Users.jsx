import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import UserList from '../components/UserList';
import CreateUser from '../components/CreateUser';
import EditUser from '../components/EditUser';

export default function Course(props) {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={UserList} />
      <Route exact path={`${path}/create`} component={CreateUser} />
      <Route exact path={`${path}/:userId/edit`} component={EditUser} />
    </Switch>
  );
}
