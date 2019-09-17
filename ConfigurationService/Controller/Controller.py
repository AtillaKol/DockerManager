
from iniHandler.iniReader import iniReaderClass
import json

# This class will define some methods which will be used by the REST-Controller.
class controllerClass:

	# The Constructor.
	def __init__(self):
		# New instance of the class iniReaderClass.
		self.iniReaderObject = iniReaderClass()

	# This method will build a json which the configuration service can return to the Frontend if requested.
	# return -> a json-object containing all data from the host.ini-file.
	def buildJSONObject(self):
		dictionary = {
			"hostname": self.iniReaderObject.getHostname(),
			"port": self.iniReaderObject.getPort()	
		}
		return json.dumps(dictionary)
	