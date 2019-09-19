
import React, { Component } from 'react';
import axios from 'axios';

import TableForPresentingContainers from '../tableForPresentingContainers/tableForPresentingContainers';
import './runningContainers.css';

class RunningContainers extends Component {

	url = "";

	async getDataFromConfigurationService(){
		const RESPONSE = await axios.get("http://localhost:5000/configurationService");
		const DATA = await RESPONSE.data;
		return DATA;
	}

	componentDidMount(){
		this.getDataFromConfigurationService()
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
						<h1>All Containers (running and stopped)</h1>
					</div>
					<p className="mainParagraph">
						Here you can see all containers on your machine.
					</p>
					<TableForPresentingContainers url={URL}/>
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