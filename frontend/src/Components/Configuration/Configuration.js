
import React, { Component } from 'react';


class Configuration extends Component{

	render(){
		return(
			<div className="container">
				<div className="siteTitles">
					<h1>Configuration of Backend</h1>
				</div>
				<p className="mainParagraph">
					On this side you can change the host and the port where the Backend runs.
				</p>
			</div>
		)
	}
}

export default Configuration;