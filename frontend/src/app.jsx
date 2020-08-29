import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from "./components/Home";
import SignIn from "./components/SignIn";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/register" component={Register} />
    </Router>
  );
}

export default App;
