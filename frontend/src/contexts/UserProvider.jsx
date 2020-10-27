import React from 'react';
import axios from 'axios';

const UserContext = React.createContext(null);
const API_URL = '/api/auth';

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const value = {
    isAuthenticated: Boolean(user),
    user: user,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.context = UserContext;

export default UserProvider;
