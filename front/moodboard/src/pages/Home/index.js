import React, { Component } from 'react';
import SearchFieldComponent from '../../components/SearchField';
import Collage from '../../components/Collage';

class Home extends Component {
  render() {
    return (
      <div>
        <SearchFieldComponent />
        <Collage />
      </div>
    )
  }
}

export default Home;