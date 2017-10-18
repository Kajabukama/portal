import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Portal from './components/Portal';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, BrowserRouter} from 'react-router-dom';

import Thankyou from './components/Thankyou/Thankyou';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup'
import Signin from './components/Signin/Signin'

ReactDOM.render(
   <BrowserRouter>
    <div>
      <Route path="/" exact component={ Home }/>
      <Route path="/thank-you" component={ Thankyou }/>
      <Route path="/signup" component={ Signup }/>
      <Route path="/signin" component={ Signin }/>
    </div>
  </BrowserRouter>, document.getElementById('root')
);
registerServiceWorker();
