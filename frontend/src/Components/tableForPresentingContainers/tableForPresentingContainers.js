
import React, { Component } from 'react';
import axios from 'axios';

import './tableForPresentingContainers.css';

class TableForPresentingContainers extends Component {

	constructor(props) {
		super();
		this.state = {
			containerInformation: []
		};
	}

	componentDidMount() {
		axios.get(this.props.url)
		.then(response => {
			this.setState({containerInformation: response.data});
		})
		.catch(error => {
			console.log(error);
		})
	}

	render(){
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
					<tr>
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

export default TableForPresentingContainers;