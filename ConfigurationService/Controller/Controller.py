
from iniHandler.iniReader import iniReaderClass
from iniHandler.iniWriter import iniWriterClass
from flask import jsonify, Response

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
		# Store the data from the method returnDataFrominiFile inside the variable 'data'.
		data = self.iniReaderObject.returnDataFrominiFile()
		dictionary = {
			"hostname": data[0],
			"port": data[1]
		}
		return jsonify(dictionary)

	# This method call the method for modiyfing the data inside the ini.fi
	# param json -> The data from the Frontend as json.
	'''
	return -> This method as three differnt return values.
		Success -> When the port value is acceptable.
		RangeError -> When the port number is bigger then 65536 or smaller then zero.
		Error -> When the port number is not a really number.
	'''
	def modifyIniFile(self, json):
		try:
			portNumber = int(json['port'])
			if portNumber < 65536 and portNumber > 0:
				self.iniWriterObject.changeValuesIniniFile(json['hostname'], str(portNumber))
				return {"Response": ["Success", "New data is written into the ini-file."]}, 200
			else:
				return {"Response": ["RangeError", "The portnumber must be smaller then 65536 and bigger then zero."]}, 400
		except ValueError:
			return {"Response": ["Error", "The input of the port is not a number."]}, 400
	