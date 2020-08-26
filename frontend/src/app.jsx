import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import UserProvider from "./contexts/UserProvider";

import Home from "./components/Home";
import SignIn from "./components/SignIn.jsx";
import MenuBar from "./components/MenuBar";

function App() {
  return (
    <Router>
      <UserProvider>
        <Route path="/" component={MenuBar} />
        <Route path="/" exact component={Home} />
      </UserProvider>
      <Route path="/signin" component={SignIn} />
    </Router>
  );
}

export default App;
