
import React, { Component } from 'react';
import axios from 'axios';

import './DetailViewContainerOutput.css';

class DetailViewContainerOutput extends Component{

	constructor(props) {
		super();
		this.state = {
			containerDetailedInformaion: {}
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

	loopThroughArray(arr) {
		if(arr) {
			let data = [];
			if(arr.length <= 1) {
				data.push(arr[0])
			} else {
				data.push()
				for(var i = 0; i < arr.length;i++) {
					data.push(<li key={i} className="list">{arr[i]}</li>);
				}
			}
			return data
		}
	}

	loopThroughObject(obj) {
		if(obj) {
			let data = [];
			if(obj.length <= 1) {
				data.push(obj[0]);
			} else {
				for(var objElement in obj) {
					data.push(<li key={objElement} className="list"><b>{objElement}</b>: {obj[objElement]}</li>)
				}
			}
			return data
		}
	}

	returnDataFromNestedObject(...args) {	
		if(this.state.containerDetailedInformaion[args[0]]) {
			if(args.length <= 2) {
				return this.state.containerDetailedInformaion[args[0]][args[1]]
			}
		}
	}

	render() {
		return(
			<div className="dataFromAPI">
				<div className="dataDiv">
					<b className="titleForElement">AppArmorProfile</b>: {this.state.containerDetailedInformaion["AppArmorProfile"]}
				</div>
				<div className="dataDiv">
					<b className="titleForElement">Args</b>: {this.loopThroughArray(this.state.containerDetailedInformaion["Args"])}
				</div>
				<div className="dataDiv">
					<b className="titleForElement">Config</b>
					<div className="innerContent">
						<b className="titleForElement">AttachStderr</b>: {this.returnDataFromNestedObject("Config","AttachStderr")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">AttachStdin</b>: {this.returnDataFromNestedObject("Config", "AttachStdin")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">AttachStdout</b>: {this.returnDataFromNestedObject("Config", "AttachStdout")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">CMD</b>: {this.loopThroughArray(this.returnDataFromNestedObject("Config", "Cmd"))}
					</div>
					<div className="innerContent">
						<b className="titleForElement">Domainname</b>: {this.returnDataFromNestedObject("Config", "Domainname")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">Entrypoint</b>: {this.returnDataFromNestedObject("Config", "Entrypoint")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">Env</b>: {this.loopThroughArray(this.returnDataFromNestedObject("Config", "Env"))}
					</div>
					<div className="innerContent">
						<b className="titleForElement">Hostname</b>: {this.returnDataFromNestedObject("Config", "Hostname")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">Image</b>: {this.returnDataFromNestedObject("Config", "Image")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">Labels</b>: {this.loopThroughObject(this.returnDataFromNestedObject("Config", "Labels"))}
					</div>
					<div className="innerContent">
						<b className="titleForElement">OnBuild</b>: {this.returnDataFromNestedObject("Config", "OnBuild")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">OpenStdin</b>: {this.returnDataFromNestedObject("Config", "OpenStdin")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">Tty</b>: {this.returnDataFromNestedObject("Config", "Tty")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">User</b>: {this.returnDataFromNestedObject("Config", "User")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">WorkingDir</b>: {this.returnDataFromNestedObject("Config", "WorkingDir")}
					</div>
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
					<b className="titleForElement">GraphDriver</b>
					<div className="innerContent">
						<b className="titleForElement">Data</b>: {this.loopThroughObject(this.returnDataFromNestedObject("GraphDriver", "Data"))}
					</div>
					<div className="innerContent">
						<b className="titleForElement">Name</b>: {this.returnDataFromNestedObject("GraphDriver", "Name")}
					</div>
				</div>
				<div className="dataDiv">
					<b className="titleForElement">HostConfig</b>
					<div className="innerContent">
						<b className="titleForElement">AutoRemove</b>: {this.returnDataFromNestedObject("HostConfig", "AutoRemove")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">Binds</b>: {this.loopThroughArray(this.returnDataFromNestedObject("HostConfig", "Binds"))}
					</div>
					<div className="innerContent">
						<b className="titleForElement">BlkioDeviceReadBps</b>: {this.loopThroughArray(this.returnDataFromNestedObject("HostConfig", "BlkioDeviceReadBps"))}
					</div>
					<div className="innerContent">
						<b className="titleForElement">BlkioDeviceReadIOps</b>: {this.loopThroughArray(this.returnDataFromNestedObject("HostConfig", "BlkioDeviceReadIOps"))}
					</div>
					<div className="innerContent">
						<b className="titleForElement">BlkioDeviceWriteBps</b>: {this.loopThroughArray(this.returnDataFromNestedObject("HostConfig", "BlkioDeviceWriteBps"))}
					</div>
					<div className="innerContent">
						<b className="titleForElement">BlkioDeviceWriteIOps</b>: {this.loopThroughArray(this.returnDataFromNestedObject("HostConfig", "BlkioDeviceWriteIOps"))}
					</div>
					<div className="innerContent">
						<b className="titleForElement">BlkioWeight</b>: {this.returnDataFromNestedObject("HostConfig", "BlkioWeight")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">BlkioWeightDevice</b>: {this.loopThroughArray(this.returnDataFromNestedObject("HostConfig", "BlkioWeightDevice"))}
					</div>
					<div className="innerContent">
						<b className="titleForElement">CapAdd</b>: {this.returnDataFromNestedObject("HostConfig", "CapAdd")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">CapDrop</b>: {this.returnDataFromNestedObject("HostConfig", "CapDrop")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">Capabilities</b>: {this.returnDataFromNestedObject("HostConfig", "Capabilities")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">Cgroup</b>: {this.returnDataFromNestedObject("HostConfig", "Cgroup")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">CgroupParent</b>: {this.returnDataFromNestedObject("HostConfig", "CgroupParent")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">ConsoleSize</b>: {this.loopThroughArray(this.returnDataFromNestedObject("HostConfig", "ConsoleSize"))}
					</div>
					<div className="innerContent">
						
					</div>
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