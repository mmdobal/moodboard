import React, { Component } from 'react';
import { Modal, Box, Button } from 'gestalt';
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
					<Button
						color="white"
						text="Sign up"
						onClick={this.handleToggleModal}
					/>
					{showModal && (
						<Modal
							accessibilityCloseLabel="close"
							accessibilityModalLabel="Would you like to block Chris?"
							heading="Signup"
							onDismiss={this.handleToggleModal}
							footer={
								<Box
									display="flex"
									marginLeft={-1}
									marginRight={-1}
									justifyContent="end"
								>
									<Box padding={1}>
										<Button
											size="lg"
											text="Cancel"
											onClick={this.handleToggleModal}
										/>
									</Box>
									<Box padding={1}>
										<Button
											size="lg"
											color="red"
											text="Block"
											onClick={this.handleToggleModal}
										/>
									</Box>
								</Box>
							}
                role="alertdialog"
                size="sm"
              >
							<Box paddingX={4} paddingY={2}>
								<Signup />
							</Box>
						</Modal>
					)}
				</Box>
			</Box>
		);
	}
}
	
export default SignupModal;