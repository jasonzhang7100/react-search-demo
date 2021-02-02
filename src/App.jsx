import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import Search from './components/search/search'
import UserList from './components/user-list/user-list'

class App extends Component {
  render() {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper><Search /></Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper><UserList /></Paper>
          </Grid>
        </Grid>
      </>
    )
  }
}

export default App