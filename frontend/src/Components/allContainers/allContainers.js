
import React, { Component } from 'react';
import configurationServiceController from '../../Controller/configurationServiceController';

import TableForPresentingContainers from '../tableForPresentingContainers/tableForPresentingContainers';
import './allContainers.css';

class AllContainers extends Component {

	constructor(props){
		super();
		this.configService = new configurationServiceController()
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
			return(
				<div className="container">
					<div className="siteTitles">
						<h1>All Containers</h1>
					</div>
					<p className="mainParagraph">
						Here you can view all of your running and stopped containers.
					</p>
					<TableForPresentingContainers url={URL}/>
				</div>
			);
		} else {
			return(
				<div>
					Fetching data from Configuration service.....
				</div>
			);
		}
	}
}

export default AllContainers;