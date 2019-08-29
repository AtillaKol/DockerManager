
import React, { Component } from 'react';
import axios from 'axios';
import './allContainers.css';


class allContainers extends Component {
	constructor(props) {
		super();
		this.state = {
			containerInformation: []
		};
	}

	componentDidMount(){
		axios.get('http://localhost:5000/container/json?all=1')
		.then(response => {
			console.log(response);
		})
		.catch(error => {
			console.log(error);
		})
	}

	render(){
		return(
			<div className="container">
				<div className="siteTitles">
					<h1>All Containers (running and stopped)</h1>
				</div>
				<p className="mainParagraph">
					Here you can see all containers on your machine.
				</p>
			</div>
		);
	}
}

export default allContainers;