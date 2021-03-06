import React, { Component } from 'react'
import axios from 'axios'
import {handleChange} from '../utils/inputs'

class ResgisterOrLogin extends Component {
  constructor(props) {
    super(props)

    this.state =  {
      email: '',
      password: '',
      mode: 'login'
    }
    this.handleChange = handleChange.bind(this);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, mode } = this.state;

    const data = {
      email,
      password,
      username: email,
      identifier: email,
    }

    let url = '';
    if(mode === 'login') {
      url = '/api/auth/local'
    }

    if (mode === 'signup') {
      url = '/api/auth/local/register'
    }

    const useCreationRes = await axios({
      method: 'POST',
      url,
      data,
    })

    console.log('ResgisterOrLogin.handleSubmit useCreationRes', useCreationRes);

    if (this.props.updateUser && typeof this.props.updateUser === 'function') {
      this.props.updateUser(useCreationRes.data)
    }
  }

  render() {
    const { email, password, mode } = this.state;
    return (
      <div className="ResgisterOrLogin">
        <h1>{mode}</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={email} onChange={this.handleChange}/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={this.handleChange}/>
          </div>
          <button type="submit">{mode}</button>
        </form>
        {mode === 'login' &&
          <p className="toggle" onClick={() => this.setState({mode: 'signup'})}><button>Want to sign up instead</button></p>
        }
        {mode === 'signup' &&
          <p className="toggle" onClick={() => this.setState({mode: 'login'})}><button>Want to log in instead?</button></p>
        }
      </div>
    )
  }
}

export default ResgisterOrLogin
