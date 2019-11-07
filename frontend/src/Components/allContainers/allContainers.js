
import React, { Component } from 'react';
import configurationServiceController from '../../Controller/configurationServiceController';

import DataFromBackend from '../DataFromBackend/DataFromBackend';
import './allContainers.css';

class AllContainers extends Component {

	/**
	The constructor of the class AllContainers.
	@param props -> Used to get data from other components.
	*/
	constructor(props){
		super(props);
		this.configService = new configurationServiceController();
		this.url = "";
	}

	/**
	This method calls itself when this class is mounted.
	It fetches data from the ConfigurationService and store it in state.
	*/
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

	/**
	The render-method of the class AllContainers.
	@return -> It returns some HTML.
	*/
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