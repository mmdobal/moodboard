import React, { Component } from 'react';
import { Box, Column, Text, Button } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import Collage from '../../components/Collage';
import SearchFieldComponent from '../../components/SearchField';

import axios from 'axios';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			userId: '',
			pathPicture: '',
			description: '',
			name: '',
			pictures: '',
			search: ''
		};
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		const userId = this.props.match.params.id;
    axios.get(`http://192.168.15.53:8080/api/pictures/users/${userId}`)
      .then((response) => {
        const pictures = response.data;
        this.setState({ pictures });
      })
			.catch(err => console.log(err));
			axios.get(`http://192.168.15.53:8080/api/users/${userId}`)
      .then((response) => {
        const { name, description, pathPicture } = response.data;
        this.setState({ name, description, pathPicture });
      })
      .catch(err => console.log(err));
	}
	
	handleChange(words) {
    this.setState({ search: words.value.toLowerCase() });
  };
	
	render() {
		let listFiltered = [];

    if (this.state.search !== null) {
      listFiltered = this.state.pictures.filter((item) => item.alt.toLowerCase().includes(this.state.search))
    } else {
      listFiltered = this.state.pictures;
		}
		
		return (
			<Box>
				<SearchFieldComponent handleChangeSearch={this.handleChange} value={this.props.value} />
				<Box display="flex" direction="row" paddingY={2}>
					<Column span={4}>
						<Box color="lightGray" padding={1}>
							<Box color="white" paddingY={2}>
								<Text align="center">CARD</Text>
							</Box>
						</Box>
					</Column>
					<Column span={8}>
						<Box color="lightGray" padding={1}>
							<Box color="white" paddingY={2}>
								<Collage pictures={listFiltered} />
							</Box>
						</Box>
					</Column>
				</Box>
			</Box>
		)
	};
}

export default Profile;