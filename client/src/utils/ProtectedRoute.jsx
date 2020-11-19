import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

export default function ProtectedRoute({ children, ...rest }) {
  return (
    <UserContext.Consumer>
      {({ loading, auth, user }) => (
        <Route
          {...rest}
          render={({ location }) =>
            loading ? (
              <div />
            ) : auth ? (
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
