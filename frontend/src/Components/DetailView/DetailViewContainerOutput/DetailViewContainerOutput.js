
import React, { Component } from 'react';
import axios from 'axios';

import './DetailViewContainerOutput.css';
import Response from '../../Response/Response';

class DetailViewContainerOutput extends Component{

	/**
	The constructor of the class DetailViewContainerOutput.
	@param props -> Used to get data from other components.
	*/
	constructor(props) {
		super(props);
		this.state = {
			"containerDetailedInformaion": {},
			"submitted": false,
			"newName": ""
		};
	}

	/**
	This method will perform a get request to a given URL (as a parameter) and return the data from the response.
	@param url -> The URL of the api.
	@return -> The response data.
	*/
	async getDetailInformationOfContainer(url) {
		const RESPONSE = await axios.get(url);
		const DATA = await RESPONSE.data;
		return DATA;
	}

	/**
	This method will perform a post request to a given URL (as a parameter), 
	rename the container if possibly and return the response frmo the api.
	@param url -> The URL of the api.
	@return -> The response data.
	*/
	async renameContainer(url) {
		const RESPONSE = await axios.post(url);
		const DATA = await RESPONSE.data;	
		return DATA;
	}

	/**
	This method calls itself when this class is mounted.
	It will use the return value of the method getDetailInformationOfContainer and store it inside a state.
	*/
	componentDidMount() {
		this.getDetailInformationOfContainer(this.props.baseURL+"/containers/"+sessionStorage.getItem("currentUsedContainerID")+"/json")
		.then(DATA => {
			this.setState({
				containerDetailedInformaion: DATA
			})
			console.log(DATA);
		})
	}

	/**
	This method will build the path to the elements inside the object which came from the api.
	@param args -> This parameter is variabl.
	@return -> It returns the data from the given path inside the object.
	*/
	returnDataFromNestedObject(...args) {	
		if(this.state.containerDetailedInformaion[args[0]]) {
			if(args.length <= 2) {
				return this.state.containerDetailedInformaion[args[0]][args[1]];
			}
		}
	}

	/**
	This method will loop through an array which contains objects and it will store the output inside an array.
	@param arr -> An array with the objects.
	@return -> An array which contains all the output in the form of HTMl.
	*/
	loopThroughArrayContaingObjects(arr) {
		if(arr) {
			let data = [];
			if(arr.length <= 1) {
				data.push(this.loopThroughObject(arr[0]));
			} else {
				for(var i = 0; i < arr.length; i++) {
					data.push(
						<div className="arrayOfObjects" key={i}>
							<h4>{i}</h4>
							{this.loopThroughObject(arr[i])}
						</div>);
				}
			}
			return data;
		}
	}

	/**
	This method will loop through an array and store the output inside an array.
	@param arr -> An array.
	@return -> An array which contains all the output in the form of HTMl.
	*/
	loopThroughArray(arr) {
		if(arr) {
			let data = [];
			if(arr.length <= 1) {
				data.push(arr[0]);
			} else {
				for(var i = 0; i < arr.length; i++) {
					data.push(<li key={i} className="list">{arr[i]}</li>);
				}
			}
			return data;
		}
	}

	/**
	This method will loop through an object and store the output inside an array.
	@param obj -> An object.
	@return -> An array which contains all the output in the form of HTMl.
	*/
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
			return data;
		}
	}

	/**
	This method will make a http-request to the backend to change the status of the container.
	@param e -> Used to handle the click event. 
	*/
	changeStatusOfContainer = async(e) => {
		await axios.post(this.props.baseURL+"/containers/"+sessionStorage.getItem("currentUsedContainerID")+"/"+e.target.value)
		window.location.reload();
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}


	/**
	This method will handle the submit for the changing name form.
	@param e -> Used to handle the click event.
	*/
	handleSubmit = (e) => {
		e.preventDefault();
		const URL = this.props.baseURL+"/containers/"+sessionStorage.getItem("currentUsedContainerID")+"/rename?name="+this.state.newName
		this.renameContainer(URL)
		.then(DATA => {
			this.setState({
				"submitted": true,
				"responseText": DATA.message
			}, 
			// This method will be called as soon as the state is set. It will check if the renaming was successfully.
			() => {
				if(this.state.responseText !== undefined) {
					this.setState({
						"responseTitle": "Error"
					});
				} else {
					this.setState({
						"responseText": "Changed name successfully. Page will auto-refresh",
						"responseTitle": "Success"
					});
					window.setTimeout( () => {
						window.location.reload();
					}, 3000);
				}
			});
		})
		.catch(ERROR => {
			console.log(ERROR);
		})
	}

	/**
	This method will return different buttons depending how the state of the container is.
	@return -> Different sets of buttons.
	*/
	interactionButtons(){
		if(this.returnDataFromNestedObject("State", "Running") && this.returnDataFromNestedObject("State", "Status") === "paused") {
			return(
				<div className="buttonSelections">
					<button id="startButtonDisabled">Start</button>
					<button value="stop" id="stopButton" onClick={this.changeStatusOfContainer}>Stop</button>
					<button value="kill" id="killButton" onClick={this.changeStatusOfContainer}>Kill</button>
					<button value="restart" id="restartButton" onClick={this.changeStatusOfContainer}>Restart</button>
					<button id="pauseButtonDisabled">Pause</button>
					<button value="unpause" id="unpauseButton" onClick={this.changeStatusOfContainer}>Unpause</button>
				</div>
			);
		} else if(this.returnDataFromNestedObject("State", "Running")){
			return(
				<div className="buttonSelections">
					<button id="startButtonDisabled">Start</button>
					<button value="stop" id="stopButton" onClick={this.changeStatusOfContainer}>Stop</button>
					<button value="kill" id="killButton" onClick={this.changeStatusOfContainer}>Kill</button>
					<button value="restart" id="restartButton" onClick={this.changeStatusOfContainer}>Restart</button>
					<button value="pause" id="pauseButton" onClick={this.changeStatusOfContainer}>Pause</button>
					<button id="unpauseButtonDisabled">Unpause</button>
				</div>
			);
		} else if(!this.returnDataFromNestedObject("State", "Running")) {
			return(
				<div className="buttonSelections">
					<button value="start" id="startButton" onClick={this.changeStatusOfContainer}>Start</button>
					<button id="stopButtonDisabled">Stop</button>
					<button id="killButtonDisabled">Kill</button>
					<button value="restart" id="restartButton" onClick={this.changeStatusOfContainer}>Restart</button>
					<button id="pauseButtonDisabled">Pause</button>
					<button id="unpauseButtonDisabled">Unpause</button>
				</div>
			);
		}
	}

	/**
	The render-method of the class DetailViewContainerOutput.
	@return -> It returns some HTML.
	*/
	render() {
		return(
			<div className="dataFromAPI">
				{this.interactionButtons()}
				<div className="dataDiv">
					<div id="renameSections">
						<h4>Change name of this container</h4>
						The container has currently following name: {this.state.containerDetailedInformaion["Name"]}.
						<br/>
						<br/>
						If you want to change it, use the form below.
					</div>
					<form id="changeNameForm" onSubmit={this.handleSubmit}>
						<input  type="text" placeholder="New Name" name="newName" onChange={this.handleChange}/>
						<br/>
						<input type="submit" value="Rename"/>
					</form>
					{this.state.submitted && <Response data={this.state}/>}
				</div>
				<h3>Detail information of the container</h3>
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
						<b className="titleForElement">ContainerIDFile</b>: {this.returnDataFromNestedObject("HostConfig", "ContainerIDFile")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">CpuCount</b>: {this.returnDataFromNestedObject("HostConfig", "CpuCount")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">CpuPercent</b>: {this.returnDataFromNestedObject("HostConfig", "CpuPercent")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">CpuPeriod</b>: {this.returnDataFromNestedObject("HostConfig", "CpuPeriod")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">CpuQuota</b>: {this.returnDataFromNestedObject("HostConfig", "CpuQuota")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">CpuRealtimePeriod</b>: {this.returnDataFromNestedObject("HostConfig", "CpuRealtimePeriod")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">CpuRealtimeRuntime</b>: {this.returnDataFromNestedObject("HostConfig", "CpuRealtimeRuntime")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">CpuShares</b>: {this.returnDataFromNestedObject("HostConfig", "CpuShares")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">CpusetCpus</b>: {this.returnDataFromNestedObject("HostConfig", "CpusetCpus")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">CpusetMems</b>: {this.returnDataFromNestedObject("HostConfig", "CpusetMems")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">Dns</b>: {this.loopThroughArray(this.returnDataFromNestedObject("HostConfig", "Dns"))}
					</div>
					<div className="innerContent">
						<b className="titleForElement">DnsOptions</b>: {this.loopThroughArray(this.returnDataFromNestedObject("HostConfig", "DnsOptions"))}
					</div>
					<div className="innerContent">
						<b className="titleForElement">DnsSearch</b>: {this.loopThroughArray(this.returnDataFromNestedObject("HostConfig", "DnsSearch"))}
					</div>
					<div className="innerContent">
						<b className="titleForElement">GroupAdd</b>: {this.loopThroughArray(this.returnDataFromNestedObject("HostConfig", "GroupAdd"))}
					</div>
					<div className="innerContent">
						<b className="titleForElement">IOMaximumBandwidth</b>: {this.returnDataFromNestedObject("HostConfig", "IOMaximumBandwidth")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">IOMaximumIOps</b>: {this.returnDataFromNestedObject("HostConfig", "IOMaximumIOps")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">IpcMode</b>: {this.returnDataFromNestedObject("HostConfig", "IpcMode")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">Isolation</b>: {this.returnDataFromNestedObject("HostConfig", "Isolation")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">KernelMemory</b>: {this.returnDataFromNestedObject("HostConfig", "KernelMemory")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">KernelMemoryTCP</b>: {this.returnDataFromNestedObject("HostConfig", "KernelMemoryTCP")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">Links</b>: {this.loopThroughArray(this.returnDataFromNestedObject("HostConfig", "Links"))}
					</div>
					<div className="innerContent">
						<b className="titleForElement">MaskedPaths</b>: {this.loopThroughArray(this.returnDataFromNestedObject("HostConfig", "MaskedPaths"))}
					</div>
					<div className="innerContent">
						<b className="titleForElement">Memory</b>: {this.returnDataFromNestedObject("HostConfig", "Memory")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">MemoryReservation</b>: {this.returnDataFromNestedObject("HostConfig", "MemoryReservation")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">MemorySwap</b>: {this.returnDataFromNestedObject("HostConfig", "MemorySwap")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">MemorySwappiness</b>: {this.returnDataFromNestedObject("HostConfig", "MemorySwappiness")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">NanoCpus</b>: {this.returnDataFromNestedObject("HostConfig", "NanoCpus")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">NetworkMode</b>: {this.returnDataFromNestedObject("HostConfig", "NetworkMode")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">OomKillDisable</b>: {this.returnDataFromNestedObject("HostConfig", "OomKillDisable")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">OomScoreAdj</b>: {this.returnDataFromNestedObject("HostConfig", "OomScoreAdj")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">PidMode</b>: {this.returnDataFromNestedObject("HostConfig", "PidMode")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">PidsLimit</b>: {this.returnDataFromNestedObject("HostConfig", "PidsLimit")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">Privileged</b>: {this.returnDataFromNestedObject("HostConfig", "Privileged")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">PublishAllPorts</b>: {this.returnDataFromNestedObject("HostConfig", "PublishAllPorts")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">ReadonlyPaths</b>: {this.loopThroughArray(this.returnDataFromNestedObject("HostConfig", "ReadonlyPaths"))}
					</div>
					<div className="innerContent">
						<b className="titleForElement">ReadonlyRootfs</b>: {this.returnDataFromNestedObject("HostConfig", "ReadonlyRootfs")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">RestartPolicy</b>: {this.loopThroughObject(this.returnDataFromNestedObject("HostConfig", "RestartPolicy"))}
					</div>
					<div className="innerContent">
						<b className="titleForElement">Runtime</b>: {this.returnDataFromNestedObject("HostConfig", "Runtime")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">SecurityOpt</b>: {this.loopThroughArray(this.returnDataFromNestedObject("HostConfig", "SecurityOpt"))}
					</div>
					<div className="innerContent">
						<b className="titleForElement">ShmSize</b>: {this.returnDataFromNestedObject("HostConfig", "ShmSize")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">UTSMode</b>: {this.returnDataFromNestedObject("HostConfig", "UTSMode")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">Ulimits</b>: {this.loopThroughArrayContaingObjects(this.returnDataFromNestedObject("HostConfig", "Ulimits"))}
					</div>
					<div className="innerContent">
						<b className="titleForElement">UsernsMode</b>: {this.returnDataFromNestedObject("HostConfig", "UsernsMode")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">VolumeDriver</b>: {this.returnDataFromNestedObject("HostConfig", "VolumeDriver")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">VolumesFrom</b>: {this.loopThroughArray(this.returnDataFromNestedObject("HostConfig", "VolumesFrom"))}
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
					<b className="titleForElement">Mounts</b>: {this.loopThroughArrayContaingObjects(this.state.containerDetailedInformaion["Mounts"])}
				</div>
				<div className="dataDiv">
					<b className="titleForElement">Name</b>: {this.state.containerDetailedInformaion["Name"]}
				</div>
				<div className="dataDiv">
					<b className="titleForElement">NetworkSettings</b>
					<div className="innerContent">
						<b className="titleForElement">Bridge</b>: {this.returnDataFromNestedObject("NetworkSettings", "Bridge")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">EndpointID</b>: {this.returnDataFromNestedObject("NetworkSettings", "EndpointID")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">Gateway</b>: {this.returnDataFromNestedObject("NetworkSettings", "Gateway")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">GlobalIPv6Address</b>: {this.returnDataFromNestedObject("NetworkSettings", "GlobalIPv6Address")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">GlobalIPv6PrefixLen</b>: {this.returnDataFromNestedObject("NetworkSettings", "GlobalIPv6PrefixLen")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">HairpinMode</b>: {this.returnDataFromNestedObject("NetworkSettings", "HairpinMode")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">IPAddress</b>: {this.returnDataFromNestedObject("NetworkSettings", "IPAddress")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">IPPrefixLen</b>: {this.returnDataFromNestedObject("NetworkSettings", "IPPrefixLen")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">IPv6Gateway</b>: {this.returnDataFromNestedObject("NetworkSettings", "IPv6Gateway")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">LinkLocalIPv6Address</b>: {this.returnDataFromNestedObject("NetworkSettings", "LinkLocalIPv6Address")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">LinkLocalIPv6PrefixLen</b>: {this.returnDataFromNestedObject("NetworkSettings", "LinkLocalIPv6PrefixLen")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">MacAddress</b>: {this.returnDataFromNestedObject("NetworkSettings", "MacAddress")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">SandboxID</b>: {this.returnDataFromNestedObject("NetworkSettings", "SandboxID")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">SandboxKey</b>: {this.returnDataFromNestedObject("NetworkSettings", "SandboxKey")}
					</div>
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
				<div className="dataDiv">
					<b className="titleForElement">State</b>:
					<div className="innerContent">
						<b className="titleForElement">Dead</b>: {this.returnDataFromNestedObject("State", "Dead")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">Error</b>: {this.returnDataFromNestedObject("State", "Error")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">ExitCode</b>: {this.returnDataFromNestedObject("State", "ExitCode")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">FinishedAt</b>: {this.returnDataFromNestedObject("State", "FinishedAt")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">OOMKilled</b>: {this.returnDataFromNestedObject("State", "OOMKilled")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">Paused</b>: {this.returnDataFromNestedObject("State", "Paused")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">Pid</b>: {this.returnDataFromNestedObject("State", "Pid")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">Restarting</b>: {this.returnDataFromNestedObject("State", "Restarting")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">Running</b>: {this.returnDataFromNestedObject("State", "Running")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">StartedAt</b>: {this.returnDataFromNestedObject("State", "StartedAt")}
					</div>
					<div className="innerContent">
						<b className="titleForElement">Status</b>: {this.returnDataFromNestedObject("State", "Status")}
					</div>
				</div>
			</div>
		)
	}

}

export default DetailViewContainerOutput;