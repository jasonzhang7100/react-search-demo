import React from 'react'
import axios from 'axios'
import Pubsub from 'pubsub-js'

class UserList extends React.Component {
  state = {
    users: [],
    error: '',
    firstView: true,
    loadingView: false
  }

  componentDidMount() {
    Pubsub.subscribe(
      'search',
      (msg, searchName) => {
        const url = `https://api.github.com/search/users?q=${searchName}`
        this.setState({
          firstView: false,
          loadingView: true
        })
        axios.get(url)
          .then(response => {
            // console.log(response)
            const users = response.data.items.map(
              item => {
                return {
                  name: item.login,
                  url: item.html_url,
                  avatarUrl: item.avatar_url
                }
              }
            )
            this.setState({
              loadingView: false,
              users: users
            })
          })
          .catch(error => {
            // console.log(error.message)
            this.setState({
              loadingView: false,
              error: error.message
            })
          })
      }
    )
  }

  render() {
    const { firstView, loadingView, users, error } = this.state
    if (firstView) {
      return <h3>Enter name to search</h3>
    } else if (loadingView) {
      return <h3>Loading...</h3>
    } else if (error) {
      return <h3>error</h3>
    } else {
      return (
        <div>
          {
            users.map(
              user => (
                <div key={user.url}>
                  <a href={user.url} rel="noopener noreferrer" target="_blank">
                    <img src={user.avatarUrl} style={{ width: '100px' }} alt="user" />
                  </a>
                  <p>{user.name}</p>
                </div>
              )
            )
          }
        </div>
      )
    }
  }
}

export default UserList