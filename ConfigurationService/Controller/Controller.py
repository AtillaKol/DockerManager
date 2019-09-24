
from iniHandler.iniReader import iniReaderClass
from iniHandler.iniWriter import iniWriterClass
from flask import jsonify

# This class will define some methods which will be used by the REST-Controller.
class controllerClass:

	# The Constructor.
	def __init__(self):
		# New instance of the class iniReaderClass.
		self.iniReaderObject = iniReaderClass()
		# New instance of the class iniWriterClass.
		self.iniWriterObject = iniWriterClass()

	# This method will build a json which the configuration service can return to the Frontend if requested.
	# return -> a json-object containing all data from the host.ini-file.
	def buildJSONObject(self):
		dictionary = {
			"hostname": self.iniReaderObject.getHostname(),
			"port": self.iniReaderObject.getPort()	
		}
		return jsonify(dictionary)

	# This method call the method for modiyfing the data inside the ini.fi
	# param json -> The data from the Frontend as json.
	def modifyIniFile(self, json):
		self.iniWriterObject.changeValuesIniniFile(json['hostname'], json['port'])
	