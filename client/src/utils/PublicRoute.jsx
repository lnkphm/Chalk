import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

export default function PublicRoute({ children, ...rest }) {
  return (
    <UserContext.Consumer>
      {({ loading, auth, user }) => (
        <Route
          {...rest}
          render={({ location }) =>
            loading ? (
              <div />
            ) : auth ? (
              <Redirect
                to={{
                  pathname: '/home',
                  state: { from: location },
                }}
              />
            ) : (
              children
            )
          }
        />
      )}
    </UserContext.Consumer>
  );
}