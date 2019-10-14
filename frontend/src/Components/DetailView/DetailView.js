
import React, { Component } from 'react';

import configurationServiceController from '../../Controller/configurationServiceController';
import DetailViewContainerOutput from './DetailViewContainerOutput/DetailViewContainerOutput';
import './DetailView.css'

class DetailView extends Component {

	constructor(props) {
		super();
		this.configService = new configurationServiceController();
		this.state = {
			"containerId": "",
			"error": false,
			"Host": "",
			"Port": "",
		}
		this.url = "";
	}

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

	getContainerID() {
		if(this.props.location.data !== undefined) {
			this.setState({
				"containerId": this.props.location.data.containerId
			})
		} else {
			this.setState({
				"error": true
			})
		}
	}


	componentDidMount() {
		this.getConfigServiceData();
		this.getContainerID();
	}

	render() {
		if(this.state.Host !== "" && this.state.Port !== ""){
			if(!this.state.error) {
				this.url = this.configService.buildPathToBackend(this.state.Host, this.state.Port, "/containers/"+this.state.containerId+"/json")
				return(
					<div className="container">
						<div className="siteTitles">
							<h1>DetailView</h1>
						</div>
						<p className="mainParagraph">
							Here you can get a detail view of the container you choose.
						</p>
						<div className="containerDetailInformationOutput">
							<h4>Detailed information for container: {this.state.containerId}</h4>
							<DetailViewContainerOutput url={this.url}/>
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