
import React, { Component } from 'react';

import TableForPresentingContainers from '../tableForPresentingContainers/tableForPresentingContainers';
import './allContainers.css';

class allContainers extends Component {

	render(){

		const URL = "http://localhost:5000/container/json?all=1";

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
	}
}

export default allContainers;