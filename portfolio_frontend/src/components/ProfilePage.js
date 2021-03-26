import React, { Component } from 'react'
import { handleChange } from '../utils/inputs'

export class ProfilePage extends Component {
  constructor(props) {
    super(props)

    this.handleChange = handleChange.bind(this);

    this.state =  {
        bio: 'The Bio',
        oneLiner: 'Hasta la vista baby',
        handleChange
      }
  }


  componentDidMount() {
    console.log('this', this);

  }
  render() {
    const { bio, oneLiner} = this.state;
    return (
      <div className="ProfilePage">
        Profile Page
        <div>
          <label htmlFor="bio">Bio</label>
          <input type="text" name="bio" value={bio} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="oneLiner">One Liner</label>
          <input type="text" name="oneLiner" value={oneLiner} onChange={this.handleChange}/>
        </div>
      </div>
    )
  }
}

export default ProfilePage
