
import React, { Component } from 'react';

import configurationServiceController from '../../Controller/configurationServiceController';
import DetailViewContainerOutput from './DetailViewContainerOutput/DetailViewContainerOutput';
import './DetailView.css'

class DetailView extends Component {

	/**
	The constructor of the class DetailView.
	@param props -> Used to get data from other components.
	*/
	constructor(props) {
		super(props);
		this.configService = new configurationServiceController();
		this.state = {
			"error": false,
			"Host": "",
			"Port": "",
		}
		this.url = "";
	}

	/**
	This method will fetch data from the ConfigurationService.
	*/
	getConfigServiceData() {
		this.configService.getConfigurationDataFromService()
		.then(DATA => {
			this.setState({
				"Host": DATA.hostname,
				"Port": DATA.port
			});
		})
		.catch(ERROR => {
			console.log(ERROR);
		});
	}

	/**
	This method will store the ID of the container which was chosen by the user.
	*/
	getContainerID() {
		if(this.props.location.data !== undefined) {
			sessionStorage.setItem("currentUsedContainerID", this.props.location.data.containerId);
		} else {
			this.setState({
				"error": true
			})
		}
	}

	/**
	This method calls itself when this class is mounted.
	It stores the DATA inside the state.
	*/
	componentDidMount() {
		this.getConfigServiceData();
		this.getContainerID();
	}

	/**
	The render-method of the class DetailView.
	@return -> It returns some HTML.
	*/
	render() {
		if(this.state.Host !== "" && this.state.Port !== ""){
			if(!this.state.error || sessionStorage.getItem("currentUsedContainerID")) {
				this.baseURL = "http://"+this.state.Host+":"+this.state.Port;
				return(
					<div className="container">
						<div className="siteTitles">
							<h1>DetailView</h1>
						</div>
						<p className="mainParagraph">
							Here you can get a detail view of the container you choose.
						</p>
						<div className="containerDetailInformationOutput">
							<DetailViewContainerOutput baseURL={this.baseURL}/>
						</div>
					</div>
				);
			} else {
				return(
					<div className="container">
						<div className="siteTitles">
							<h1>DetailView</h1>
						</div>
						<div className="errorMessage">
							No ID was choosen. Please return to one of the container pages and choose an container id.
						</div>
					</div>
				)
			}
		} else {
			return(
				<div className="container">
					<div className="siteTitles">
						<h1>DetailView</h1>
					</div>
					<p className="mainParagraph">
						Fetching data from Configuration service.....
					</p>
				</div>
			)
		} 
	}
}

export default DetailView;