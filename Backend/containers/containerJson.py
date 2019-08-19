
from flask import request
from flask_restful import Resource
from configReader.hostINIReader import hostConfigReader
import requests


class containersSimple(Resource):

	proxyURL = hostConfigReader().getProxyURL()

	# Makes a get requests in this class
	# return requestResult as json and a status_code
	def get(self):
		# Store the query called all
		queryParamAll = request.args.get("all")
		# Check if queryParamAll is set
		if queryParamAll is not None:
			requestResult = requests.get("{}{}{}".format(self.proxyURL, "containers/json?all=", queryParamAll))
			return requestResult.json(), requestResult.status_code
		requestResult = requests.get("{}{}".format(self.proxyURL, "containers/json"))
		return requestResult.json(), requestResult.status_code
