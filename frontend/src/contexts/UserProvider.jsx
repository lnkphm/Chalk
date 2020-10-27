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

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.context = UserContext;

export default UserProvider;