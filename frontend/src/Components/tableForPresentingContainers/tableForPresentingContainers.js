
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
			console.error(err);
		});
	}

	showData(containerInformation) {
		this.state.containerInformation.map(container => {
			if(containerInformation.Id === container.Id) {
				console.log(containerInformation.Names);
			}
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
						<td><button onClick={() => this.showData(container)}>test</button></td>
					</tr>
					))}
				</tbody>
			</table>
		);
	}

}

export default TableForPresentingContainers;