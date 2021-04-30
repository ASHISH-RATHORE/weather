import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Details from './Components/Details';
import Home from './Home';

import './App.css'
function App() {
    return (
        <div >
            
          <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/Details/:id' exact component={Details}/>
            </Switch>
        </div>
    )
}

export default App;
