
import React, { Component } from 'react';
import './About.css';
import '../../App.css';

class About extends Component {
	
	/**
	The render-method of the class About.
	@return -> It returns some HTML.
	*/
	render(){
		return(
			<div className="container">
				<div className="siteTitles">
					<h1>About</h1>
				</div>
				<p className="mainParagraph">
					This is a small side-project with the aim to create an application with which the user can manage all of their docker-containers.
					<br/>
					If you found something wrong with the application please contact me or make a pull request.
				</p>
			</div>
		);
	}
}

export default About;