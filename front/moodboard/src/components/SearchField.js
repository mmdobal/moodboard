import React, { Component } from 'react';
import { Box, Icon, SearchField, Text, Button } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';

class SearchFieldComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      value: '',
    };
  }

  render() {
    // console.log(this.state.value);
    
    return (
      <Box color="white" shape="rounded" padding={3} display="flex" direction="row" alignItems="center">
        <Box padding={3}>
          <Icon
            icon="pinterest"
            color="red"
            size={20}
            accessibilityLabel="Pinterest"
          />
        </Box>
        <Box flex="grow" paddingX={2}>
          <SearchField
            color='red'
            accessibilityLabel="Demo Search Field"
            id="searchField"
            onChange={({ value }) => this.props.handleChangeSearch({ value })}
            placeholder="Search and explore"
            value={this.props.value}
          />
        </Box>
        <Box paddingX={2}>
          {/* <Button color="white" text="Sign Up" /> */}
          <SignupModal />
        </Box>
        <Box paddingX={2}>
          {/* <Button color="blue" text="Login" /> */}
          <LoginModal />
        </Box>
      </Box>
    );
  }
}

export default SearchFieldComponent;