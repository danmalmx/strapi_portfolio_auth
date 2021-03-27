import React, { Component } from 'react'
import axios from 'axios';
import { handleChange } from '../utils/inputs'
import { API_URL } from '../utils/urls'

class ProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state =  {
      bio: 'The Bio',
      oneLiner: 'Hasta la vista baby',
      handleChange
    }

    this.handleChange = handleChange.bind(this);
  }

  componentDidMount() {
    console.log('this.props.user', this.props.user);
    const { bio, favorite_one_liner } = this.props.user.user;
    this.setState({bio, oneLiner: favorite_one_liner});

  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { bio, oneLiner } = this.state;

    const data = {
      bio,
      favorite_one_liner: oneLiner,
    }

    const userId = this.props.user.user.id;
    const jwtToken = this.props.user.jwt;

    const updateUserRes = await axios({
      method: 'PUT',
      url: `${API_URL}/users/${userId}`,
      data,
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })

    console.log('updateUserRes', updateUserRes);

  }

  render() {
    const { bio, oneLiner} = this.state;

    return (
      <div className="ProfilePage">
        Profile Page
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="bio">Bio</label>
            <input type="text" name="bio" id="bio" value={bio} onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="oneLiner">One Liner</label>
            <input type="text" name="oneLiner" id="oneLiner" value={oneLiner} onChange={this.handleChange}/>
          </div>
          <button type="submit">Update your profile</button>
        </form>
      </div>
    )
  }
}

export default ProfilePage
