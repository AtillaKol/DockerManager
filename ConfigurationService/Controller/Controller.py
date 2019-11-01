
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
	return -> This method has two differnt return values.
		Error -> When something went wrong e.g wrong input from user.
		Success -> When the input of hostname and port are valid.
	'''
	def modifyIniFile(self, json):
		hostname = json['hostname']
		portnumber = json['port']
		if (portnumber == "" and hostname == "") or (portnumber == "" or hostname == ""):
			return {"Response": ["Error", "One or both of the variabls are not set."]}, 200
		else:
			try:
				portnumber = int(portnumber)
				if portnumber < 65536 and portnumber > 0:
					self.iniWriterObject.changeValuesIniniFile(hostname, str(portnumber))
					return {"Response": ["Success", "New data is written into the ini-file. Page will refresh automatically."]}, 200
				else:
					return {"Response": ["Error", "The portnumber must be smaller then 65536 and bigger then zero."]}, 200
			except ValueError:
				return {"Response": ["Error", "The input of the port is not a number."]}, 200
		
