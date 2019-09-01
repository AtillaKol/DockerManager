
import React, { Component } from 'react';

import TableForPresentingContainers from '../tableForPresentingContainers/tableForPresentingContainers';
import './runningContainers.css';

class runningContainers extends Component {

	render(){

		const URL = "http://localhost:5000/container/json";

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
	}
}

export default runningContainers;