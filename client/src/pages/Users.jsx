import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

import UserList from '../components/UserList';
import CreateUser from '../components/CreateUser';
import EditUser from '../components/EditUser';
import UserContext from '../contexts/UserContext';

export default function Course(props) {
  const { path } = useRouteMatch();
  const userData = React.useContext(UserContext);
  return (
    <Switch>
      {userData.user.role === 'admin' ? (
        <Route>
          <Switch>
            <Route exact path={path} component={UserList} />
            <Route exact path={`${path}/create`} component={CreateUser} />
            <Route exact path={`${path}/:userId/edit`} component={EditUser} />
          </Switch>
        </Route>
      ) : (
        <Redirect to="/401" />
      )}
    </Switch>
  );
}
