
import React, { Component } from 'react';
import configurationServiceController from '../../Controller/configurationServiceController';

import DataFromBackend from '../DataFromBackend/DataFromBackend';
import './allContainers.css';

class AllContainers extends Component {

	constructor(props){
		super();
		this.configService = new configurationServiceController();
		this.url = "";
	}

	componentDidMount(){
		this.configService.getConfigurationDataFromService()
		.then(DATA => {
			this.setState({
				"host": DATA.hostname,
				"port": DATA.port
			});
		})
		.catch(ERROR => {
			console.log(ERROR);
		});
	}

	render(){
		if(this.state != null){
			this.url = this.configService.buildPathToBackend(this.state.host, this.state.port, "/containers/json?all=1");
			return(
				<div className="container">
					<div className="siteTitles">
						<h1>All Containers</h1>
					</div>
					<p className="mainParagraph">
						Here you can view all of your running and stopped containers. If you want to have detailed information from the container, click the on id of the container.
					</p>
					<DataFromBackend url={this.url}/>
				</div>
			);
		} else {
			return(
				<div className="container">
					<div className="siteTitles">
						<h1>All Containers</h1>
					</div>
					<p className="mainParagraph">
						Fetching data from Configuration service.....
					</p>
				</div>
			);
		}
	}
}

export default AllContainers;