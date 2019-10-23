
import axios from 'axios';

class configurationServiceController {

	/**
	This method will perform a get request to the Configuration Service and return the data from it.
	@return -> data from the configuration service api.
	*/
	async getConfigurationDataFromService(){
		const RESPONSE = await axios.get("http://localhost:5000/configurationService");
		const DATA = await RESPONSE.data;
		return DATA;
	}

	/**
	This method will build a string which is the url for the backend api.
	@return -> The path to a given route in the backend.
	*/
	buildPathToBackend(hostname, port, endpoint){
		return "http://"+hostname+":"+port+endpoint;
	}
}

export default configurationServiceController;