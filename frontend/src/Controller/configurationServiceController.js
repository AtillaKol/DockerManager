
import axios from 'axios';

class configurationServiceController {

	async getConfigurationDataFromService(){
		const RESPONSE = await axios.get("http://localhost:5000/configurationService");
		const DATA = await RESPONSE.data;
		return DATA;
	}
}

export default configurationServiceController;