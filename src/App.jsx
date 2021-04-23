import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Search from './components/Search/Search';
import UserList from './components/UserList/UserList';
import './App.css';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper className={classes.paper}><Search /></Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}><UserList /></Paper>
      </Grid>
    </Grid>
  );
};

export default App;
