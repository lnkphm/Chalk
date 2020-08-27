import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Route path="/home" component={Home} />
    </Router>
  );
}

export default App;
