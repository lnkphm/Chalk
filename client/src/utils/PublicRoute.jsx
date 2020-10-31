import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import UserProvider from '../contexts/UserProvider';
import UserContext from '../contexts/UserContext';

function PublicRoute({ children, ...rest }) {
  // const user = React.useContext(UserProvider.context);
  // return (
  //   <Route
  //     {...rest}
  //     render={({ location }) =>
  //       user.isLoading ? (
  //         <div />
  //       ) : user.isAuthenticated ? (        
  //         <Redirect
  //           to={{
  //             pathname: '/home',
  //             state: { from: location },
  //           }}
  //         />
  //       ) : (
  //         children
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