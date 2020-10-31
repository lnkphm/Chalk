import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import UserProvider from '../contexts/UserProvider';
import UserContext from '../contexts/UserContext';

function ProtectedRoute({ children, ...rest }) {
  // const user = React.useContext(UserProvider.context);
  // return (
  //   <Route
  //     {...rest}
  //     render={({ location }) =>
  //       user.isLoading ? (
  //         <div />
  //       ) : user.isAuthenticated ? (
  //         children
  //       ) : (
  //         <Redirect
  //           to={{
  //             pathname: '/',
  //             state: { from: location },
  //           }}
  //         />
  //       )
  //     }
  //   />
  // );
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
