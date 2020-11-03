import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

function PublicRoute({ children, ...rest }) {
  return (
    <UserContext.Consumer>
      {({ isLoading, isAuthenticated, user }) => (
        <Route
          {...rest}
          render={({ location }) =>
            isLoading ? (
              <div />
            ) : isAuthenticated ? (
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

export default PublicRoute;