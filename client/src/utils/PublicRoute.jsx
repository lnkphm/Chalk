import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserProvider from '../contexts/UserProvider';

export default function PublicRoute({ children, ...rest }) {
  const user = React.useContext(UserProvider.context);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.isLoading ? (
          <div />
        ) : user.isAuthenticated ? (        
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
  );
}
