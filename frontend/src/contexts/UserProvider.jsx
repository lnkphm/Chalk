import React from 'react';
import axios from 'axios';

const UserContext = React.createContext(null);
const API_URL = '/api/auth';

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(API_URL);
      setUser(result.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const value = {
    isAuthenticated: Boolean(user),
    isLoading: loading,
    data: user,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.context = UserContext;

export default UserProvider;
