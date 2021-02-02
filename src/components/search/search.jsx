import React from 'react'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import Pubsub from 'pubsub-js'

import './search.scss'

class Search extends React.Component {
  handleClick = () => {
    const searchName = this.searchName.value.trim()
    if (searchName) {
      Pubsub.publish('search', searchName)
    }
  }

  render() {
    return (
      <>
        <Input placeholder="Input name to search" className="input-area" inputRef={input => this.searchName = input} />
        <Button variant="contained" color="primary" onClick={this.handleClick}>
          Search
        </Button>
      </>
    )
  }
}

export default Search