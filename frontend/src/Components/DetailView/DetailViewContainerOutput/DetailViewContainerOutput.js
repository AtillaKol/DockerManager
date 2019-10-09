
import React, { Component } from 'react';
import axios from 'axios';

import './DetailViewContainerOutput.css';

class DetailViewContainerOutput extends Component{

	constructor(props) {
		super();
		this.state = {
			containerDetailedInformaion: []
		}
	}

	async getDetailInformationOfContainer(url) {
		const RESPONSE = await axios.get(url);
		const DATA = await RESPONSE.data;
		return DATA
	}

	componentDidMount() {
		this.getDetailInformationOfContainer(this.props.url)
		.then(DATA => {
			this.setState({
				containerDetailedInformaion: DATA
			})
			console.log(DATA);
		})
	}

	render() {
		return(
			<div className="dataFromAPI">
				<div className="dataDiv">
					<b className="titleForElement">AppArmorProfile</b>: {this.state.containerDetailedInformaion["AppArmorProfile"]}
				</div>
				<div className="dataDiv">
					<b className="titleForElement">Created</b>: {this.state.containerDetailedInformaion["Created"]}
				</div>
				<div className="dataDiv">
					<b className="titleForElement">Driver</b>: {this.state.containerDetailedInformaion["Driver"]}
				</div>
				<div className="dataDiv">
					<b className="titleForElement">ExecIDs</b>: {this.state.containerDetailedInformaion["ExecIDs"]}
				</div>
				<div className="dataDiv">
					<b className="titleForElement">HostnamePath</b>: {this.state.containerDetailedInformaion["HostnamePath"]}
				</div>
				<div className="dataDiv">
					<b className="titleForElement">HostsPath</b>: {this.state.containerDetailedInformaion["HostsPath"]}
				</div>
				<div className="dataDiv">
					<b className="titleForElement">Id</b>: {this.state.containerDetailedInformaion["Id"]}
				</div>
				<div className="dataDiv">
					<b className="titleForElement">Image</b>: {this.state.containerDetailedInformaion["Image"]}
				</div>
				<div className="dataDiv">
					<b className="titleForElement">Log-Path</b>: {this.state.containerDetailedInformaion["LogPath"]}
				</div>
				<div className="dataDiv">
					<b className="titleForElement">MountLabel</b>: {this.state.containerDetailedInformaion["MountLabel"]}
				</div>
				<div className="dataDiv">
					<b className="titleForElement">Name</b>: {this.state.containerDetailedInformaion["Name"]}
				</div>
				<div className="dataDiv">
					<b className="titleForElement">Path</b>: {this.state.containerDetailedInformaion["Path"]}
				</div>
				<div className="dataDiv">
					<b className="titleForElement">Platform</b>: {this.state.containerDetailedInformaion["Platform"]}
				</div>
				<div className="dataDiv">
					<b className="titleForElement">ProcessLabel</b>: {this.state.containerDetailedInformaion["ProcessLabel"]}
				</div>
				<div className="dataDiv">
					<b className="titleForElement">ResolvConfPath</b>: {this.state.containerDetailedInformaion["ResolvConfPath"]}
				</div>
				<div className="dataDiv">
					<b className="titleForElement">RestartCount</b>: {this.state.containerDetailedInformaion["RestartCount"]}
				</div>
			</div>
		)
	}

}

export default DetailViewContainerOutput;