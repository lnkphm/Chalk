import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

function ProtectedRoute({ children, ...rest }) {
  return (
    <UserContext.Consumer>
      {({ isLoading, isAuthenticated, user }) => (
        <Route
          {...rest}
          render={({ location }) =>
            isLoading ? (
              <div />
            ) : isAuthenticated ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: location },
                }}
              />
            )
          }
        />
      )}
    </UserContext.Consumer>
  );
}

export default ProtectedRoute;
