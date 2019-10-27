
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './DataFromBackend.css';

class DataFromBackend extends Component {

	/**
	The constructor of the class DataFromBackend.
	@param props -> Used to get data from other components.
	*/
	constructor(props) {
		super(props);
		this.state = {
			"containerInformation": [],
			"error": false,
		};
	}

	/**
	This method will perform a get request to a given URL and return the data from the response.
	@return -> The data from the api.
	*/
	async getContainers() {
		const RESPONSE = await axios.get(this.props.url);
		const DATA = await RESPONSE.data;
		return DATA;
	}

	/**
	This method calls itself when this class is mounted.
	It stores the DATA inside the state.
	*/
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

	/**
	The render-method of the class DataFromBackend.
	@return -> It returns some HTML.
	*/
	render(){
		if(this.state.error){
			return(
				<div className="errorMessage">
					<b>Could not fetch data from backend because of an error.</b>
				</div>
			)
		} else {
			return(
				<div className="divForTable">
					<table className="containerTable">
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Image</th>
								<th>Command</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{this.state.containerInformation.map(container => (
							<tr key={container.Id}>
								<td><Link className="detailViewLink" id={container.Id} to={{
									pathname: "/detailedView",
									data: {
										"containerId": container.Id
									}
								}}>{container.Id}</Link></td>
								<td>{container.Names}</td>
								<td>{container.Image}</td>
								<td>{container.Command}</td>
								<td>{container.Status}</td>
							</tr>
							))}
						</tbody>
					</table>
				</div>
			);
		}
	}

}

export default DataFromBackend;