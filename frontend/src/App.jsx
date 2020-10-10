import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AppBar from './components/AppBar';

import NotFound from './components/NotFound';

function App() {
  return (
    <Container>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route>
            <AppBar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route component={NotFound} />
            </Switch>
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
