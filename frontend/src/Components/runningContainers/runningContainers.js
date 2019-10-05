
import React, { Component } from 'react';
import configurationServiceController from '../../Controller/configurationServiceController';

import DataFromBackend from '../DataFromBackend/DataFromBackend';
import './runningContainers.css';

class RunningContainers extends Component {

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
		})
	}

	render(){
		if(this.state != null){
			this.url = this.configService.buildPathToBackend(this.state.host, this.state.port, "/containers/json");
			return(
				<div className="container">
					<div className="siteTitles">
						<h1>Running Containers</h1>
					</div>
					<p className="mainParagraph">
						Here you can see all containers currently running on the machine. If you want to have detailed information from the container, click the on id of the container.
					</p>
					<DataFromBackend url={this.url}/>
				</div>
			);
		} else {
			return(
				<div>
					Fetching data from Configuration service.....
				</div>
			)
		}
	}
}

export default RunningContainers;