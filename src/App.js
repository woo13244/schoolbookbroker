import React, { Component } from 'react';
import './App.css';
import {HashRouter, Route} from 'react-router-dom'
import Login from './components/Login/Login.js';
import Private from './components/Private/Private';
import Admin from './components/Admin/Admin.js';
import {Matched, UnMatched} from './components/Match/Match.js';
import Faq from './components/Faq/Faq.js';
import Contact from './components/Contact/Contact'
import Account from './components/Account/Account.js'
class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <div>
            <Route exact path='/' component={Login}/>
            <Route exact path='/private' component={Private}/>
            <Route path='/admin' component={Admin}/>
            <Route path='/private/matched' component={Matched}/>
            <Route path='/private/unmatched' component={UnMatched}/>
            <Route path='/private/faq' component={Faq}/>
            <Route path='/private/contact' component={Contact}/>
            <Route path='/private/account' component={Account}/>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
