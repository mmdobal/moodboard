import React, { Component } from 'react';
import { Box, Icon, SearchField, Text, Button } from 'gestalt';
import 'gestalt/dist/gestalt.css';

class SearchFieldComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  render() {
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
            onChange={({ value }) => this.setState({ value })}
            placeholder="Search and explore"
            value={this.state.value}
          />
        </Box>
        <Box paddingX={2}>
          <Button color="white" text="Sign Up" />
        </Box>
        <Box paddingX={2}>
          <Button color="blue" text="Login" />
        </Box>
      </Box>
    );
  }
}

export default SearchFieldComponent;