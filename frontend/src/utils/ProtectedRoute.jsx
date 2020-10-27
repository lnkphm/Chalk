import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserProvider from '../contexts/UserProvider';

export default function ProtectedRoute({ children, ...rest }) {
  const userData = React.useContext(UserProvider.context);
  console.log(userData)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userData.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to='/login'
          />
        )
      }
    />
  );
}
