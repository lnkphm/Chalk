import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserProvider from '../contexts/UserProvider';

export default function ProtectedRoute({ children, ...rest }) {
  const data = React.useContext(UserProvider.context);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        data.isLoading ? (
          <div />
        ) : data.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
