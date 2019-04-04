import React, { Component } from 'react';
import { Modal, Box, Button, IconButton } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import Signup from '../Auth/signup'

class SignupModal extends Component {
  constructor(props) {
    super(props);
    this.handleToggleModal = this._handleToggleModal.bind(this);
    this.state = {
      showModal: false,
    };
  }

  _handleToggleModal() {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }

  render() {
    const { showModal } = this.state;
    return (
      <Box marginLeft={-1} marginRight={-1}>
        <Box padding={1}>
          <IconButton onClick={this.handleToggleModal} accessibilityLabel="Profile" icon="person-add" size="md" />

          {showModal && (
            <Modal
              accessibilityCloseLabel="close"
              accessibilityModalLabel="Would you like to block Chris?"
              heading="Signup"
              onDismiss={this.handleToggleModal}
              role="alertdialog"
              size="sm"
            >
              <Box paddingX={4} paddingY={2}>
                <Signup  getUser={this.props.getUser} handleToggleModal={this.handleToggleModal} />
              </Box>
            </Modal>
          )}
        </Box>
      </Box>
    );
  }
}

export default SignupModal;