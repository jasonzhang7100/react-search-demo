import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Pubsub from 'pubsub-js';

const Search = () => {

  const inputRef = React.useRef();

  const handleClick = () => {
    const searchName = inputRef.current.value.trim();
    if (searchName) {
      Pubsub.publish('search', searchName);
    }
  };

  return (
    <div className="search">
      <Input placeholder="Enter Name to Search" className="input-area" inputRef={inputRef} />
      <Button variant="contained" color="primary" onClick={handleClick}>Search</Button>
    </div>
  );
};

export default Search;
