
import React, { Component } from 'react';
import axios from 'axios';

import './DataFromBackend.css';

class DataFromBackend extends Component {

	constructor(props) {
		super();
		this.state = {
			"containerInformation": [],
			"error": false
		};
	}

	async getContainers() {
		const RESPONSE = await axios.get(this.props.url);
		const DATA = await RESPONSE.data;
		return DATA;
	}

	componentDidMount() {
		this.getContainers()
		.then(DATA => {
			this.setState({containerInformation: DATA});
		})
		.catch(err => {
			this.setState({
				error: true
			})
		});
	}

	render(){
		if(this.state.error){
			return(
				<div className="errorMessage">
					<b>Could not fetch data from backend because of an error.</b>
				</div>
			)
		} else {
			return(
				<table className="containerTable">
					<thead>
						<tr>
							<th>ID</th>
							<th>Names</th>
							<th>Images</th>
							<th>Command</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{this.state.containerInformation.map(container => (
						<tr key={container.Id}>
							<td><span id="containerIdSpan">{container.Id}</span></td>
							<td><span>{container.Names}</span></td>
							<td><span>{container.Image}</span></td>
							<td><span>{container.Command}</span></td>
							<td><span>{container.Status}</span></td>
						</tr>
						))}
					</tbody>
				</table>
			);
		}
	}

}

export default DataFromBackend;