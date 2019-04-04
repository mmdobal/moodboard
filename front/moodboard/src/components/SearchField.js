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
    console.log(this.props.loggedInUser);
    const modalLoginLogged = this.props.loggedInUser ?
      false :
      <Box paddingX={2}>
        <LoginModal getUser={this.props.getUser} />
      </Box>;

    const modalSignUpLogged = this.props.loggedInUser ?
      false :
      <Box paddingX={2}>
        <SignupModal getUser={this.props.getUser} />
      </Box>
      ;

    return (
      <Box color="white" shape="rounded" padding={3} display="flex" direction="row" alignItems="center">
        <Box padding={3}>
          <Icon
            icon="angled-pin"
            color="blue"
            size={30}
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

        {modalSignUpLogged}
        {modalLoginLogged}
      </Box>

    );
  }
}

export default SearchFieldComponent;