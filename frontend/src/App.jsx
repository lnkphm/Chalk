import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from '@material-ui/core/Container';

import Home from "./components/Home";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import AppBar from "./components/AppBar";

function App() {
  return (
    <Container>
      <Router>
        <AppBar />
        <Route path="/" exact component={ Home } />
      </Router>
    </Container>
  );
}

export default App;
