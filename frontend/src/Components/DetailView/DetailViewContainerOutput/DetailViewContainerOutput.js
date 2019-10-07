
import React, { Component } from 'react';
import axios from 'axios';

import './DetailViewContainerOutput';

class DetailViewContainerOutput extends Component{

	constructor(props) {
		super();
		this.state = {
			containerDetailedInformaion: []
		}
	}

	async getDetailInformationOfContainer(url) {
		const RESPONSE = await axios.get(url);
		const DATA = await RESPONSE.data;
		return DATA
	}

	componentDidMount() {
		this.getDetailInformationOfContainer(this.props.url)
		.then(DATA => {
			this.setState({
				containerDetailedInformaion: DATA
			})
			console.log(DATA);
		})
	}

	render() {
		return(
			<div>
				hello
			</div>
		)
	}

}

export default DetailViewContainerOutput;