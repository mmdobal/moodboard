import React, { Component } from 'react';
import SearchFieldComponent from '../../components/SearchField';
import Collage from '../../components/Collage';

import axios from 'axios';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      pictures: [],
      search: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(words) {
    this.setState({ search: words.value.toLowerCase() });
  };


  componentDidMount() {
    axios.get('http://192.168.15.53:8080/api/pictures/')
      .then((response) => {
        const pictures = response.data;
        this.setState({ pictures });
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state.search);
    
    let listFiltered = [];

    if (this.state.search !== null) {
      listFiltered = this.state.pictures.filter((item) => item.alt.toLowerCase().includes(this.state.search))
    } else {
      listFiltered = this.state.pictures;
    }

    return (
      <div>
        <SearchFieldComponent handleChangeSearch={this.handleChange} value={this.props.value} />
        <Collage pictures={listFiltered} />
      </div>
    )
  }
}

export default Home;