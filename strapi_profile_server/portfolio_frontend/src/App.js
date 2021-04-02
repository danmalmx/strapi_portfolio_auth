import React, { Component } from 'react'
import axios from 'axios';
import './App.css';

import ResgisterOrLogin from './components/ResgisterOrLogin'
import ProfilePage from './components/ProfilePage'


class App extends Component {
  state = {
    user: null,
  }

  async componentDidMount() {
    const userRes = await axios({
      method: 'GET',
      url: `/users/me`
    })
    if(userRes.data) {
      this.setState({user: {user: userRes.data}})
    }
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
