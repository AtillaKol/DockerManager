
from flask_restful import Resource
from configReader.hostINIReader import hostConfigReader
import requests

class containersIDJson(Resource):
	
	proxyURL = hostConfigReader().getProxyURL()

	# Makes a get request in this class
	# param ID -> The ID of container
	def get(self, ID):
		requestResult = requests.get("{}{}{}{}".format(self.proxyURL, "containers/", ID, "/json"))
		return requestResult.json(), requestResult.status_code