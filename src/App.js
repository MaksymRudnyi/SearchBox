import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path={'/'} component={Home}/>
          <Route render={() => <div>hello</div>}/>
        </Switch>
      </Router>
  );
}

export default App;
