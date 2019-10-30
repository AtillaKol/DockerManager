
import React, { Component } from 'react';
import axios from 'axios';

import Response from '../Response/Response';
import configurationServiceController from '../../Controller/configurationServiceController';
import './Configuration.css';


class Configuration extends Component{

	/**
	The constructor of the class Configuration.
	@param props -> Used to get data from other components.
	*/
	constructor(props) {
		super(props);
		this.configService = new configurationServiceController();
		this.state = {
			"newHost":"",
			"newPort":""
		}
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
			})
		})
		.catch(ERROR => {
			console.log(ERROR);
		});
	}

	/**
	This method performs a put request and stores the response in DATA.
	@return -> The response from the request.
	*/
	async getRespnseAfterPost(){
		const RESPONSE = await axios({
			method: 'put',
			url: 'http://localhost:5000/configurationService',
			data: {
				hostname: this.state.newHost,
				port: this.state.newPort
			}
		})
		const DATA = await RESPONSE.data;
		return DATA
	}

	/**
	This method is used to store the new host and the new port in the state.
	@param e -> Used for the event.
	*/
	handleChange = (e) => this.setState({
		[e.target.name]: e.target.value
	});

	/**
	This method is used to store the response from the api and that the button has been pressed.
	@param e -> Used for the event.
	*/
	handleSubmit = (e) => {
		e.preventDefault();
		this.getRespnseAfterPost()
		.then(DATA => {
			this.setState({
				"responseTitle": DATA["Response"][0],
				"responseText": DATA["Response"][1],
				"submitted": true
			}, 
			//This method will executed when setState is performed. It will check if responseTitle equals Success and when it does, it will autofresh the page.
			() => {
				if(this.state.responseTitle === "Success") {
					window.location.reload();
				}
			})
		})
		.catch(ERROR => {
			console.log(ERROR);
		})
	}

	/**
	The render-method of the class Configuration.
	@return -> It returns some HTML.
	*/
	render(){
		if(this.state != null){
			return(
				<div className="container">
					<div className="siteTitles">
						<h1>Configuration of Backend</h1>
					</div>
					<p className="mainParagraph">
						On this page you can change the host and the port where the Backend runs.
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
					{this.state.submitted && this.state.responseTitle !== "Success" && <Response data={this.state}/>}
				</div>
			)
		} else {
			return(
				<div className="container">
					<div className="siteTitles">
						<h1>Configuration of Backend</h1>
					</div>
					<p className="mainParagraph">
						Fetching data from Configuration service.....
					</p>
				</div>
			)
		}
	}
}

export default Configuration;