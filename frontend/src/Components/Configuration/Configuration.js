
import React, { Component } from 'react';
import configurationServiceController from '../../Controller/configurationServiceController';
import './Configuration.css';


class Configuration extends Component{

	constructor(props) {
		super();
		this.configService = new configurationServiceController();
	}

	componentDidMount(){
		this.configService.getConfigurationDataFromService()
		.then(DATA => {
			this.setState({
				"host": DATA.hostname,
				"port": DATA.port
			})
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
						<h1>Configuration of Backend</h1>
					</div>
					<p className="mainParagraph">
						On this side you can change the host and the port where the Backend runs.
						<br/>
						The current settings: 
						<br/>
						<b>Host:</b> {this.state.host}
						<br/>
						<b>Port:</b> {this.state.port}
					</p>
					<p id="configurationText">
						On the form below you can change where the backend runs.
					</p>
					<form className="changeConfiguration">
						<input type="text" value="Host"/>
						<br/>
						<input type="text" value="Port"/>
						<br/>
						<input type="submit" value="Submit"/>
					</form>
				</div>
			)
		} else {
			return(
				<div>
					Fetching data from Configuration service.....
				</div>
			)
		}
	}
}

export default Configuration;