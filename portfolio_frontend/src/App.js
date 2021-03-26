import React, { Component } from 'react'
import './App.css';

import ResgisterOrLogin from './components/ResgisterOrLogin'
import ProfilePage from './components/ProfilePage'


class App extends Component {
  state = {
    user: null,
  }
  render () {
    const { user } = this.state;
    return (
      <div className="App">
        {! user &&
          <ResgisterOrLogin updateUser={(user) => this.setState({user})} />
        }
        {
          user &&
            <ProfilePage user={user} />
        }
      </div>
    );
  }
}

export default App;
