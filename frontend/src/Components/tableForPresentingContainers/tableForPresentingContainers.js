
import React, { Component } from 'react';
import axios from 'axios';

import './tableForPresentingContainers.css';

class TableForPresentingContainers extends Component {

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
							<td>{container.Id}</td>
							<td>{container.Names}</td>
							<td>{container.Image}</td>
							<td>{container.Command}</td>
							<td>{container.Status}</td>
						</tr>
						))}
					</tbody>
				</table>
			);
		}
	}

}

export default TableForPresentingContainers;