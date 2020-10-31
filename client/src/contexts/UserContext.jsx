import React from 'react';

const userContext = React.createContext({
  isLoading: true,
  isAuthenticated: false,
  user: {}
});

export default userContext;