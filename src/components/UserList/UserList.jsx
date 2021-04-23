import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pubsub from 'pubsub-js';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
}));

const UserList = () => {
  
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [firstView, setFirstView] = useState(true);
  const [loadingView, setLoadingView] = useState(false);

  useEffect(() => {
    Pubsub.subscribe(
      'search',
      (msg, searchName) => {
        const url = `https://api.github.com/search/users?q=${searchName}`;
        setFirstView(false);
        setLoadingView(true);
        axios.get(url)
          .then(response => {
            // console.log(response)
            setLoadingView(false);
            const users = response.data.items.map(
              item => ({
                name: item.login,
                url: item.html_url,
                avatarUrl: item.avatar_url
              })
            );
            setUsers(users);
          })
          .catch(error => {
            setLoadingView(false);
            setError(error.message);
          });
      }
    )
  }, []);

  if (firstView) {
    return <h3>No User Showes</h3>;
  } else if (loadingView) {
    return <h3>Loading...</h3>;
  } else if (error) {
    return <h3>Error: {error}</h3>;
  } else {
    return (
      <Grid container spacing={4}>
        {users.map(
          user => (
            <Grid item xs={6} sm={3} md={2} key={user.url}>
              <a href={user.url} rel="noopener noreferrer" target="_blank">
                <Paper className={classes.paper}>
                  <img src={user.avatarUrl} style={{ width: '100px' }} alt="user" />
                  <p>{user.name}</p>
                </Paper>
              </a>
            </Grid>
          )
        )}
      </Grid >
    );
  }
};

export default UserList;
