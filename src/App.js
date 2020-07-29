import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import AllResults from "./pages/AllResults";

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path={'/'} component={Home}/>
          <Route path={'/search'} component={AllResults}/>
        </Switch>
      </Router>
  );
}

export default App;
