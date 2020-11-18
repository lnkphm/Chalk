import React from 'react';

const userContext = React.createContext({
  loading: true,
  auth: false,
  user: {},
});

export default userContext;