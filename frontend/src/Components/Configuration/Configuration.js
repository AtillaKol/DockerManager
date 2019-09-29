
import React, { Component } from 'react';
import configurationServiceController from '../../Controller/configurationServiceController';
import './Configuration.css';


class Configuration extends Component{


	constructor(props) {
		super();
		this.configService = new configurationServiceController();
		this.state = {
			"host":"",
			"port":"", 
			"newHost":"",
			"newPort":"",
		}
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

	handleChange = (e) => this.setState({
		[e.target.name]: e.target.value
	});

	handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.state);
		this.setState({
			"newHost": "",
			"newPort": ""
		})
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
					<form className="changeConfiguration" onSubmit={this.handleSubmit}>
						<input type="text" placeholder="Host" name="newHost" value={this.state.newHost} onChange={this.handleChange}/>
						<br/>
						<input type="text" placeholder="Port" name="newPort" value={this.state.newPort} onChange={this.handleChange}/>
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